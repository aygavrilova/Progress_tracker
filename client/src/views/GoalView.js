import { User } from "@auth0/auth0-react";
import { useState,useEffect } from "react";
import draftToHtml from 'draftjs-to-html'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GoalView = ({ goal }) => {
    const [description, setDescription] = useState("")
    const [img, setImg] = useState("/images/crowd.jpeg")
    const navigate = useNavigate()
    useEffect(() => {
        if (!goal) {
            return;
        }

        if (goal.description) {
            const desc = JSON.parse(goal.description);
            setDescription(draftToHtml(desc));
        }

        if(goal.imagePath){
            setImg(goal.imagePath);
        }

    }, [])
    
    const createDescMarkup = () => {
        return { __html: `${description}` }
    }

    const onClickHandler =()=>{
        const url =`/goal/${goal._id}`
        navigate(url);
    }

    return (
        <Wrapper onClick={()=>onClickHandler()}>
            <ImgWrapper>
                <Image src={img}></Image>
            </ImgWrapper>
            <Content>
                <GoalTitel>{goal.name}</GoalTitel>
                <Description  className="limit" dangerouslySetInnerHTML={createDescMarkup()}></Description>
            </Content>
        </Wrapper>
    )

}

export default GoalView;

const Wrapper = styled.div`
display: flex;
justify-content: flex-start;
background-color: #FFEDDB;
float: left;
flex-direction: column;
align-items: center;
height: 400px;
width: 395px;
margin: 25px 20px 0px 12px;
border: 1px solid #6F4C5B;
border-radius: 15px;
:hover {
border: 1px solid white;
}

`


const ImgWrapper = styled.div`
  /* background: url("/images/crowd.jpeg"); */
  width: 100%;
  height: 50%;
  margin-top: 0px;
  border-radius: 15px 15px 0px 0px;

`

const Image = styled.img`
width: 100%;
  height: 100%;
 border-radius: 15px 15px 0px 0px;
`

const Content = styled.div`
display: flex;
flex-direction: column;
align-content: center;
width: 100%;
height: auto;
overflow: hidden;
white-space: nowrap; 
text-overflow: ellipsis;
`

const Description = styled.div`
display: flex;
font-family: 'Caveat', cursive;
color: #1A1A40;
width: 100%;
font-size: 20px;
text-overflow: ellipsis;
margin: 5px 15px 5px 15px;
`
const GoalTitel = styled.h3`
color: #1A1A40;
font-family: 'Caveat', cursive;
margin: 5px;

`
