import { db } from "../firebaseUtils/firebaseConfig";
import { collection,addDoc } from "firebase/firestore";


export const addAnnouncement = async (data) => {
    try {
      
      const docRef = await addDoc(collection(db, "Notification"), data);
  
    //   console.log("Announcement added successfully with ID:", docRef.id);
      return { success: true, message: "Announcement added successfully" };
    } catch (error) {
      console.error("Error adding announcement:", error);
      return { success: false, message: "Error adding announcement", error };
    }
  };