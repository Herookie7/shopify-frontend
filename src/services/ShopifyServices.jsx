import axios from "axios";

const Shop_API_BASE_URL = "http://localhost:3000";

const token = localStorage.getItem("token");

class ShopifyServices {
  getCustomers() {
    return axios.get(Shop_API_BASE_URL+"/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createCustomers(Customer) {
    return axios.post(Shop_API_BASE_URL+"/customers", Customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getCustomerById(CustomerId) {
    return axios.get(Shop_API_BASE_URL + "/customers" + CustomerId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateCustomer(Customer, CustomerId) {
    return axios.put(Shop_API_BASE_URL + "/customers" + CustomerId, Customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCustomer(CustomerId) {
    return axios.delete(Shop_API_BASE_URL + "/customers" + CustomerId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getProducts() {
    return axios.get(Shop_API_BASE_URL+"/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createProducts(Product) {
    return axios.post(Shop_API_BASE_URL+"/products", Product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getProductById(ProductId) {
    return axios.get(Shop_API_BASE_URL + "/products" + ProductId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateProduct(Product, ProductId) {
    return axios.put(Shop_API_BASE_URL + "/products" + ProductId, Product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteProduct(ProductId) {
    return axios.delete(Shop_API_BASE_URL + "/products" + ProductId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ShopifyServices();