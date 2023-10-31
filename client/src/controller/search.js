export const searchObj = {
  products: (searchText, getProductsAPI, products, setSearchProducts) => {
    if (searchText !== "") {
      const searchProducts = products.filter((product) => {
        console.log(product.product_name.includes(searchText));
        return product.product_name.includes(searchText);
      });

      setSearchProducts(searchProducts);
    } else {
      setSearchProducts([]);
      getProductsAPI();
    }
  },
};
