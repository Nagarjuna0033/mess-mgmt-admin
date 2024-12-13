

import axios from "axios"

export const getMessMenuUpdatedNumber =async ()=>
{
    const url="https://firestore.googleapis.com/v1/projects/mess-management-250df/databases/(default)/documents/constants/isMenuUpdated"
    try{
        const res=await axios.get(url);
        return res.data.fields.value.integerValue;

    }catch(e)
    {
        return -1;
    }
}