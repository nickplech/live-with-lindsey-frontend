import Link from 'next/link'
import styled from 'styled-components'

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr ;
  grid-template-rows: 40px 1fr 20px;
  justify-content: center;
  width: 100%;
  position: relative;
  height: 350px;
  margin: 0px auto;
  padding: 20px;
  background: rgb(30, 30, 30);
  bottom: 0;
  .copy {
    text-align: center;
    grid-row: 3;
    font-size: 10px;
    font-family: 'Comfortaa';
    background: rgb(30, 30, 30);
    position: relative;
    width: 100%;
    color: white;
    margin: 0 auto;
    padding: 0;
  }
  .insta {
    height: 25px;
width: 25px;
position: absolute;
transform: translate(-88px, -70px);
align-self: center;
grid-column: 1;
cursor: pointer;
justify-self: flex-end;
transition: .4s;  opacity: .7;
@media(min-width: 768px) {

transform: translate(-128px, -70px);
}
 
  }
`
const Instagram = styled.img`
height: 25px;
width: 25px;
position: absolute;
 
align-self: center;
grid-column: 1;
cursor: pointer;
justify-self: flex-end;
transition: .4s;  opacity: .7;
@media(min-width: 768px) {

 &:active {
  opacity: 1;  box-shadow: 0px 0px 10px #fff,  0 0 50px #6b996b,
      0 0 100px #6b996b;
      border-radius: 10px; transform: scale(1.1);
 }
&:hover {
  opacity: 1;  box-shadow: 0px 0px 10px #fff,  0 0 50px #6b996b,
      0 0 100px #6b996b;
      border-radius: 10px; transform: scale(1.1);
}
}
`
const Wrap = styled.div`
  width: 95%;
  grid-row: 2;
  position: relative;

  color: white;

  .logo {
    position: relative;
    grid-column: 1;

    height: 50px;
  }
  .mainLink {
    width: 200px;
    position: relative;
    margin: 5px 0px;
    display: flex;
    color: white;
    z-index: 500;
    transition: 0.3s;
    &:hover {
      transform: translate(5px, 0);
    }
  }
  a {
    color: white;
    font-family: 'Comfortaa';
  }
  .linkage {
    grid-column: 1;
    list-style: none;
  }
`

const Line = styled.div`
 
  width: 100%;
  position: relative;
  z-index: 80000;
  opacity: 0.2;
  margin: 0 auto 20px;
  grid-column: 1/3;
  height: 2px;
  background-color: ${(props) => props.theme.second};
`
const Footer = () => (
  <Div>
    <Wrap>
      <ul className="linkage">
        <li>
          <Link href="/">
            <img
              height="50"
              className="logo"
              src="../static/img/lindseymiami.svg"
              alt="lindsey logo"
            />
          </Link>
        </li>
        <Line />
        <li className="mainLink">
          <Link href="https://lindseyliveslike.com">
            <a>Blog</a>
          </Link>
        </li>
        <li className="mainLink">
          <Link href="/ondemand">
            <a>On Demand Workouts</a>
          </Link>
        </li>
        <li className="mainLink">
          <Link href="/privacy">
            <a>Privacy Policy</a>
          </Link>
        </li>

        <li className="mainLink">
          <Link href="/terms">
            <a>Terms of Use</a>
          </Link>
        </li>
      </ul>
    </Wrap>{' '}
    <a className="insta" href="https://www.instagram.com/lindseyharrod/?hl=en">
    <Instagram src='../static/img/instagram.svg' /> </a>
    <div className="copy">
      <p>Copyright © Lindsey Harrod 2019-{new Date().getFullYear()}</p>
    </div>
  </Div>
)

export default Footer
