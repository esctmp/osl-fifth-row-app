import { object } from 'prop-types';
import dummyEPF from '../../../assets/dummyEPF.json';
import axios from 'axios';

/**
 * Group all list fields of the same table and turn them into an array field.
 * E.g. { C1_name: ["John", "Benny"], C1_activity: ["Football", "Soccer"] }
 * will be transformed into 
 * { C1_grouped: [{C1_name: "John", C1_activity: "Soccer"}, {C1_name: "Benny", C1_activity: "Soccer"}] }
 * Replace all 'c3_cleanup' with 'c3cleanup' to not break the processing
 * @param {FormData} data 
 * @returns {FormData} 
 */
export const convertJSONToFields = (data) => {
    // Filter out undefined/null data
    data = Object.fromEntries(Object.entries(data).filter(([_, value]) => !(value == undefined || value?.length == 0)));

    // Convert all ungrouped data to grouped
    data = Object.fromEntries(Object.entries(data).map(([k, v]) => [k.replace('c3_cleanup', 'c3cleanup'), v])); // fix for EPF only
    let scalarObjs = Object.fromEntries(Object.entries(data).filter(([key, val]) => !Array.isArray(val)));
    let listObjsInitial = Object.fromEntries(Object.entries(data).filter(([key, val]) => Array.isArray(val)));
    let prefixes = [...new Set(Object.entries(listObjsInitial).map(([name, _]) => name.split('_')[0] + '_grouped'))];
    let listObjs = {};
    for (let prefix of prefixes) {
        let fields = Object.entries(listObjsInitial).filter(([k, v]) => k.startsWith(prefix.split('_')[0]));
        listObjs[prefix] = [...Array(fields[0][1].length).keys()].map(idx => Object.fromEntries(fields.map(([k, v]) => [k, v[idx]])));
    };
    return { ...listObjs, ...scalarObjs };
}

export async function getEPF(epf_id) {
    let response = await axios.get("http://localhost:3000/epfs/getEPF",
        {
            params: { epf_id: epf_id }
        }
    ).then((res) => res, (error) => {
        console.log(error);
        return { data: [{}] };
    });
    let data = convertJSONToFields(response.data[0]);
    //let data = convertJSONToFields(dummyEPF);
    console.log("LOADED", data);
    return data;
}


/**
 * Ungroup all previously grouped list fields
 * E.g. { C1_grouped: [{C1_name: "John", C1_activity: "Soccer"}, {C1_name: "Benny", C1_activity: "Soccer"}] }
 * will be transformed into 
 * { C1_name: ["John", "Benny"], C1_activity: ["Football", "Soccer"] }
 * @param {FormData} data 
 * @returns {FormData} Won't include empty list fields
 */
export const convertFieldsToJSON = (data) => {
    // Filter out undefined/null data
    data = Object.fromEntries(Object.entries(data).filter(([_, value]) => !(
        !value
        || (Array.isArray(value) && (value.length == 0 || value[0] == false))
        || (Array.isArray(value) && (Object.entries(value[0]).filter(([k, v]) => v).length == 0))
    )));

    // Convert all grouped data to ungrouped
    let scalarObjs = Object.fromEntries(Object.entries(data).filter(([name, _]) => !name.includes('_grouped')));
    let listObjsInitial = Object.entries(data).filter(([name, _]) => name.includes('_grouped')).map(([_, v]) => v);
    let listObjs = {};
    if (listObjsInitial != []) {
        for (let group of listObjsInitial) {
            if (!group) { continue; };
            let names = Object.fromEntries(Object.keys(group[0]).map(name => [name, group.map(obj => obj[name])]));
            listObjs = { ...listObjs, ...names };
        };
    }
    let res = { ...listObjs, ...scalarObjs };
    res = Object.fromEntries(Object.entries(res).map(([k, v]) => [k.replace('c3cleanup', 'c3_cleanup'), v])); // fix for EPF only
    res['b_event_schedule'] = res['b_event_schedule'].replace('T', ' ')
    return res;
}

export async function createEPF(data) {
    data = convertFieldsToJSON(data);
    console.log("SUBMITTED", data);
    await axios.post("http://localhost:3000/epfs/createEPF",
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        if (response.status == 201) {
            alert("Form uploaded successfully!");
        }
    }, (err) => alert("Form upload failed. Please try again."));
}


export async function updateEPF(data) {
    data = convertFieldsToJSON(data);
    console.log("UPDATED", data);
    await axios.put("http://localhost:3000/epfs/updateEPF",
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        if (response.status == 200) {
            alert("Form uploaded successfully!");
        }
    }, (err) => alert("Form upload failed. Please try again."));
}


