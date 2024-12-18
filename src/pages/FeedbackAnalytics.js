import React, { useState, useEffect } from "react";
import FeedBackAnalyticsGraph from "../components/graphs/FeedBackAnalyticsGraph";
import { getFeedBackData } from "../api/getFeedBackdata";

export default function FeedbackAnalytics() {
  const [value, setValue] = useState([]);

  const getData = async () => {
    try {
      const vv = await getFeedBackData();
      setValue(vv);
      console.log(vv);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (value.length === 0) {
    return <div>Loading feedback data...</div>;
  }

  return <FeedBackAnalyticsGraph data={value} />;
}
