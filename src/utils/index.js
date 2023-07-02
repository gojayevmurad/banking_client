export const formatMoney = (money) => {
  return money.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};

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