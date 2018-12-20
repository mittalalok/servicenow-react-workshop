export default class Store {
  constructor(store) {
    this.store = store || window.localStorage;
  }
  set(key, value) {
    return this.store.setItem(key, JSON.stringify(value));
  }
  get(key) {
    let val = this.store.getItem(key);
    if (typeof(val) === 'undefined')
      return null;
    return val;
  }
  remove(key) {
    return this.store.removeItem(key);
  }
}
