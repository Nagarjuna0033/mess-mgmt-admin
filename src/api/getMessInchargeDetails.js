import { db} from "../firebaseUtils/firebaseConfig"
import {collection, getDocs ,setDoc} from "firebase/firestore"

export const getAllInchargeDetails=async()=>{
    try {
        const querySnapshot = await getDocs(collection(db, "MessIncharge"));
        const fetchedData = querySnapshot.docs.map(doc => doc.data()); // map docs to data
        // console.log(fetchedData)
        return fetchedData
      } catch (error) {
        console.error("Error fetching data:", error);
    }
}


export const getAllMessses=async()=>{
    try {
        const messIncharges=await getAllInchargeDetails();
        const formattedData=messIncharges.map((item)=>item.messName)
        return formattedData
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export const getInitialMessesAllocation = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "MessesAllocated"));
  
      
      if (!querySnapshot.empty) {
        const singleDoc = querySnapshot.docs[0]; 
        const fetchedData = singleDoc.data(); 
        console.log("Fetched Data:", fetchedData);
        return fetchedData;
      } else {
        console.log("No documents found in the collection.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  export const setMessAllocation = async (updatedData) => {
    try {
      
      const docRef = await getDocs(collection(db, "MessesAllocated", "Details")); 
  
      
      await setDoc(docRef, updatedData); 
  
      console.log("Mess allocation updated successfully:", updatedData);
      return { success: true, message: "Mess allocation updated successfully" };
    } catch (error) {
      console.error("Error updating mess allocation:", error);
      return { success: false, message: "Error updating mess allocation", error };
    }
  };