export const queryString = (queryObj) => {
    return Object.keys(queryObj).map(key => {
        return key + '=' + queryObj[key];
    }).join('&');
};

const queryObj = (queryString) => {
    if (!queryString) return {};

    return queryString
        .split('&')
        .map(param => param.split('='))
        .reduce((query, param) => ({
            ...query,
            [param[0]]: param[1]
        }), {});
};

const defaultParams = { $limit: 20, $skip: 0 };

export const getQuery = () => {
    const hashParts = window.location.hash.split('?');
    return hashParts.length > 0 && hashParts[1] ? queryObj(hashParts[1]) : defaultParams;
};

export const isDefined = (a) => typeof a !== 'undefined' && a !== null;
