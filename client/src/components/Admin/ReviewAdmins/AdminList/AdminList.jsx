import { useEffect } from "react"
import { getAdmin } from "../../../../services/adminService"

export const AdminList = () => {
    
    useEffect(()=>{
        getAdmin(0)
            .then((data)=>{
                console.log(data);
            }).catch((err)=>{
                console.log(err);
            })
    },[])

    return (
        <h1></h1>
    )
}