import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from "styled-components";

const Step = ({ step,setStepName, setStepDesc }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [toolbarHidden, setToolbarHidden] = useState(true)

    const onEditorStateChange = (value) => {
        setEditorState(value)
    }

    return (
        <Wrapper onMouseLeave={() => setToolbarHidden(true)}>
            <Name value={step.name} onChange={(e)=>setStepName(step.id, e.target.value) }  ></Name>
            <Editor
                editorState={editorState}
                toolbarHidden={toolbarHidden}
                toolbarClassName="toolbarClassName"

                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onFocus={() => setToolbarHidden(false)}
                onContentStateChange = {(state)=> setStepDesc(step.id, state)}
                onEditorStateChange={(state) => onEditorStateChange(state)}
            />
        </Wrapper>)
}

export default Step;

const Wrapper = styled.div`
background-color: red;
`

const Name = styled.input`
width: 100%;
background-color: #EEEEEE;
text-align: left;
border: 1px solid #1A1A40;
border-radius: 5px;
font-size: 20px;
/* margin: 0px 30px 10px 30px; */
:hover {
    border: 2px solid #51C4D3;
}
:focus {
    border: 2px solid #1A1A40;
} 
`
/* display: flex;
/* width: 47vw; */
// margin-right: 30px;


const Description = styled.textarea`
`
