import { createContext, useEffect, useState } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import { getCurrentUserProfile} from "./api/ProfileApi"
import { getConfig } from "./config.js";


const config = getConfig();

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {

    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [currentProfile, setCurrentProfile] = useState({})
    const [accessToken, setAccessToken] = useState("")

    const {
        getAccessTokenSilently,
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
        isLoading,
    } = useAuth0();

    useEffect(() => {
        setIsUserLoading(isLoading);
    }, [isLoading])

    useEffect(()=>{
        setIsUserAuthenticated(isAuthenticated);
    },[isAuthenticated])

    useEffect(() => {
        if (isUserLoading) {
            return;
        }

        if (!isUserAuthenticated) {
            return;
        }

        getToken()

    }, [isUserAuthenticated])

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        fetchProfile();

    }, [accessToken])

    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin,
        });

    const getToken = async()=>{
        const accessToken = await getAccessTokenSilently({
            audience: `https://${config.domain}/api/v2/`,
            scope: "openid",
        });
        setAccessToken(accessToken);
    }

    const fetchProfile = async () => {
        try {
            setIsUserLoading(true)
            const profile = await getCurrentUserProfile(accessToken)
            setCurrentProfile(profile)
            setIsUserLoading(false)
        }
        catch (error) {
            throw error
        }
    }

    return <CurrentUserContext.Provider value={{ accessToken, currentProfile, isUserLoading, isUserAuthenticated, loginWithRedirect, logoutWithRedirect }}>
        {children}
    </CurrentUserContext.Provider>
}
