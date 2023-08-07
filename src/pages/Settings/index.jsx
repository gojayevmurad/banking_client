import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import "./settings.scss";

import { changePasswordAsync } from "../../redux/auth/authSlice";

import Checkbox from "../../components/Checkbox";
import SelectBox from "../../components/SelectBox";
import { validationSchema, convertBase64 } from "../../utils";
import { uploadImage } from "../../api/image";
import { changeProfilePhotoAsync } from "../../redux/profile/profileSlice";

const Settings = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [newImgUrl, setNewImgUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const [notification, setNotification] = useState(true);
  const [theme, setTheme] = useState(true);
  const [language, setLanguage] = useState("English");

  // change password states
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const userInfoes = useSelector((state) => state.profile.userInfoes.data);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (newPassword != reNewPassword) {
      return toast.error("Şifrələr eyni deyil");
    }

    if (newPassword.trim().length == 0) {
      toast.error("Yeni şifrəni daxil edin");
      return;
    }

    for (const validate of validationSchema) {
      if (!validate.re.test(newPassword)) {
        toast.error(validate.message);
        return;
      }
    }

    const data = {
      password,
      newPassword,
    };
    dispatch(changePasswordAsync(toast, data));
  };

  const uploadImageHandler = async (e) => {
    setLoadingImage(true);
    const files = e.target.files[0];

    const base64Image = await convertBase64(files);

    await uploadImage({ image: base64Image })
      .then((res) => setNewImgUrl(res))
      .then(() => setLoadingImage(false))
      .catch((err) => console.log("err", err));
  };

  const changePhotoHandler = () => {
    dispatch(changeProfilePhotoAsync(toast, { imageUrl: newImgUrl }));
    setNewImgUrl("");
  };

  const deleteNewImageHandler = () => {
    setNewImgUrl("");
  };

  return (
    <div className="settings_page">
      <h3>Parametrlər</h3>
      <div className="settings_page--content">
        <div className="preference">
          <h4>Tətbiq</h4>
          <div className="notification">
            <p>Xəbərdarlıq</p>
            <Checkbox value={notification} setValue={setNotification} />
          </div>
          <div className="language">
            <p>Dil</p>
            <SelectBox
              option={language}
              options={["English", "Azərbaycanca"]}
              setOption={setLanguage}
            />
          </div>
          <div className="theme">
            <p>Light Mode / Dark Mode</p>
            <Checkbox value={theme} setValue={setTheme} />
          </div>
        </div>
        <div className="account">
          <h4>Hesab</h4>
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <div className="data">
              <p>Name</p>
              <input
                type="text"
                name=""
                id=""
                value={userInfoes?.name + " " + userInfoes?.surname}
                disabled
              />
            </div>
            <div className="email">
              <p>Email</p>
              <input
                type="email"
                name=""
                id=""
                value={userInfoes?.email}
                disabled
              />
            </div>
            <div className="password">
              <p>Şifrə</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </div>
            <div className="new-pass">
              <p>Yeni şifrə</p>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value.trim())}
              />
            </div>
            <div className="new-pass_re">
              <p>Yeni şifrənin təkrarı</p>
              <input
                type="password"
                value={reNewPassword}
                onChange={(e) => setReNewPassword(e.target.value.trim())}
              />
            </div>
            <div className="app_version">
              <p>App Version</p>
              <span>V1.234</span>
            </div>
            <button type="submit">Save Settings</button>
          </form>
        </div>
        <div className="change_profile_photo">
          {!newImgUrl && !loadingImage && (
            <div className="upload_btn">
              <input
                onChange={uploadImageHandler}
                type="file"
                className="upload_input"
              />
              <div className="upload_btn--content">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p>{t("uploadBtnText")}</p>
                <span>
                  SVG, PNG, {t("or")} GIF ({t("max")} 2MB)
                </span>
              </div>
            </div>
          )}
          {!loadingImage && newImgUrl && <img src={newImgUrl} alt="" />}
          {loadingImage && <div className="loading"></div>}
          {!loadingImage && newImgUrl && (
            <button onClick={changePhotoHandler} className="save_photo_btn">
              {t("save")}
            </button>
          )}
          {!loadingImage && newImgUrl && (
            <button
              className="remove_photo_btn"
              onClick={deleteNewImageHandler}
            >
              {t("delete")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
