import axios from "axios"

export const getAllMenuData =async ()=>
{
    const url="https://us-central1-mess-management-250df.cloudfunctions.net/getAllMenu"
    try{
        const res=await axios.get(url);
        return {status:true,data:res}

    }catch(e)
    {
        return {status:false,msg:e.message};
    }
}

