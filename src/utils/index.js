export const formatMoney = (money) => {
  return money.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export function formatTime(dateString) {
  const date = new Date(dateString);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const amPm = hour < 12 ? "AM" : "PM";
  const formatedTime = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")} ${amPm}`;
  return formatedTime;
}

export const ChevronUp = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" id="chevron">
      <path
        fill="none"
        stroke="#00a389"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 7 7 1 1 7"
      ></path>
    </svg>
  );
};

export const ChevronDown = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" id="chevron">
      <path
        fill="none"
        stroke="#ff4a55"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 6 6 6-6"
      ></path>
    </svg>
  );
};

const colors = {
  red: "#ff4a55",
  orange: "#ffb74a",
  blue: "#54c5eb",
  purple: "#6160dc",
  green: "#00a389",
};

export const returnColor = (color) => colors[color];

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};


export const validationSchema = [
  { re: /(?=.*[a-z])/, message: "Şifrədə kiçik hərf olmalıdır" },
  { re: /(?=.*[A-Z])/, message: "Şifrədə böyük hərf olmaldır" },
  { re: /(?=.*\d)/, message: "Şifrədə rəqəm olmalıdır" },
  { re: /(?=.*[!@#$%^&*])/, message: "Şifrədə simvol olmalıdır" },
  { re: /.{8,}/, message: "Şifrənin minimum uzunluğu 8 olmalıdır" },
];