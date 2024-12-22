import axios from "axios";

export const getAllMenuData = async () => {
  const api = process.env.REACT_APP_GET_ALL_MENU;
  try {
    const res = await axios.get(api);
    return { status: true, data: res };
  } catch (e) {
    return { status: false, msg: e.message };
  }
};
