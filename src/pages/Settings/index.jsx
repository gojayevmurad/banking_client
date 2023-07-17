import React, { useState } from "react";
import "./settings.scss";
import Checkbox from "../../components/Checkbox";
import SelectBox from "../../components/SelectBox";

const Settings = () => {
  const [notification, setNotification] = useState(true);
  const [theme, setTheme] = useState(true);
  const [language, setLanguage] = useState("English");

  const langOptions = ["English", "Azərbaycanca"];

  return (
    <div className="settings_page">
      <h3>Settings</h3>
      <div className="settings_page--content">
        <div className="preference">
          <h4>Preference</h4>
          <div className="notification">
            <p>Notification</p>
            <Checkbox value={notification} setValue={setNotification} />
          </div>
          <div className="language">
            <p>Language</p>
            <SelectBox
              option={language}
              options={langOptions}
              setOption={setLanguage}
            />
          </div>
          <div className="theme">
            <p>Light Mode / Dark Mode</p>
            <Checkbox value={theme} setValue={setTheme} />
          </div>
        </div>
        <div className="account">
          <h4>Account</h4>
          <form>
            <div className="id">
              <p>ID</p>
              <input type="text" name="" id="" value="12345" disabled />
            </div>
            <div className="phone">
              <p>Phone</p>
              <input type="text" name="" id="" placeholder="0555555555" />
            </div>
            <div className="secret_word">
              <p>Secret Word</p>
              <input type="password" name="" id="" />
            </div>
            <div className="password">
              <p>Password</p>
              <input type="password" name="" id="" />
            </div>
            <div className="address">
              <p>Address</p>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="app_version">
              <p>App Version</p>
              <span>V1.234</span>
            </div>
            <button type="submit">Save Settings</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
