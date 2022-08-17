import './styles.css'
import styled from 'styled-components';

const ToggleSwitch = ({checked, onChange}) => {
    return (
        <SwitchLabel className='switch'>
            <Input  type="checkbox" checked={checked} onChange={onChange} />
            <Span className='slider round' />
        </SwitchLabel>
    )
}

export default ToggleSwitch;

const SwitchLabel = styled.label`
margin: 0px 10px 0px 20px;
`

const Input = styled.input`
`

const Span = styled.span`

`
