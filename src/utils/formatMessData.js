export const FormatMessData = (res) => {
    let formattedData = {}; // Use an object to store data by days
    const data = res.data.data;

    for (let day in data) {
        let meals = data[day];
        let formattedMeals = {};

        for (let meal in meals) {
            const val = meals[meal].reduce((acc, val) => acc + ", " + val.itemName, "");
            formattedMeals[meal] = val.substring(2); // Remove leading ", "
        }

        formattedData[day] = formattedMeals; // Assign meals to their respective day
    }

    return formattedData; // Return as an object
};
