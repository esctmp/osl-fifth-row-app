import { object } from 'prop-types';
import dummyEPF from '../../../assets/dummyEPF.json';

export const convertJSONToFields = (data) => {
    let scalarObjs = Object.fromEntries(Object.entries(data).filter(([key, val]) => !Array.isArray(val)));
    let listObjsInitial = Object.fromEntries(Object.entries(data).filter(([key, val]) => Array.isArray(val)));
    let listObjs = Object.fromEntries(Object.entries(listObjsInitial).map(([name, val]) => val.map((x, idx) => [`${name}_elem_${idx}`, x])).flat());
    return  {...listObjs, ...scalarObjs};
}


export const loadFormData = () => {
    let data = dummyEPF;
    //data = convertJSONToFields(data);
    return data; // TODO integrate w api
  };

export const convertFieldsToJSON = (data) => {
    let listFields = [...new Set(Object.keys(data).filter(name => name.includes('_elem')).map(name => name.split('_elem')[0])
    )];
    let listObjs = Object.assign({}, ...listFields.map(listField => {return {[listField]: Object.values(Object.fromEntries(Object.entries(data).filter(([key, val]) => key.includes(listField))))};}));
    let scalarObjs = Object.fromEntries(Object.entries(data).filter(([key, val]) => !key.includes('_elem')));
    return  {...listObjs, ...scalarObjs};
}