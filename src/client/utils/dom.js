export const isElementInViewport = (el) => {
  let rect = el.getBoundingClientRect();
  let parentRect = el.parentElement.getBoundingClientRect();
  let result =  ((rect.y + rect.height) < (parentRect.y + parentRect.height))
    && (rect.y >= (parentRect.y));
  return result;
};
