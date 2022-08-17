import styled from "styled-components";

const ProgressBar = ({steps})=>{

    steps = steps === undefined ? [] : steps
    
    return (
        
        <ProgressbBarWrapper>
            <ProgressBarScaleWrapper>
                <ProgressBarScale>
                    {
                        steps.map((step)=>{
                            return step.finished ? <ProgressBarScaleItemFinished key={step.id}></ProgressBarScaleItemFinished>: <ProgressBarScaleItem key={step.id}></ProgressBarScaleItem>
                        })
                    }
                </ProgressBarScale>
            </ProgressBarScaleWrapper>
        </ProgressbBarWrapper>
    )
}

export default ProgressBar;

const ProgressbBarWrapper = styled.div`
width: 100%;
display: inline-block;
box-sizing: border-box;
margin-top: 30px;
`

const ProgressBarScaleWrapper = styled.div`

`

const ProgressBarScale = styled.div`
flex-direction:row;
display: flex;
`

const ProgressBarScaleItem = styled.div`
background-image: url("/images/scale-line-image.png");
margin: 15px 0px 15px -1px;
height: 15px;
border: 1px  solid darkgray;
width: 100%;
`

const ProgressBarScaleItemFinished = styled.div`
background: #b6cb3e;;
margin: 15px 0px 15px -1px;
height: 15px;
border: 1px  solid darkgray;
width: 100%;
`

