import { db } from "./firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const createUser = async (payload) => {
  console.log(payload);
  try {
    const userDocRef = doc(db, "users", payload.uid);
    await setDoc(userDocRef, payload);
    console.log("User created successfully");
    return 200;
  } catch (error) {
    console.log(error);
    console.log("Error in creating user with the given data");
  }
};

const updateUser = async (payload) => {
  console.log(payload);
  try {
    const userDocRef = doc(db, "users", payload.uid);
    await updateDoc(userDocRef, payload);
    console.log("User updated successfully");
    return 200;
  } catch (error) {
    console.log(error);
    console.log("Error in updating user with the given data");
    return 500;
  }
};
export { createUser, updateUser };
