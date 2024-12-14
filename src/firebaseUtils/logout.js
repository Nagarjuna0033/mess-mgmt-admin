import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

const logoutUser = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("details");
      alert("User logged out successfully ");
    })
    .catch((error) => {
      "error in logging out user";
    });
};

export { logoutUser };
