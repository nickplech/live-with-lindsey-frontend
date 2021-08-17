import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Form3 from './styles/Form3'
import gql from 'graphql-tag'
import Equipment from './Equipment'
import Error from './ErrorMessage'
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
transform: translateY(20px);
  .color {
    margin: 15px 0;
  }
  .dates {

    text-transform: uppercase;
    opacity: 0.5;
    &:focus {
      opacity: 1;
    }
    &:active {
      opacity: 1;
    }
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

function UpdateEquipment() {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    description: '',
    image: '',
  })
console.log(inputs.image)
  const { data, loading } = useQuery(EQUIPMENT_QUERY)
  const [createRequired, { called, error }] = useMutation(
    CREATE_EQUIPMENT_MUTATION,
    {
      variables: {
        ...inputs
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
          await clearForm()
        }}
      >
        <Error error={error} />
        {!error && !loading && called && (
          <Submitted>New Equipment Type Created SuccessFully!</Submitted>
        )}
        <fieldset disabled={loading} aria-busy={loading}>
          <>
            <Flex>
              <Types>Existing Equipment Selection:</Types>
            </Flex>
            <Flex style={{ padding: '0' }}>



            {data &&
              data.allRequireds.map((reason, i) => {
                return (

                    <Equipment next={i} key={reason.id} equipment={reason} />

                )
              })}


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
              type="file"
              id="file"
              required
              name="image"
              placeholder="Upload an image to represent this item in the app"
              onChange={handleChange}
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
              <SickButton  type="submit">
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


