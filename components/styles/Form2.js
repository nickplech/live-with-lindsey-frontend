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

const Form2 = styled.form`
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.1),
    0 6px 10px 5px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  background: white;

  padding: 20px;
  margin: 20px 0;
  margin-top: 0px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  position: relative;
  h2 {
    font-family: 'Felix';
    color: ${(props) => props.theme.second};
  }
  label {
    display: block;
    line-height: 26px;
    font-family: 'Bison';

    letter-spacing: 3px;
    font-size: 2rem;
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
    font-family: 'Comfortaa';
    background: transparent;
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
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`

Form2.displayName = 'Form2'

export default Form2
