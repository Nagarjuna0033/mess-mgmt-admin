import axios from "axios";
const sendNotifications = async (payload) => {
  try {
    const api = process.env.REACT_APP_SEND_NOTIFICATIONS;
    const { data } = await axios.post(api, payload);
    console.log(data);
    return 200;
  } catch (error) {
    console.error(error);
    return 500;
  }
};

export { sendNotifications };
