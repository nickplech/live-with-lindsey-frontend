import styled from 'styled-components'

const NavStyles = styled.ul`
  grid-column: 2;
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 1.2rem;
  z-index: 0;
  position: relative;
  align-items: center;

  a {
    padding: 0rem 2rem;
    display: flex;
    align-items: center;
    position: relative;
    letter-spacing: 4px;
    font-family: 'Bison';

    font-size: 1.1em;
    background: none;
    border: 0;
    color: ${(props) => props.theme.offWhite};
    height: 20px;
    z-index: 5;
    cursor: pointer;

    &:after {
      height: 2px;
      background: ${(props) => props.theme.second};
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 1.8rem;
    }
    @media (max-width: 699px) {
      &:after {
        height: 0;
        background: none;
        content: '';
        width: 0;
        position: absolute;
        transform: none;
        transition: none;
        left: 50%;
        margin-top: 1.3rem;
      }
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
  }
  @media (min-width: 768px) {
    /* border-top: 1px solid ${(props) => props.theme.lightgrey}; */
    width: 100%;
    justify-content: flex-end;
    font-size: 1.2rem;
  }
  .signout {
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    color: ${(props) => props.theme.second};

    z-index: 5;
    cursor: pointer;
    padding: 7px 10px 7px 10px;
    margin: 0 20px;
    border: 2px solid ${(props) => props.theme.second};
    border-radius: 5px;
    transition: 0.3s;
    &:hover,
    &:focus {
      outline: none;
      background: ${(props) => props.theme.second};
      color: white;
    }
  }
  /* .display__none {
  display: flex;
  @media(min-width: 768px) {
    display: none;
  }
} */
`

export default NavStyles
