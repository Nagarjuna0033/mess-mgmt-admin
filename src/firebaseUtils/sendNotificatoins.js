import axios from "axios";
const sendNotifications = async (payload) => {
  try {
    const { data } = await axios.post(
      "https://us-central1-mess-management-250df.cloudfunctions.net/sendNotification",
      payload
    );
    console.log(data);
    return 200;
  } catch (error) {
    console.error(error);
    return 500;
  }
};

export { sendNotifications };
