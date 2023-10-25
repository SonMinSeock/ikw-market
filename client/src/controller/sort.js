export const sortProducts = (products) => {
  const sortedProducts = products.sort((firstProduct, secondProduct) => {
    if (firstProduct["product_state"] === false && secondProduct["product_state"] === true) {
      return -1;
    } else if (firstProduct["product_state"] === true && secondProduct["product_state"] === false) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedProducts;
};
