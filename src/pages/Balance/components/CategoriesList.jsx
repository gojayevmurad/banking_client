import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  createCategoryAsync,
  deleteCategoryAsync,
  getExpenseCategoriesAsync,
  getIncomeCategoriesAsync,
} from "../../../redux/categories/categoriesSlice";
import SelectBox from "../../../components/SelectBox";

const colors = [
  { color: "red" },
  { color: "blue" },
  { color: "purple" },
  { color: "orange" },
];

const CategoriesList = ({ t }) => {
  const dispatch = useDispatch();

  // new category states
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [categoryType, setCategoryType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [target, setTarget] = useState();

  const expenseCategoriesData = useSelector(
    (state) => state.categories.expenseCategories.data
  );
  const incomeCategoriesData = useSelector(
    (state) => state.categories.incomeCategories.data
  );
  const isLoading = useSelector(
    (state) =>
      state.categories.incomeCategories.loading ||
      state.categories.expenseCategories.loading
  );

  const onSubmitNewCategory = (e) => {
    e.preventDefault();

    if (categoryName == "" || activeColor == "" || target == "") {
      return toast.error("Formu doldurun");
    }

    const isIncome = categoryType == "Gəlir" ? true : false;

    const data = {
      categoryName,
      isIncome,
      color: activeColor,
    };

    if (isIncome) {
      dispatch(createCategoryAsync(toast, { ...data, target }));
      dispatch(getIncomeCategoriesAsync(toast));
    } else {
      dispatch(createCategoryAsync(toast, data));
      dispatch(getExpenseCategoriesAsync(toast));
    }
    setShowNewCategory(false);
    setCategoryName("");
    setCategoryType("");
    setActiveColor("");
  };
  const changeActiveColor = (color) => {
    activeColor == color ? setActiveColor("") : setActiveColor(color);
  };
  const removeCategoryHandler = (id) => {
    dispatch(deleteCategoryAsync(toast, id));
  };
  return (
    <div className="categories_list">
      <div className="categories_list--new" data-active={showNewCategory}>
        <div
          className="overlay"
          onMouseDown={() => setShowNewCategory(false)}
        ></div>
        <div className="categories_list--new__content">
          <h3>Yeni kateqoriya</h3>
          <form onSubmit={onSubmitNewCategory}>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Kateqoriya adı"
              type="text"
              name="name"
            />
            <label>
              <p>{t("newCategory")}</p>
              <SelectBox
                option={categoryType}
                setOption={setCategoryType}
                options={["Gəlir", "Xərc"]}
              />
            </label>
            <div className="colors">
              <p>{t("categoryColor")}</p>
              {colors.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={activeColor == item.color ? "active" : ""}
                    onClick={() => changeActiveColor(item.color)}
                    type="button"
                  >
                    <div data-bg={item.color}></div>
                  </button>
                );
              })}
            </div>
            {categoryType == "Gəlir" && (
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder={t("targetMoney")}
                type="number"
              />
            )}
            <button type="submit">{t("create")}</button>
          </form>
        </div>
      </div>
      <div className="categories_list--head">
        <h4>{t("categories")}</h4>
        <button
          className="create-new"
          onClick={() => setShowNewCategory(!showNewCategory)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            id="create"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"></path>
          </svg>
        </button>
      </div>
      <div className="categories_list--content">
        {isLoading && <div className="loading"></div>}
        {!isLoading &&
          incomeCategoriesData &&
          incomeCategoriesData.map((item) => {
            return (
              <div key={item._id} className="categories_list--content__item">
                <div className="content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    id="money"
                    height={24}
                    width={24}
                  >
                    <path
                      fill="green"
                      d="M16 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"
                    ></path>
                    <path
                      fill="green"
                      d="M16.4 13.2h-.8a2.613 2.613 0 0 1-2.493-1.864 1 1 0 1 1 1.918-.565c.075.253.312.43.575.43h.8a.6.6 0 0 0 0-1.201h-.8C14.166 10 13 8.833 13 7.4s1.166-2.6 2.6-2.6h.8c1.121 0 2.111.714 2.466 1.778a1 1 0 1 1-1.897.633.598.598 0 0 0-.569-.411h-.8a.6.6 0 0 0 0 1.2h.8c1.434 0 2.6 1.167 2.6 2.6s-1.166 2.6-2.6 2.6z"
                    ></path>
                    <path d="M16 6c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18C15.01 5.13 15 5.07 15 5c0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm0 8c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18c-.009-.07-.019-.13-.019-.2 0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm2 17H2a1 1 0 0 1-1-1v-9c0-.265.105-.52.293-.707C1.527 20.058 3.653 18 6 18c1.944 0 4.452 1.469 5.295 2H16a3.004 3.004 0 0 1 2.955 3.519l7.891-3.288a2.995 2.995 0 0 1 2.818.273A2.993 2.993 0 0 1 31 23a1 1 0 0 1-.496.864l-12 7A1.003 1.003 0 0 1 18 31zM3 29h14.729l11.14-6.498a1.01 1.01 0 0 0-.314-.334.984.984 0 0 0-.939-.091l-9.23 3.846A1.007 1.007 0 0 1 18 26h-8a1 1 0 1 1 0-2h6a1.001 1.001 0 0 0 0-2h-5c-.197 0-.391-.059-.555-.167C9.68 21.323 7.387 20 6 20c-1.09 0-2.347.88-3 1.439V29z"></path>
                  </svg>
                  <div className="prop">
                    <span>{t("categoryName")}</span>
                    <p>{item.categoryName}</p>
                  </div>
                </div>
                <button
                  className="delete_category"
                  onClick={() => removeCategoryHandler(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    id="delete"
                    height={24}
                    width={24}
                  >
                    <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path>
                  </svg>
                </button>
              </div>
            );
          })}
        {!isLoading &&
          expenseCategoriesData &&
          expenseCategoriesData.map((item) => {
            return (
              <div key={item._id} className="categories_list--content__item">
                <div className="content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    id="money"
                    height={24}
                    width={24}
                  >
                    <path
                      fill="red"
                      d="M16 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"
                    ></path>
                    <path
                      fill="red"
                      d="M16.4 13.2h-.8a2.613 2.613 0 0 1-2.493-1.864 1 1 0 1 1 1.918-.565c.075.253.312.43.575.43h.8a.6.6 0 0 0 0-1.201h-.8C14.166 10 13 8.833 13 7.4s1.166-2.6 2.6-2.6h.8c1.121 0 2.111.714 2.466 1.778a1 1 0 1 1-1.897.633.598.598 0 0 0-.569-.411h-.8a.6.6 0 0 0 0 1.2h.8c1.434 0 2.6 1.167 2.6 2.6s-1.166 2.6-2.6 2.6z"
                    ></path>
                    <path d="M16 6c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18C15.01 5.13 15 5.07 15 5c0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm0 8c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18c-.009-.07-.019-.13-.019-.2 0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm2 17H2a1 1 0 0 1-1-1v-9c0-.265.105-.52.293-.707C1.527 20.058 3.653 18 6 18c1.944 0 4.452 1.469 5.295 2H16a3.004 3.004 0 0 1 2.955 3.519l7.891-3.288a2.995 2.995 0 0 1 2.818.273A2.993 2.993 0 0 1 31 23a1 1 0 0 1-.496.864l-12 7A1.003 1.003 0 0 1 18 31zM3 29h14.729l11.14-6.498a1.01 1.01 0 0 0-.314-.334.984.984 0 0 0-.939-.091l-9.23 3.846A1.007 1.007 0 0 1 18 26h-8a1 1 0 1 1 0-2h6a1.001 1.001 0 0 0 0-2h-5c-.197 0-.391-.059-.555-.167C9.68 21.323 7.387 20 6 20c-1.09 0-2.347.88-3 1.439V29z"></path>
                  </svg>
                  <div className="prop">
                    <span>{t("categoryName")}</span>
                    <p>{item.categoryName}</p>
                  </div>
                </div>
                <button
                  className="delete_category"
                  onClick={() => removeCategoryHandler(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    id="delete"
                    height={24}
                    width={24}
                  >
                    <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path>
                  </svg>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CategoriesList;
