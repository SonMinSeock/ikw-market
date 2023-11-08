export const searchObj = {
  products: (searchText, getProductsAPI, products, setSearchProducts) => {
    if (searchText !== "") {
      const searchProducts = products.filter((product) => {
        console.log(product.name.includes(searchText));
        return product.name.includes(searchText);
      });

      setSearchProducts(searchProducts);
    } else {
      setSearchProducts([]);
      getProductsAPI();
    }
  },
};
