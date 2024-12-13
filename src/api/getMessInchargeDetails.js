import { db, collection, getDocs } from ".././utils/fireBaseConfig"


export const getAllInchargeDetails=async()=>{
    try {
        const querySnapshot = await getDocs(collection(db, "MessIncharge"));
        const fetchedData = querySnapshot.docs.map(doc => doc.data()); // map docs to data
        console.log(fetchedData)
        return fetchedData
      } catch (error) {
        console.error("Error fetching data:", error);
    }
}