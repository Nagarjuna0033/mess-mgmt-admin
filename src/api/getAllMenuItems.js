import axios from "axios"

export const getAllMenuItems =async ()=>
{
    const url="https://us-central1-mess-management-250df.cloudfunctions.net/getAllMenuItems"
    try{
        const res=await axios.get(url);
        return {status:true,data:res}

    }catch(e)
    {
        return {status:false,msg:e.message};
    }
}