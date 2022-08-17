import { useEffect, useState } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import { getConfig } from "../../config";
import { getCurrentUserProfile, updateUserProfile, updateProfileEmailPrefs } from "../../api/ProfileApi"
import styled from "styled-components";
import Modal from '../../components/Modal/Modal.js'
import LoadingSpinner from '../../components/LoadingSpinner'

const config = getConfig(); // get auth_config settings


const Profile = () => {
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        isLoading,
        getAccessTokenSilently,
    } = useAuth0();

    const [userProfile, setUserProfile] = useState({});
    const [emailPrefs, setEmailPrefs] = useState(null);
    const [emailPrefsLoading, setEmailPrefsLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("")
    const [email, setEmail] = useState("");
    const [showFullNameModal, setShowFullNameModal] = useState(false)
    const [showEmailPrefsModal, setShowEmailPrefsModal] = useState(false)
    // email prefs state
    const [notifyFrBth, setNotifyFrBth] = useState(true)
    const [notifyFrReq, setNotifyFrReq] = useState(true)
    const [notifyOnComms, setNotifyOnComms] = useState(true)

    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (isAuthenticated) {
            fetchProfile();
        } else {
            loginWithRedirect();
        }
    }, [isAuthenticated, isLoading])

    useEffect(() => {
        setEmailPrefsProperties();
    }, [emailPrefs])

    const setEmailPrefsProperties = () => {
        if (!emailPrefs) {
            return;
        }

        setNotifyFrBth(emailPrefs.friendBirthday);
        setNotifyFrReq(emailPrefs.friendRequest);
        setNotifyOnComms(emailPrefs.goalComment);
    }

    const fetchProfile = async () => {
        try {
            setUserLoading(true)
            const accessToken = await getAccessTokenSilently({
                audience: `https://${config.domain}/api/v2/`,
                scope: "openid",
            });

            const profile = await getCurrentUserProfile(accessToken)
            setUserProfile(profile)
            setUserLoading(false)
        }
        catch (error) {
            throw error
        }
    }

    useEffect(() => {
        setUserProfilePropertise();
        setEmailPrefs(userProfile.emailPrefs)
        setEmail(userProfile.email)

    }, [userProfile])



    const setUserProfilePropertise = () => {
        if (!userProfile) {
            return;
        }

        if (userProfile.firstName) {
            setFirstName(userProfile.firstName);
        }

        if (userProfile.lastName) {
            setLastName(userProfile.lastName);
        }

        if (userProfile.country) {
            setCountry(userProfile.country);
        }
    }

    const onUpdateUserInfo = async () => {
        setUserLoading(true);
        const updateObj = {
            firstName: firstName,
            lastName: lastName,
            country: country
        };

        const accessToken = await getAccessTokenSilently({
            audience: `https://${config.domain}/api/v2/`,
            scope: "openid",
        });
        setShowFullNameModal(false);

        const profile = await updateUserProfile(accessToken, updateObj)
        setUserProfile(profile)
        setUserLoading(false);
    }

    const onCancelUserInfoUpdate = () => {
        setUserProfilePropertise();
        setShowFullNameModal(false);
    }

    const onUpdateEmailPrefs = async () => {
        setEmailPrefsLoading(true);
        const updateObj = {
            emailPrefs: {
                friendRequest: notifyFrReq,
                friendBirthday: notifyFrBth,
                goalComment: notifyOnComms
            }
        }
        const accessToken = await getAccessTokenSilently({
            audience: `https://${config.domain}/api/v2/`,
            scope: "openid",
        });
        setShowEmailPrefsModal(false)

        const emailPrefs = await updateProfileEmailPrefs(accessToken, updateObj);
        setEmailPrefs(emailPrefs);
        setEmailPrefsLoading(false);
    }

    const onCancelEmailPrefsUpdate = () => {
        setEmailPrefsProperties();
        setShowEmailPrefsModal(false);
    }

    return <Wrapper>
        <Titel>Account Settings</Titel>
        <Card>
            {
                isLoading ? (<LoadingSpinner></LoadingSpinner>) :
                    (<>
                        {
                            isAuthenticated && (<>
                                <UserProfile>

                                    <Modal show={showFullNameModal} handleClose={() => setShowFullNameModal(false)}>
                                        <FullNameModalBody>
                                            <H1>Edit Name</H1>
                                            <Label>Your first name</Label>
                                            <Input value={firstName} onChange={(event) => setFirstName(event.target.value)}></Input>
                                            <Label>Your last name</Label>
                                            <Input value={lastName} onChange={(event) => setLastName(event.target.value)}></Input>
                                            <Label>Your country</Label>
                                            <Input value={country} onChange={(event) => setCountry(event.target.value)}></Input>
                                            <BtnWrapper>
                                                <Btn type="button" onClick={onUpdateUserInfo}>Update</Btn>
                                                <Btn type="button" onClick={onCancelUserInfoUpdate}>Cancel</Btn>
                                            </BtnWrapper>
                                        </FullNameModalBody>
                                    </Modal>

                                    <CardWrapper>
                                        <Img>
                                            <svg viewBox="0 0 16 16" width="200px">
                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"></path>
                                            </svg>
                                        </Img>
                                        <Wrapper1>
                                            {userLoading ? (<LoadingSpinner></LoadingSpinner>) : <>
                                                <CardTitel>{`${userProfile.firstName} ${userProfile.lastName}`}</CardTitel>
                                                <Button type="button" onClick={() => setShowFullNameModal(true)}>
                                                    Edit
                                                </Button>
                                            </>}
                                        </Wrapper1>
                                    </CardWrapper>

                                </UserProfile>

                                <CardWrapper>
                                    <Img>
                                        <svg viewBox="0 0 16 16" width="200px">
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"></path>
                                        </svg>
                                    </Img>
                                    {userLoading ? (<LoadingSpinner></LoadingSpinner>) : <CardTitel>{email}</CardTitel>}
                                </CardWrapper>

                                <EmailPreferencesSection> <>
                                    <CardWrapper>
                                        <Img>
                                            <svg viewBox="0 0 16 16" width="200px">
                                                <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"></path>
                                            </svg>
                                        </Img>
                                        <Wrapper1>
                                            <CardTitel>Email preferences</CardTitel>
                                            {
                                                emailPrefsLoading ? (<LoadingSpinner></LoadingSpinner>) 
                                                : (<Button type="button" onClick={() => setShowEmailPrefsModal(true)}>
                                                    Edit
                                                </Button>)
                                            }
                                        </Wrapper1>
                                    </CardWrapper>

                                    <Modal show={showEmailPrefsModal} handleClose={() => setShowEmailPrefsModal(false)}>

                                        <EmailPrefsModalBody>
                                            <H1>Choose when to receive an email</H1>
                                            <Label for="frBth" >
                                                <Check id="frBth" type="checkbox" value="Friend's birthday" checked={notifyFrBth} onChange={(event) => setNotifyFrBth(event.target.checked)} />
                                                Friend's birthday
                                            </Label>
                                            <Label for="friendReq">
                                                <Check id="friendReq" type="checkbox" value="Request to be friends" checked={notifyFrReq} onChange={(event) => setNotifyFrReq(event.target.checked)}></Check>
                                                Request to be friends
                                            </Label>
                                            <Label for="frComments">
                                                <Check id="frComments" type="checkbox" checked={notifyOnComms} onChange={(event) => setNotifyOnComms(event.target.checked)} value="A friend comments on a Goal"></Check>
                                                A friend comments on a Goal
                                            </Label>
                                            <BtnWrapper>
                                                <Btn type="button" onClick={onUpdateEmailPrefs}>Update</Btn>
                                                <Btn type="button" onClick={onCancelEmailPrefsUpdate}>Cancel</Btn>
                                            </BtnWrapper>

                                        </EmailPrefsModalBody>

                                    </Modal>
                                    {/* <EmailPreferencesEdit type="button" onClick={() => setShowEmailPrefsModal(true)}>Edit</EmailPreferencesEdit> */}
                                </>
                                </EmailPreferencesSection>
                            </>
                            )
                        }
                        {
                            !isAuthenticated && ("")
                        }
                    </>)
            }

        </Card>
    </Wrapper>
}

export default Profile;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: calc(100vh - 160px);
width: 100vw;
background-color: #EEEEEE;
`
const Titel = styled.h1`
display: flex;
color: #1A1A40;
font-size: 30px;
padding: 0px;
`

const Card = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
width: 60vw;
margin-bottom: 30px;
background-color: white;
border-radius: 25px;
`
const UserProfile = styled.div`
`
const FullNameModalBody = styled.div`
display: flex;
flex-direction: column;
height: 50vh;
width: 20vw;
padding: 10px 0px 0px 30px;
`
const H1 = styled.h1`
display: flex;
color: #1A1A40;
font-size: 30px;
`

const Label = styled.p`
color: #1A1A40;
font-size: 20px;
font-weight: bold;
margin: 20px 0px 5px 0px;
`

const Input = styled.input`
border: 2px solid #1A1A40; 
height: 30px;
width: 15vw;
border-radius: 5px;
font-size: 15px;
padding: 2px;
:hover {
    border: 2px solid #51C4D3;
}
`

const BtnWrapper = styled.div`
display: flex;
flex-direction: row;
margin-top: 30px;
`

const Btn = styled.button`
color: #1A1A40;
background-color: #EEEEEE;
font-size: 15px; 
border: 1px solid gray;
border-radius: 8px;
margin: 0px 5px 20px 0px;
padding: 5px 15px 5px 15px;
:focus {
    background-color: #DEBA9D;
    color: white;
}
:hover {
    border: 2px solid #DEBA9D;
}
`

const CardWrapper = styled.div`
display: flex;
flex-direction: row;
width: 50vw;
height: 150px;
margin: 50px 20px 0px 20px;
border: 2px solid #1A1A40; 
border-radius: 8px; 
:hover {
    border: 2px solid #DEBA9D;
    border-radius: 8px;
}
:focus {
    border: 2px solid #DEBA9D;
}
`

const Img = styled.div`
display: flex;
width: 70px;
height:70px;
margin: 10px 30px 0px 10px;
`

const Wrapper1 = styled.div`
width: 60vw;
height: auto;
display: flex;
flex-direction: column;
margin: 5px 0px 0px 10px;
`

const CardTitel = styled.h2`
font-size: 20px;
color: #1A1A40;
`

const EmailPreferencesSection = styled.div`
`


const EmailPrefsModalBody = styled.div`
display: flex;
flex-direction: column;
height: 30vh;
width: 60vw;
padding: 20px;
`

const Check = styled.input`
margin-right: 15px;
`

const Button = styled.button`
display: inline-block;
cursor: pointer;
color: #1A1A40;
margin-top: 20px;
height: 50px;
width: 90px;
font-size: 15px;
border-radius: 15px;
border: 1px solid #e1e1e1;
:hover{
    border: 2px solid #DEBA9D;
}
`