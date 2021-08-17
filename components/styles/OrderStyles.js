import styled from 'styled-components'

const OrderStyles = styled.div`
  max-width: 800px;
  margin: 100px 25px;
  font-family: 'Comfortaa';
  border: 1px solid ${(props) => props.theme.offWhite};
  box-shadow: ${(props) => props.theme.bs};
  padding: 2rem;

  border-top: 10px solid ${(props) => props.theme.second};
  @media (min-width: 768px) {
    margin: 100px auto;
  }

  & > p {
    display: grid;
    align-items: center;
    grid-template-columns: 200px 5fr;
    margin: 0;
    border-bottom: 1px solid ${(props) => props.theme.offWhite};
    span {
      padding: 1rem;
      &:first-child {
        font-weight: 900;
        font-size: 18px;
        color: ${(props) => props.theme.third};
        text-align: left;
      }
    }
  }

  .order-item {
    border-bottom: 1px solid ${(props) => props.theme.offWhite};
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding-bottom: 2rem;
    img {
      width: 100px;
      height: 10px;
      object-fit: contain;
    }
  }
  h1 {
    color: ${(props) => props.theme.second};
  }
`
export default OrderStyles
