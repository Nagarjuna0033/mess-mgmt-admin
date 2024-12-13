import { db, collection, getDocs } from ".././utils/fireBaseConfig"


export const getAllComplaints=async()=>{
    try {
        const querySnapshot = await getDocs(collection(db, "complaints"));
        const fetchedData = querySnapshot.docs.map(doc => doc.data()); 
        console.log(fetchedData)
        return fetchedData
      } catch (error) {
        console.error("Error fetching data:", error);
    }
}


export const convertComplaintsBasedOnCategory=(rawData)=>{
    const categoryData = {};

    
    rawData.forEach(item => {
      const category = item.category;
      const isResolved = item.status === 'done';
      if (!categoryData[category]) {
        categoryData[category] = { solved_complaints: 0, pending_complaints: 0 };
      }
      if (isResolved) {
        categoryData[category].solved_complaints++;
      } else {
        categoryData[category].pending_complaints++;
      }
    });
    const data = Object.keys(categoryData).map(category => ({
      category,
      solved_complaints: categoryData[category].solved_complaints,
      pending_complaints: categoryData[category].pending_complaints
    }));

    return data
    
}



export const convertComplaintsBasedOnMess=(rawData)=>{
    const messData = {};

    
    rawData.forEach(item => {
      const mess = item.mess;
      const isResolved = item.status === 'done';
      if (!messData[mess]) {
        messData[mess] = { solved_complaints: 0, pending_complaints: 0 };
      }
      if (isResolved) {
        messData[mess].solved_complaints++;
      } else {
        messData[mess].pending_complaints++;
      }
    });
    const data = Object.keys(messData).map(messName => ({
      messName,
      solved_complaints: messData[messName].solved_complaints,
      pending_complaints: messData[messName].pending_complaints
    }));

    return data
    
}