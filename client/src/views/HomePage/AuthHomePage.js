import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const AuthHomePage = () => {
    const {
        user,
    } = useAuth0();

    useEffect(()=>{
        console.log(user)
    },[user])

}

export default AuthHomePage;
