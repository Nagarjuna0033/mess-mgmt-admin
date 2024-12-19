import { db } from "./firebaseConfig";
import { doc, setDoc, updateDoc, deleteField } from "firebase/firestore";

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

const removeRoleField = async (docId) => {
  if (!docId) {
    console.log("Document ID is required.");
    return;
  }

  try {
    const docRef = doc(db, "users", docId);

    await updateDoc(docRef, {
      role: deleteField(),
    });

    console.log("Role field removed successfully.");
    return 200;
  } catch (error) {
    console.error("Error removing role field:", error);
    return 500;
  }
};
export { createUser, updateUser, removeRoleField };
