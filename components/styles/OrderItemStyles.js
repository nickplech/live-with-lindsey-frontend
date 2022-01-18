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
  box-shadow: 0 8px 8px -4px rgba(20,20,20,.2);
  h2 {
    border-bottom: 2px solid red;
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  .images {
    display: flex;
    background:  rgba(0, 0, 0, 0.03);
    flex-flow: row wrap;
    margin-top: 1rem;
    width: 100%;
    justify-content: flex-start;
    img {
      height: 100px;
      object-fit: contain;
      margin: 10px 10px;
   width: auto;  box-shadow: 0 8px 8px -4px rgba(20,20,20,.2);
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
