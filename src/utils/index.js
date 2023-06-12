export const formatMoney = (money) => {
    return money.toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });
};
