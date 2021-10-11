import React from 'react'
import { useMutation, useQuery } from '@apollo/client'

import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import Error from './ErrorMessage'
import styled from 'styled-components'
import SickButton from './styles/SickButton'
import Tag from './Tag'
import Form3 from './styles/Form3'

const CREATE_TAG_MUTATION = gql`
  mutation CREATE_TAG_MUTATION($name: String!) {
    createTag(data: { name: $name }) {
      id
      name
    }
  }
`
const ALL_TAGS_QUERY = gql`
  query ALL_TAGS_QUERY {
    allTags(orderBy: "name") {
      id
      name
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
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    opacity: 0.5;
    &:focus {
      opacity: 1;
    }
    &:active {
      opacity: 1;
    }
  }
  .content {
    padding-top: 50px;
    overflow-y: hidden;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    width: 98%;
  }
`
const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 30px;
`
const Types = styled.h2`
  display: inline-flex;
  margin-bottom: 0;
`


const Submitted = styled.p`
  color: green;
  background: white;
  padding: 15px 15px;
  border-left: 5px solid green;
`

function UpdateTagSettings() {

  const { inputs, handleChange, clearForm } = useForm()
  const { data, loading } = useQuery(ALL_TAGS_QUERY)

  const [createTag, { error, called }] = useMutation(CREATE_TAG_MUTATION, {
    variables: {
      name:inputs.name && inputs.name.toLowerCase()
    },
    refetchQueries: [
      {
        query: ALL_TAGS_QUERY,
      },
    ],
  })

  return (
    <Inner>
      <Form3
        onSubmit={async (e) => {
          e.preventDefault()
          await createTag()
          await clearForm()
        }}
      >
        <Error error={error} />
        {!error && !loading && called && (
          <Submitted>New Tag Created SuccessFully!</Submitted>
        )}
        <fieldset disabled={loading} aria-busy={loading}>
          <>
            <Flex>
              <Types> Searchable Tags</Types>

            </Flex>
            <Flex style={{ padding: '0' }}>
              {loading ? (
                <p>...loading</p>
              ) : (
                data.allTags.map((tag) => {
                  return <Tag key={tag.id} tag={tag} />
                })
              )}
            </Flex>

              <label htmlFor="name">
                Tag Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  required={true}
                  placeholder="Name"
                  autoComplete="off"
                  value={inputs.name}
                  onChange={handleChange}
                />
              </label>

              <div style={{ marginTop: '40px' }}>
                <SickButton disable={loading} type="submit">
                  Create Tag
                </SickButton>{' '}

              </div>

          </>
        </fieldset>
      </Form3>
    </Inner>
  )
}

export default UpdateTagSettings
export { CREATE_TAG_MUTATION, ALL_TAGS_QUERY }
