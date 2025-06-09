const MonyUnits = ["", "만", "억", "조"] as const;

export const formatMoneyToKorean = (
  value: number,
  unit: (typeof MonyUnits)[number] = "만",
) => {
  const valuesSplitByUnit =
    `${value}`
      .split("")
      .reverse()
      .join("")
      .match(/.{1,4}/g) || [];

  const unitIndex = MonyUnits.indexOf(unit);

  return valuesSplitByUnit
    .map((value, index) => {
      value = Array.from(value).reverse().join("");
      const unitValue = MonyUnits[index + unitIndex - 1];
      if (unitValue) {
        value = Number(value).toLocaleString("ko-KR");
        if (unitValue === "억") value = value.replace(/,/g, "");
        if (value === "" || value === "0") return "";
        return `${value}${unitValue}`;
      }
      return "";
    })
    .reverse()
    .join(" ")
    .slice(0, -1)
    .concat("원");
};
