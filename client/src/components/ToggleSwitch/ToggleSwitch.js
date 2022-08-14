import './styles.css'
import styled from 'styled-components';

const ToggleSwitch = () => {
    return (
        <SwitchLabel className='switch'>
            <Input type="checkbox" />
            <Span className='slider round' />
        </SwitchLabel>
    )
}

export default ToggleSwitch;

const SwitchLabel = styled.label`
`

const Input = styled.input`
    
`

const Span = styled.span`
`
