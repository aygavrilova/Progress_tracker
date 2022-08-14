import React from "react";
import './loadingSpinner.css'
import { Icon } from 'react-icons-kit'
import { spinner3 } from 'react-icons-kit/icomoon/spinner3'
import styled from "styled-components";

const LoadingSpinner = () => {
    return (
        <SpinnerWrapper style={{ width: 38, height: 38 }}>
            <Icon className="spinner-icon" size={'100%'} icon={spinner3} />
        </SpinnerWrapper>
    );
}

export default LoadingSpinner;

const SpinnerWrapper = styled.div`
width: 35;
height: 35;
margin: auto;
`
