import React, {useState} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Form3 from './styles/Form3'
import gql from 'graphql-tag'
import Equipment from './Equipment'
import Error from './ErrorMessage'
import {toast} from 'react-toastify'
import styled from 'styled-components'
import SickButton from './styles/SickButton'
import useForm from '../lib/useForm'
 
const EQUIPMENT_QUERY = gql`
  query EQUIPMENT_QUERY {
    allRequireds {
      id
      name
      quantity
      description
      image {
        publicUrlTransformed
      }
    }
  }
`
const CREATE_EQUIPMENT_MUTATION = gql`
  mutation CREATE_EQUIPMENT_MUTATION(
    $name: String!
    $description: String!
    $image: Upload!
  ) {
    createRequired(
      data: {
        name: $name
        description: $description
        image: $image
      }
    ) {
      id
      description
      name
      quantity
      image {
        publicUrlTransformed
      }
    }
  }
`
const Inner = styled.div`
  text-align: left;
  max-width: ${(props) => props.theme.innerWidth};
  margin: 0 auto;
  padding: 2rem 0;
  padding-top: 0;
  position: relative;
 
 
 
`
const Slider = styled.div`
display: flex;
flex-flow: row wrap;
margin: 0 auto;
width: 100%;
 .menu-item-wrapper {
    user-select: none;
  
    border-radius: 50%;
 
  
 
    align-items: center;
 
    margin: 20px auto ;
    
 
  }
`


const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const Types = styled.h2`
  display: inline-flex;
`


const Submitted = styled.p`
  color: green;
  background: white;
  padding: 15px 15px;
  border-left: 5px solid green;
`


const MenuItem = ({
  id,
  equipment,
  name,
  image,
 next
}) => {
 
 
  return (
    
      
       <div className="menu-item-wrapper">

<Equipment next={next} key={id} image={image} equipment={equipment} />
       </div>
   
  )
}
function UpdateEquipment() {
  const [newImage, setNewImage] = useState(false)
 
  const validImageTypes = 'image/gif, image/jpeg, image/jpg, image/png'

  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    description: '',
 
  })

  const handleImageChange = files => {
    setNewImage(false)
    const file = files ? files[0] : false;
    if (!file) return

    // Validate file type
    if (!file.type || validImageTypes.indexOf(file.type) === -1) {
      toast('Please provide a valid image type: GIF, JPG, or PNG.', {
        appearance: 'error',
        autoDismiss: true,
      })
      return null
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      toast('Maximum image size is 5MB.', {
        appearance: 'error',
        autoDismiss: true,
      })
      return null
    }

   if(loading) return <p>loading...</p>
   setNewImage(file)
  }
 
  const { data, loading } = useQuery(EQUIPMENT_QUERY)
  const [createRequired, { called, error }] = useMutation(
    CREATE_EQUIPMENT_MUTATION,
    {
      variables: {
        ...inputs, 
        image: newImage
      },
      refetchQueries: [
        {
          query: EQUIPMENT_QUERY,
        },
      ],
    },
  )
  return (
    <Inner>
      <Form3
        onSubmit={async (e) => {
          e.preventDefault()
          await createRequired()
            clearForm()
        }}
      >
    
        <fieldset disabled={loading} aria-busy={loading}>
              <Error error={error} />
        {!error && !loading && called && (
          <Submitted>New Equipment Type Created SuccessFully!</Submitted>
        )}
          <>
            <Flex>
              <Types>Existing Equipment Selection:</Types>
            </Flex>
            <Flex style={{ padding: '0' }}>

     
      
          <Slider>
            {data &&
              data.allRequireds.map((item, i) => {
            
              return (
             
                  <MenuItem
              key={item.id} 
                   index={i}
                    next={i}
                    name={item.name}
                    image={item.image.publicUrlTransformed}
                    id={item.id}
                    theIndex={i}
                    equipment={item}
                  />
               
              )
            })}
          </Slider>
 
 


            </Flex>
            <Types>Create New Equipment Types:</Types>
            <label htmlFor="name">
              Name of Equipment
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Name"
                autoComplete="off"
                value={inputs.name}
                onChange={handleChange}
              />
            </label>
            <label style={{marginTop: '25px'}} htmlFor="file">
            Upload an Image
    
                      <input
            disabled={loading}
            type="file"
            accept={validImageTypes}
            type="file"
            onChange={e => handleImageChange(e.target.files)}
            id="file"
            name="image"
            placeholder="Upload an image to represent this item in the app"
           
        
          />
          </label>
            <label htmlFor="description" style={{marginTop: '25px'}}>
              Equipment Description:
              <textarea
                resize="false"
                type="text"
                required
                id="description"
                name="description"
                value={inputs.description}
                onChange={handleChange}
              />
            </label>
            <div >
              <SickButton disabled={newImage === false} type="submit">
                Creat{loading ? 'ing' : 'e'} Equipment
              </SickButton>
            </div>
          </>
        </fieldset>
      </Form3>
    </Inner>
  );
}

export default UpdateEquipment;
export {EQUIPMENT_QUERY}


 
 