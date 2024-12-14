import { db, collection, getDocs } from ".././utils/fireBaseConfig"


export const getFeedBackData=async()=>{
    try {
        const querySnapshot = await getDocs(collection(db, "feedbackResponses"));
        const fetchedData = querySnapshot.docs.map(doc => doc.data()); 
        // console.log(generateMessAnalytics(fetchedData))
        return generateMessAnalytics(fetchedData)
      } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export const generateMessAnalytics = (data) => {
    const categories = [
      { name: "Timeliness", key: "timeliness" },
      { name: "Neatness_cleanliness", key: "cleanliness" },
      { name: "Food_quality", key: "quality" },
      { name: "Taste_of_curries", key: "taste" },
      { name: "Snacks_tea_coffee_breakfast", key: "snacks" },
      { name: "Quantity_of_food_as_per_menu", key: "quantity" },
      { name: "Employee_courtesy", key: "courtesy" },
      { name: "Uniform_wearing_by_employees", key: "attire" },
      { name: "Cooking_as_per_menu", key: "serving" },
      { name: "Cleanliness_of_wash_basins_and_wash_area", key: "washArea" },
    ];
  
    const groupedByMess = data.reduce((acc, entry) => {
      const { mess } = entry;
  
      if (!acc[mess]) {
        acc[mess] = [];
      }
  
      acc[mess].push(entry);
      return acc;
    }, {});
  
    const messAnalyticsData = Object.keys(groupedByMess).map((mess) => {
      const messData = groupedByMess[mess];
      const categoriesAverage = {};
  
      categories.forEach(({ name, key }) => {
        const categoryScores = messData.map((entry) => entry[key]);
        const avg = categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length;
        categoriesAverage[name] = parseFloat(avg.toFixed(1)); // Round to 1 decimal place
      });
  
      const overallAverage = Object.values(categoriesAverage).reduce((sum, avg) => sum + avg, 0) / categories.length;
  
      return {
        mess,
        categories: categoriesAverage,
        overallAverage: parseFloat(overallAverage.toFixed(2)), // Round to 2 decimal places
      };
    });
  
    return messAnalyticsData;
  };