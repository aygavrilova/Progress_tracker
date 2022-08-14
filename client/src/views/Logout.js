import { useAuth0 } from "@auth0/auth0-react";

const Logout = ()=>{
    const {
        user,
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin,
        });

        logoutWithRedirect();
        return ""
}

export default Logout;