import styled from 'styled-components';

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;

  position: relative;
  bottom: 0px;
  display: flex;
  align-self: center;
  justify-self: center;
  transform: skew(-6deg) rotate(-2deg);
  margin: 0 auto;
  font-family: 'Bison thickoutline';
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);

    background: ${props => props.theme.second};
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: ${props => props.theme.offWhite};
    padding: 0 1rem;

`;

export default Title;
