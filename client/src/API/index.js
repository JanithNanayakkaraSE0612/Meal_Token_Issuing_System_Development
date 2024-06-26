export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};

export const getAllProducts = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};
export const getProductsByCategory = (category) => {
  return fetch(`https://dummyjson.com/products/category/${category}`).then(
    (res) => res.json()
  );
};
