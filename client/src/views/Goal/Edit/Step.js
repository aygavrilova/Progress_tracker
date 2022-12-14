import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from "styled-components";

const Step = ({ step,setStepName, setStepDesc }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [contentState, setContentState]= useState()
    const [toolbarHidden, setToolbarHidden] = useState(true)
    
    useEffect(()=>{

        if(!step){
            return;
        }

        if(step.description !== ""){
            const json = JSON.parse(step.description);
            setContentState(json)
        }

    },[])

    const onEditorStateChange = (value) => {
        setEditorState(value)
    }

    return (
        <StepBody onMouseLeave={() => setToolbarHidden(true)}>
            <Name value={step.name} onChange={(e)=>setStepName(step.id, e.target.value) } placeholder="Name of Step" ></Name>
            <EditorWrapper>
            <Editor
                editorState={editorState}
                toolbarHidden={toolbarHidden}
                toolbarClassName="toolbarClassName"
                contentState={contentState}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onFocus={() => setToolbarHidden(false)}
                onContentStateChange = {(state)=> setStepDesc(step.id, state)}
                onEditorStateChange={(state) => onEditorStateChange(state)}
            />
            </EditorWrapper>
        </StepBody>)
}

export default Step;

const StepBody = styled.div`
display: flex;
flex-direction: column;
width: 50vw;
margin-right: 10px;
`

const Name = styled.input`
background-color: #EEEEEE;
text-align: left;
border: 1px solid #1A1A40;
border-radius: 5px;
font-family: 'Caveat', cursive;
font-size: 20px;
margin: 0px 0px 10px 0px;
padding: 5px 0px 5px 0px; 
:hover {
    border: 2px solid #6F4C5B;
}
:focus {
    border: 2px solid #9E7777;
    } 
`


const EditorWrapper = styled.div`
border: 1px solid #1A1A40;
background-color: #EEEEEE;
border-radius: 5px;
margin-top: 10px;
:hover {
    border: 2px solid #6F4C5B;
}
:focus {
    border: 2px solid #9E7777;
} 
`