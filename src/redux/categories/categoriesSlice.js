import { createSlice } from "@reduxjs/toolkit";

import {
  createCategory,
  deleteCategory,
  getExpenseCategories,
  getIncomeCategories,
} from "../../api/categories";

const initialState = {
  creatingCategory: {
    loading: false,
  },
  incomeCategories: {
    loading: false,
    data: null,
  },
  expenseCategories: {
    loading: false,
    data: null,
  },
  deletingCategory: {
    loading: false,
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCreatingCategoryData: (state, action) => {
      state.creatingCategory = {
        ...state.creatingCategory,
        ...action.payload,
      };
    },
    setIncomeCategoriesData: (state, action) => {
      state.incomeCategories = {
        ...state.incomeCategories,
        ...action.payload,
      };
    },
    setExpenseCategoriesData: (state, action) => {
      state.expenseCategories = {
        ...state.expenseCategories,
        ...action.payload,
      };
    },
    setDeletingCategoryData: (state, action) => {
      state.deletingCategory = {
        ...state.deletingCategory,
        ...action.payload,
      };
    },
  },
});

export const createCategoryAsync = (toast, body) => async (dispatch) => {
  dispatch(setCreatingCategoryData({ loading: true }));
  try {
    const response = await createCategory(body);
    response && toast.success(response.message);
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setCreatingCategoryData({ loading: false }));
};

export const deleteCategoryAsync = (toast, id) => async (dispatch) => {
  dispatch(setDeletingCategoryData({ loading: true }));
  try {
    const response = await deleteCategory(id);
    response && toast.success(response.message);
    dispatch(getExpenseCategoriesAsync(toast));
    dispatch(getIncomeCategoriesAsync(toast));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setDeletingCategoryData({ loading: false }));
};

export const getExpenseCategoriesAsync = (toast) => async (dispatch) => {
  dispatch(setExpenseCategoriesData({ loading: true }));
  try {
    const response = await getExpenseCategories();
    response && dispatch(setExpenseCategoriesData({ data: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setExpenseCategoriesData({ loading: false }));
};

export const getIncomeCategoriesAsync = (toast) => async (dispatch) => {
  dispatch(setIncomeCategoriesData({ loading: true }));
  try {
    const response = await getIncomeCategories();
    response && dispatch(setIncomeCategoriesData({ data: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setIncomeCategoriesData({ loading: false }));
};

export const {
  setCreatingCategoryData,
  setDeletingCategoryData,
  setExpenseCategoriesData,
  setIncomeCategoriesData,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
