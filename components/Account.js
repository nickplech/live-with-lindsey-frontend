import React from 'react'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import { useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import { useUser } from './User'
import SickButton from './styles/SickButton'
import Form from './styles/Form'

import styled from 'styled-components'
const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($image: Upload, $id: ID!) {
    updateUser(id: $id, data: { image: $image }) {
      id
      image {
        publicUrlTransformed
      }
    }
  }
`
const Width = styled.div`
  text-align: center;
  width: 400px;
  max-width: 90%;
  margin: 10px auto;
  padding: 0rem 0;
  padding-top: 0;
  border: none;
  position: relative;
  z-index: 100;
  .dates {
    font-family: montserrat, sans-serif;
    text-transform: uppercase;
    opacity: 0.5;
    &:focus {
      opacity: 1;
    }
    &:active {
      opacity: 1;
    }
  }
  form {
  }
  button {
    display: flex;
    justify-self: flex-end;
  }
`
const Img = styled.div`
  background: url(${(props) => props.pic}) center center;
  border-radius: 50%;
  background-position: center center;
  background-size: cover;
  height: 110px;
  transition: 300ms;
  z-index: 1000;
  position: relative;
  background-color: white;
  width: 220px;
  height: 220px;
  margin: 20px auto;
  justify-self: center;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
    0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.1),
    0 32px 16px rgba(0, 0, 0, 0.09);
`

function Account() {
  const me = useUser()
  if (!me) return null
  const validImageTypes = 'image/gif, image/jpeg, image/jpg, image/png'

  const { inputs, handleChange, resetForm } = useForm({
    image: '',
  })
  const [updateUser, { error, loading, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      variables: { ...inputs, id: me.id },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  )
  const theData = data && data.updateUser.image.publicUrlTransformed
  const straightData = me.image && me.image.publicUrlTransformed
  const defaultPic = '../static/img/profpic.svg'
  console.log(inputs)
  return (
    <Width>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          console.log(inputs)
          const res = await updateUser(
            { variables: { ...inputs, id: me.id } },
            { refetchQueries: { query: CURRENT_USER_QUERY } },
          )
          console.log(res)
          await resetForm()
        }}
      >
        {straightData ? (
          <Img pic={straightData} />
        ) : theData ? (
          <Img pic={theData} />
        ) : (
          <Img pic={defaultPic} />
        )}

        <label style={{ margin: '15px auto' }} htmlFor="file">
          {inputs.image && 'Click Update to Display New Image'}
          <input
            type="file"
            id="file"
            name="image"
            placeholder="Upload an image"
            required
            onChange={handleChange}
          />
        </label>
        <SickButton
          style={{ marginTop: '50px' }}
          disabled={inputs.image.length === 0 || loading}
          type="submit"
        >
          Updat{loading ? 'ing' : 'e'}
        </SickButton>
      </form>
    </Width>
  )
}

export default Account
