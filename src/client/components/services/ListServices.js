import { SERVER_URL } from './Config';

// Example URL: 'candidates?$limit=200&experience=$gt240&gender=m&experience=$lt280&qualification=PHD&$sort=-email name” (edited)';

if (!window.fetch) {
    throw 'Unable to initialize HTTP API';
}

const http = (...args) => window.fetch.apply(null, args).then(res => res.json());

export const CandidatesAPI = {

    DEFAULT_PARAMS: { $limit: 20 },

    getAll() {
        const params = queryString(this.DEFAULT_PARAMS)
        return http(SERVER_URL + 'candidates?' + params);
    },
    
    get(params) {
        debugger
        const _params = queryString({...this.DEFAULT_PARAMS, ...params})
        return http(SERVER_URL + 'candidates?' + _params);
    }
};

const queryString = (queryObj) => {
    return Object.keys(queryObj).map(key => {
        return key + '=' + queryObj[key];
    }).join('&');
};