import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`
const Form3 = styled.form`

  background: white;

  padding: 20px;
  margin: 20px 0;
  margin-top: 0px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  position: relative;
  h2 {
    font-family: 'Bison';

    color: ${(props) => props.theme.second};
    letter-spacing: 3px;
  }
  label {
    display: block;
    line-height: 26px;
    font-family: 'Comfortaa';
    font-size: 1.7rem;
    text-transform: uppercase;
    color: ${(props) => props.theme.fourth};
  }
  input,
  select {
    width: 100%;
    padding-left: 1rem;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    font-size: 1.5rem;
    margin-bottom: 30px;
    background: transparent;
    font-family: 'Comfortaa';
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    /* margin-top: 0.8rem; */

    &:focus {
      outline: 0;
      border-bottom: 2px solid #f8b0b0;
    }
  }

  textarea {
    resize: none;
    min-height: 100px;
    margin-top: 10px;
    font-family: 'Comfortaa';
    font-size: 20px;
    border: 2px solid rgba(0, 0, 0, 0, 0.2);
    width: 100%;
    padding-left: 1rem;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    font-size: 1.5rem;
    margin-bottom: 20px;
    background: transparent;
    border-radius: 5px;
    &:focus {
      outline: 0;
      border: 2px solid #f8b0b0;
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    margin-top: 1rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      margin-bottom: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
         ${(props) => props.theme.second} 0%,
        ${(props) => props.theme.primary} 50%,
         ${(props) => props.theme.second} 100%
      )
 }}
`

Form3.displayName = 'Form3'

export default Form3
