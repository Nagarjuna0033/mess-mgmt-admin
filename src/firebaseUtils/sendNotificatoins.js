import axios from "axios";
const sendNotifications = async (title, payload, FCFS_TOKEN, type) => {
  const options = {
    method: "POST",
    url: "https://us-central1-mess-management-250df.cloudfunctions.net/sendNotification",
    headers: {
      Accept: "/",
      "Content-Type": "application/json",
    },
    data: {
      payload: {
        token: FCFS_TOKEN,
        notification: { title: title, body: payload },
        data: { type: type },
      },
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
    return 200;
  } catch (error) {
    console.error(error);
    return 500;
  }
};

export { sendNotifications };
