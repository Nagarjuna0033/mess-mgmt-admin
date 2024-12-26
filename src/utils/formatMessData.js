export const formatMessData = (res) => {
  let FormattedData = {};
  const data = res.data.data;
  for (let day in data) {
    let meals = data[day];
    let formattedMeals = {};
    for (let meal in meals) {
      const val = meals[meal].reduce(
        (acc, val) => acc + ", " + val.itemName,
        ""
      );
      formattedMeals[meal] = val.substring(2);
    }
    FormattedData[day] = formattedMeals;
  }
  return FormattedData;
};