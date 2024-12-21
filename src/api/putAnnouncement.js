import { db } from "../firebaseUtils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";


export const addAnnouncement = async (data) => {
    try {
      
      await addDoc(collection(db, "Notification"), data);
        
      return { success: true, message: "Announcement added successfully" };
    } catch (error) {
      console.error("Error adding announcement:", error);
      return { success: false, message: "Error adding announcement", error };
    }
  };
