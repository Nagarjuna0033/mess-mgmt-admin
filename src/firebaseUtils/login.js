import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseUtils/firebaseConfig";
import { isInDb } from "../firebaseUtils/getRequests";

const provider = new GoogleAuthProvider();
const handleUserLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    const check = await isInDb(user.uid);
    console.log(check);
    if (check) {
      localStorage.setItem("details", "true");
    } else {
      localStorage.setItem("details", "false");
    }
    window.history.replaceState(null, "", "/");
    window.location.href = "/";
  } catch (error) {
    console.log("error", error.code, "error msg: ", error.message);
  }
};

export { handleUserLogin };
