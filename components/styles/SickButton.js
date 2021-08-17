import styled from 'styled-components'

const SickButton = styled.button`
  background: ${(props) => props.theme.second};
  color: white;

  border: 0;
  margin: 0 auto;
  border-radius: 5px;
  font-family: 'Bison';

  font-size: 2rem;
  padding: 0.5rem 1.2rem;
  font-size: 1.8rem;
  display: inline-block;
  letter-spacing: 3px;
  transition: all 0.5s;
  outline: none;
  cursor: pointer;
  box-shadow: 1px 6px 4px -4px rgba(0, 0, 0, 0.2);
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    background: ${(props) => props.theme.primary};
  }
  &:active {
    box-shadow: none;
  }
`

export default SickButton
