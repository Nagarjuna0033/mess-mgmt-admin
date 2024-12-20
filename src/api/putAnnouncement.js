import { db } from "../firebaseUtils/firebaseConfig";
import { collection } from "firebase/firestore";


export const addAnnouncement = async (data) => {
    try {
      
      const docRef = await addDoc(collection(db, "Notification"), data);
        
      return { success: true, message: "Announcement added successfully" };
    } catch (error) {
      console.error("Error adding announcement:", error);
      return { success: false, message: "Error adding announcement", error };
    }
  };
