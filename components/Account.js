import React, {useState} from 'react'
import gql from 'graphql-tag'
 
import { useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import { useUser } from './User'
import { toast } from 'react-toastify'
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
  input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 3px solid #f8b0b0;
    display: inline-block;
    padding: 0px;
    font-size: 22px;
    line-height: 28px;
    cursor: ${props => props.loading ? 'not-allowed' : 'pointer'};
   
    height: 36px;
    border-radius: 5px;
    background-color: #f8b0b0;
    opacity: ${props => props.loading ? .5 : 1};
    
    cursor: pointer;
    color: white;
    transition: .3s;
&:hover {
  transform: scale(1.06);
  box-shadow: 0 8px 7px -3px rgba(0,0,0,.2);
}
}
.button-disable {

&[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  const [newImage, setNewImage] = useState(false)
  if (!me) return null
  const validImageTypes = 'image/gif, image/jpeg, image/jpg, image/png'

  
  const handleImageChange = files => {
    setNewImage(false)
    const file = files ? files[0] : false;
    if (!file) return;

    // Validate file type
    if (!file.type || validImageTypes.indexOf(file.type) === -1) {
      toast('Please provide a valid image type: GIF, JPG, or PNG.', {
        appearance: 'error',
        autoDismiss: true,
      });
      return null;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      toast('Maximum image size is 5MB.', {
        appearance: 'error',
        autoDismiss: true,
      });
      return null;
    }

   if(loading) return <p>loading...</p>
   setNewImage(true)
    updateUser({
      variables: {
        id: me.id,
        image: file,
      },
    })
      .then(() => {
        if(loading) return <p>loading...</p>
       toast('New avatar image saved successfully.', {
          appearance: 'success',
          autoDismiss: true,
        })
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const [updateUser, { error, loading, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      // variables: { ...inputs, id: me.id },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  )
  const theData = data && data.updateUser.image.publicUrlTransformed
  const straightData = me.image && me.image.publicUrlTransformed
  const defaultPic = '../static/img/profpic.svg'
 
  return (
    <Width loading={loading}>
      <form
 
      >
        {straightData ? (
          <Img pic={straightData} />
        ) : theData ? (
          <Img pic={theData} />
        ) : (
          <Img pic={defaultPic} />
        )}

        <label className="custom-file-upload" style={{ margin: '15px auto' }} htmlFor="file">
 
          Upload{loading ? 'ing' : null} Profile Pic
          <input
            disabled={loading}
            type="file"
            accept={validImageTypes}
            type="file"
            onChange={e => handleImageChange(e.target.files)}
            id="file"
            name="image"
            placeholder="Upload an image"
            required
        className="button-disable"
          />
        </label>
      
      </form>
    </Width>
  )
}

export default Account
