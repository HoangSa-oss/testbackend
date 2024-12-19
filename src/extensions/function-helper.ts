import { KeyValuePair } from '@/dtos/paging.dto';

export const asyncFilter = async (arr, predicate) => {
    const results = await Promise.all(arr.map(predicate));

    return arr.filter((_v, index) => results[index]);
};

export const queryEqualsByFields = (fieldName: KeyValuePair): KeyValuePair => {
    const obj = Object.entries(fieldName).map(([key, value]) => {
        return value === '' || !value ? {} : { [key]: { $eq: value } };
    });
    return obj.length < 0 ? {} : Object.assign({}, ...obj);
};

export const randomCharacter = (length: number) => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
};
