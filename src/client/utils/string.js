
let MAX = 50;
export const dottify = (str, max = MAX) => {
  if (str.length <= max) return str;
  else return str.substring(0, max-3) + '...';
};
