import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ImagePicker = ({image,onImageSelected}) => {
    const fileRef = useRef();
    const [img, setImg] = useState()
    const handleChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
        onImageSelected(file);
    };

    useEffect(()=>{
        if(image){
            setImg(image);
        }
    },[image])

    return (
        <Wrapper>
            <ImageWrapper>
                <Image src={img}></Image>
                <AddImage>
                    <img width="25" onClick={() => fileRef.current.click()} height="25" src="/images/photo-camera-svgrepo-com.svg"></img>
                </AddImage>
                <input
                    ref={fileRef}
                    onChange={handleChange}
                    multiple={false}
                    type="file"
                    hidden
                />
            </ImageWrapper>
        </Wrapper>
    );
}

export default ImagePicker;

const Wrapper = styled.div`
display:flex;  
flex-direction: column;
/* align-items: center; */
/* justify-content: center; */
/* border: 2px solid green; */
width: 100%;
/* margin: 10px 30px 10px 30px; */
/* justify-content: baseline; */
  /* align-items: center; */
`

const ImageWrapper = styled.div`
display: flex;
  flex-direction: column;
  /* border: 2px solid blue; */
  width: 100%;

`

const AddImage = styled.div`
width: 25px;
height: 25px;
cursor: pointer;
margin-top: 5px;
/* border: 2px solid violet; */
`


const Image = styled.img`
width:100%;
height: fit-content;
`
