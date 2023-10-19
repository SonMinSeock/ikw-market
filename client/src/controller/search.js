export const searchObj = {
  products: (searchText, getProductsAPI, products, setProducts) => {
    if (searchText !== "") {
      //console.log("search text : ", searchText);
      const searchProducts = products.filter((product) => product.product_name.includes(searchText));

      searchProducts.length === 0 ? getProductsAPI() : setProducts(searchProducts);

      //console.log("search products ...", searchProducts);
    } else {
      getProductsAPI();
    }
  },
};
