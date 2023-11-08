export const sortProducts = (products) => {
  const sortedProducts = products.sort((firstProduct, secondProduct) => {
    if (firstProduct["state"] === false && secondProduct["state"] === true) {
      return -1;
    } else if (firstProduct["state"] === true && secondProduct["state"] === false) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedProducts;
};
