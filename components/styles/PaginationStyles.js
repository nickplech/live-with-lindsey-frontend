import styled from 'styled-components'

const PaginationStyles = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  margin: 40px auto;
  justify-content: center;
  align-content: center;
  justify-self: center;
  font-size: 16px;
  width: 340px;
  /* margin: 2rem 0; */
font-family: 'Bison';
  border-radius: 0 0 0 0;
  background: ${(props) => props.theme.primary};
  & > * {
    margin: 0 auto;
    padding: 5px 14px;

    &:last-child {
      border-right: 0;
    }
    &:nth-child(2) {
      border-right: 0;
    }
  }
  a {
    color: white;
  }
  a[aria-disabled='true'] {
    color: #ed4264;
    pointer-events: none;
    opacity: 0.5;
  }
  .totes {
    background: white;
  }
`

export default PaginationStyles
