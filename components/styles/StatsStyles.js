import styled from 'styled-components'

const StatsStyles = styled.div`
  display: grid;
  position: relative;
  bottom: 0;
  width: 100%;
  grid-template-rows: auto auto auto;
  grid-gap: 10px;
  min-height: 250px;
  background: ${props => props.theme.lightgrey};
  border: 0;
  font-size: 1.4rem;
  padding: 1.6rem;
  padding-top: 20px;
  width: 340px;
  margin: 0;

  h1 {
    font-size: 2rem;
    margin: 0;
    padding-top: 0;
    color: ${props => props.theme.black};
  }

  p {
    margin: 0;
  }
`

export default StatsStyles
