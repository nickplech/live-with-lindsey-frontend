import styled from 'styled-components';

const Item = styled.div`
  background: white;

  box-shadow: ${props => props.theme.bs};
  position: relative;
  justify-content: center;
  display: grid;
      box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.09);
  grid-template-rows:  1fr;
  grid-template-columns: 35px 1fr;
    border-radius: 5px;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  /* min-height: 300px; */
      user-select: none;
    cursor: grab;
    border-radius: 10px;
    /* background: rgba(245, 245, 245, 0.8); */


    align-items: center;
    width: 80%;
    margin: 20px auto 45px;
    height: 300px;
  .top {
display: flex;
justify-content: center;
align-items: center;    border-radius: 5px 0 0 5px ;
  grid-column: 1;
  grid-row: 1/2;
height: 100%;
    position: relative;
    width: 100%;
    background: ${props => props.theme.second};
  }
  h1 {
    color: white;
    line-height: 24px;
    font-family: 'Bison';
    width: 300px;
    position: absolute;
    font-size: 18px;
    letter-spacing: 4px;
    transform: rotate(-90deg);
    margin: 0;
    margin-bottom: 75px;
      grid-column: 1;
  grid-row: 1/2;
  }
  .middle {
display: flex;
flex-flow: column;
justify-content: center;
border-radius: 0 10px 10px 0;
align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: lightslategray;
      position: relative;
grid-column: 2;
grid-row: 1/2;
background: url('../static/img/classbackgrounds/gifs/fbpyramid1031.gif') no-repeat center center;
background-size: cover;
  }

  .tags {
    width: 100%;
    position: absolute;
z-index: 80;
margin-bottom: 10px;
margin-left: 10px;
bottom:  0;
    display: flex;
      align-items: flex-end;
    justify-content: flex-start;
    flex-flow: row wrap;
  }
  span {
    margin: 3px 3px;
    background: ${props => props.theme.fourth};
    color: white;
max-height: 24px;
    padding:0px 5px;
    border-radius: 2px;
    font-family: 'Comfortaa';
opacity: .7;

/* &:hover {
  opacity: 1;
} */
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }

  .image1 {
    height: 60px;
    padding: 0px;
    width: 60px;
display: flex;
    z-index: 11000;
    position: relative;
    margin: 0 auto;
    opacity: 1;
      border-radius: 50%;
  background: ${props => props.theme.second};
z-index: 60;
    -webkit-transition: all .6s cubic-bezier(.165,.84,.44,1);
    -o-transition: all .6s cubic-bezier(.165,.84,.44,1);
    transition: all .6s cubic-bezier(.165,.84,.44,1);
    cursor: pointer;
  }
    /* -webkit-transition: all .6s cubic-bezier(.165,.84,.44,1);
    -o-transition: all .6s cubic-bezier(.165,.84,.44,1);
    transition: all .6s cubic-bezier(.165,.84,.44,1);
    color:${props => props.theme.third}; */
`

export default Item;
