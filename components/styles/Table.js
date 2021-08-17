import styled from 'styled-components'

const Table = styled.table`
  border-spacing: 0;
  width: 80%;
  border: 1px solid ${props => props.theme.offWhite};
  margin-left: 20px;
  margin-top: 50px;
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    padding: 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
  }
  label {
    display: block;
    padding: 10px 5px;
  }
  tr {
    &:hover {
      background: ${props => props.theme.offWhite};
    }
  }
`

export default Table
