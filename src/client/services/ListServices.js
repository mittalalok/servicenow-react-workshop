import { SERVER_URL } from './Config';

// Example URL: 'candidates?$limit=200&experience=$gt240&gender=m&experience=$lt280&qualification=PHD&$sort=-email name” (edited)';

if (!window.fetch) {
    throw 'Unable to initialize HTTP API';
}

const http = (...args) => window.fetch.apply(null, args).then(res => res.json());

export const ListsAPI = {
    get(listType, params) {
        return http(`${SERVER_URL}${listType}?${params}`);
    }
};