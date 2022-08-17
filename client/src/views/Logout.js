import { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserContext";

const Logout = () => {
    const { logoutWithRedirect } = useContext(CurrentUserContext);
    logoutWithRedirect();
}

export default Logout;
