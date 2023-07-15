import { object } from 'prop-types';
import dummyEPF from '../../../assets/dummyEPF.json';
import axios from 'axios';

/**
 * Group all list fields of the same table and turn them into an array field.
 * E.g. { C1_name: ["John", "Benny"], C1_activity: ["Football", "Soccer"] }
 * will be transformed into 
 * { C1_grouped: [{C1_name: "John", C1_activity: "Soccer"}, {C1_name: "Benny", C1_activity: "Soccer"}] }
 * Replace all 'C3_cleanup' with 'C3cleanup' to not break the processing
 * @param {FormData} data 
 * @returns {FormData} 
 */
export const convertJSONToFields = (data) => {
    data = Object.fromEntries(Object.entries(data).map(([k, v]) => [k.replace('C3_cleanup', 'C3cleanup'), v])); // fix for EPF only
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
    // let response = await axios.get("http://localhost:3000/epfs/getEPF", {
    //     "epf_id": epf_id
    // cancelToken: newCancelToken.token
    // });
    // console.log("DATA", response.data);
    let response = { data: dummyEPF };
    let data = convertJSONToFields(response.data);
    console.log(data);
    return data; // TODO integrate w api
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
    let scalarObjs = Object.fromEntries(Object.entries(data).filter(([name, _]) => !name.includes('_grouped')));
    let listObjsInitial = Object.entries(data).filter(([name, _]) => name.includes('_grouped')).map(([_, v]) => v);
    let listObjs = {};
    for (let group of listObjsInitial) {
        if (!group) { continue; };
        let names = Object.fromEntries(Object.keys(group[0]).map(name => [name, group.map(obj => obj[name])]));
        listObjs = { ...listObjs, ...names };
    };
    let res = { ...listObjs, ...scalarObjs };
    res = Object.fromEntries(Object.entries(res).map(([k, v]) => [k.replace('C3cleanup', 'C3_cleanup'), v])); // fix for EPF only
    return res;
}

export async function createEPF(data) {
    data = convertFieldsToJSON(data);
    const response = await axios.post("http://localhost:3000/epfs/createEPF",
        JSON.stringify(data),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return response;
}


