import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${props => props.danger ? "red" : "#38a169"};
  color: white;
  font-weight: bold;
  width: 120px;
  height: 30px;
  border-radius: 4px;
  transition-duration: 0.4s;

  &:disabled {
    opacity: .2;
    pointer-events: none;
  }
`