import styled from 'styled-components'

const OrderItemStyles = styled.li`
  /* box-shadow: ${props => props.theme.bs}; */
  list-style: none;
  padding: .5rem;
  font-family: 'comfortaa';
  width: 95%;
  margin: 0 auto;
  transition: .3s;
  border: 1px solid ${props => props.theme.offWhite};
 
  h2 {
    border-bottom: 2px solid red;
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  .images {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    margin-top: 1rem;
    img {
      height: 150px;
      object-fit: contain;
      width: 100%;
    }
  }

    strong {
      display: block;
      margin-bottom: 1rem;
    }
  
`
const OrderMeta = styled.div`
display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    display: grid;
    grid-gap: 1rem;
    text-align: center;
    & > * {
      margin: 0;
      background: rgba(0, 0, 0, 0.03);
      padding: 1rem 0;
      ${OrderItemStyles}:hover & {
        background: ${props => props.theme.primary};
}}
`

export  {OrderItemStyles, OrderMeta}
