
import { Navigate } from "react-router-dom";


const AdminProtected = ({children})=>{
    const role = localStorage.getItem("role")
    if(role === "admin" || role === "user"){
        return children
    }else{
        <Navigate to='/'/>
    }
}

export default AdminProtected