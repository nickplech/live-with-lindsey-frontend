import styled from 'styled-components'

const FooterStyles = styled.div`
  width: 100%;
  position: relative;
  bottom: 0;
  background: rgb(30,30,30);
  color: ${(props) => props.theme.offWhite};
  margin: 0;
  font-family: 'Comfortaa';
  padding: 0;
  padding-top: 85px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  z-index: 1000;

  align-items: center;
  justify-self: center;
  font-size: 0.9rem;
  /* height: 250px; */
.left {
  grid-column: 1;
  grid-row: 1;
  justify-content: center;
  align-items: center;
    margin: 0 auto;
    text-align: center;
}
.center {
  grid-column: 2;
  grid-row: 1;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
}
.right {
  grid-column: 3;
  grid-row: 1;
  justify-content: center;
  align-items: center;
    margin: 0 auto;
    text-align: center;
}
  a {
    color: ${(props) => props.theme.offWhite};
    font-size: 1.3rem;
  }
  @media (max-width: 700px) {
    font-size: 11px;
    padding: 20px 10px;
  }
  @media (max-width: 1300px) {
    justify-content: center;
    font-size: 0.8rem;
  }
`

export default FooterStyles
