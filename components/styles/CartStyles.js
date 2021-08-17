import styled from 'styled-components'

const CartStyles = styled.div`
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  height: 100%;
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  span {
    color: ${(props) => props.theme.fourth};
    font-size: 2rem;
  }
  footer {
    margin-top: 40px;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 22px;
    font-family: 'Comfortaa';
  }
  .class-credz {
    font-size: 15px;
    text-align: center;
    align-self: center;
    width: 80%;
    margin: 0;
    background: ${(props) => props.theme.primary};
    padding: 5px 10px;
  }
  .theCount {
    font-family: 'Bison';
    letter-spacing: 2px;
    font-size: 22px;
    opacity: 0.6;
  }
`

export default CartStyles
