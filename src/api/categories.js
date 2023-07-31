import { axiosClient } from ".";

const createCategory = (body) => {
  return axiosClient.post("/api/categories/create", body);
};

const getIncomeCategories = () => {
  return axiosClient.get("/api/categories/income-categories");
};

const getExpenseCategories = () => {
  return axiosClient.get("/api/categories/expense-categories");
};

const deleteCategory = (id) => {
  return axiosClient.delete(`/api/categories/remove-category/${id}`);
};

export {
  createCategory,
  getIncomeCategories,
  getExpenseCategories,
  deleteCategory,
};
