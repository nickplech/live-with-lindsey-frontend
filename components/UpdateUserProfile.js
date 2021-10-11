import React, {useState} from 'react'
import { useMutation } from '@apollo/client'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import styled, {keyframes} from 'styled-components'
import { toast } from 'react-toastify'
import SickButton from './styles/SickButton'
import debounce from 'lodash.debounce'

 
import formatPhoneNumber from '../lib/formatPhone'
import { useUser, CURRENT_USER_QUERY } from './User'

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $businessName: String
    $cellPhone: String
    $email: String
    $receiveSms: Boolean
  ) {
    updateUser(
      id: $id
      data: {
        businessName: $businessName
        cellPhone: $cellPhone
        email: $email
      
      }
    ) {
      id
      businessName
      cellPhone
      email
      
    }
  }
`

const UPDATE_USER_TEXTING_MUTATION = gql`
  mutation UPDATE_USER_TEXTING_MUTATION(
    $id: ID!
    $receiveSms: Boolean
  ) {
    updateUser(
      id: $id
      data: {
        receiveSms: $receiveSms
      }
    ) {
      id
      receiveSms
    }
  }
`
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


const Grid = styled.section`
 box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.1),
    0 6px 10px 5px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  background: white;
  width: 100%;
   position: relative;
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-flow: column;
  margin-top: 0px;
  font-size: 1.6rem;
  line-height: 1.5;
 border: none;
   h2 {
    font-family: 'Bison';
 
    color: ${(props) => props.theme.second};
    letter-spacing: 3px;
  }
`
const Form = styled.form`
 width: 100%;
   position: relative;
display: grid;
grid-template-rows: 1fr ;
grid-template-columns: 1fr 1fr;
height: 100%;

.back {
  grid-column: 1/3; 
 
 
 
  width: 100%;
  border: 2px solid ${props => props.theme.primary};
}
.left {
   grid-column: 1; 
 grid-row: 1;
   position: relative;
  margin: 0 auto;
  width: 100%;
  background: rgba(240,240,240,.7);
  padding: 20px;
 
  padding-right: 50px;
  @media(max-width: 768px) {
  grid-column: 1/3;
  padding-bottom: 0;
}
}
.right {
   grid-column: 2;
 grid-row: 1;
   position: relative;
   margin: 0 auto;
  width: 100%;  background: rgba(240,240,240,.7);  padding: 20px;

@media(max-width: 768px) {
  grid-column: 1/3;
  grid-row: 2;
  padding-top: 0;
  padding-bottom: 100px;
}
}


  label {
 
    line-height: 26px;
    letter-spacing: 2px;
    font-size: 1.7rem;
    text-transform: uppercase;
    color: ${(props) => props.theme.fourth};
  }
  input,
  select {
    width: 100%;
    
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    font-size: 1.5rem;
    margin-bottom: 30px;
    background: white;
    font-family: 'Comfortaa';
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
 
    transition: 1s;
    &:focus {
      outline: 0;
      border-bottom: 2px solid #f8b0b0;
    }
  }
  input[type='checkbox'] {
    height:15px;
    width:15px;
    transform: translate(1px, 1px);
    margin-bottom: 0;
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
    margin-left: 20px;
    font-size: 2rem;
 justify-self: center;
 margin: 0 auto;
    padding: 0.5rem 1.2rem;
    margin-top: 1rem;
  }
 
`



const SubscriptionSettings = styled.div`
grid-row: 3;
grid-column: 1/3;
position: relative;
 
display: flex;
flex-flow: column ;
 
  margin: 20px 0;
  margin-top: 0px;
  font-size: 2rem;



  button {
    display: flex;
    justify-self: flex-start;
  }
  a {
    font-size: 21px;
    letter-spacing: 2px;

  
  }
  p {
    line-height: 26px;
    letter-spacing: 2px;
    font-size: 1.7rem;
    text-transform: uppercase;
    color: ${(props) => props.theme.fourth};
  }
  .subscription-buttons {
    background: #f8b0b0;
    color: white;
    border: 3px solid ${(props) => props.theme.second};
    border-radius: 5px;
    padding: 4px 6px;
    outline: none;
    cursor: pointer;
    transition: .3s;
    font-family: 'Bison';
    margin-bottom: 20px;
    &:hover {
      background: #f8b0b0;
      color: white;
    }
  }
  em {
    color: black;
  }
`

function UpdateUserInfo(props) {
  const me = useUser()
 
  const { inputs, handleChange } = useForm({
    cellPhone: formatPhoneNumber(me && me.cellPhone),
    businessName: me && me.businessName,
    email: me && me.email,
    
  })


  const [updateUserSms, {smsError, smsLoading}] = useMutation(UPDATE_USER_TEXTING_MUTATION)
  const [updateUser, { error, loading, called }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      variables: {
        cellPhone: inputs.cellPhone ? inputs.cellPhone : me.cellPhone,
        businessName: inputs.businessName ? inputs.businessName : me.businessName,
        email: inputs.email ? inputs.email : me.email,
        id: me && me.id,
        
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  )
  const clickSms = debounce(handleSetIsChecked, 500)
  async function handleSetIsChecked() {
  const smsStatus = !me.receiveSms
   toast(`You will ${smsStatus === true ? 'now' : 'no longer'} receive SMS workout reminders!`)
    await updateUserSms({variables: {id: me.id, receiveSms: !me.receiveSms}})
   
    
  }
  const tooShort = !inputs.cellPhone.replace(/[\D]/g, '').match(/^\d{10}$/)

const nameLong = inputs.businessName.length > 14

  return (
    <Grid>  
      <h2>Update Account Information</h2>
          {error && <Error error={error} />}
      <Form
   
        onSubmit={async (e) => {
          e.preventDefault()
          await updateUser()
    toast(`Your Profile Was Updated Successfully!`)

        }}
      >
        
        
          <div className="left">
            
          <label htmlFor="cellPhone">
            Cell Phone Number
            <input
              type="tel"
              id="cellPhone"
              name="cellPhone"
              className="short"
              placeholder="Phone Number"
              required
              defaultValue={me && me.cellPhone}
              onChange={handleChange}
            />
          </label>
          <p style={{letterSpacing: '1px', padding: 0, margin: 0, transform: 'translateY(-20px)'}}>Used to authorize that it is actually you using your account; also used to send Live Workout SMS reminders</p>

          <label htmlFor="businessName">
             Display Name
            <input
              type="text"
              id="businessName"
              name="businessName"
              placeholder="Display Name"
              required
              defaultValue={me && me.businessName}
              onChange={handleChange}
            />
            {nameLong ? <p style={{color: 'red', margin: 0, transform: 'translateY(-20px)', fontSize: '14px'}}>Please Shorten Your Display Name</p> : null}
          </label>
          <p style={{letterSpacing: '1px', padding: 0, margin: 0, transform: 'translateY(-20px)'}}>Your public display name used in features of the Live with Lindsey Fitness Community such as Live Chat</p>
          <label htmlFor="email">
            Login/Contact Email Address
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email Address"
              required
              defaultValue={me && me.email}
              onChange={handleChange}
            />
          </label>
          </div>
          <div className="right">
          <label htmlFor="receiveSms">
            Text Message Alerts
            
          </label><input
        
              type="checkbox"
              id="receiveSms"
              name="receiveSms" 
              
             
              checked={me && !!me.receiveSms}
              value={me && me.receiveSms}
              onChange={() => clickSms()}
            />
          <p style={{letterSpacing: '1px', padding: 0, margin: 0}}>By Leaving this Option Selected, You are Stating that You Would Like to Receive SMS&mdash;Text Message&mdash;Reminders Approximately 30 minutes Before Each Live Workout of Which You are Subscribed</p><p style={{letterSpacing: '1px'}}>Deselect the Checkbox to Elect NOT TO RECEIVE SMS MESSAGES</p>
            <SickButton disabled={tooShort || nameLong} style={{justifySelf: 'flexEnd', bottom: '40px', right: '40px', position: 'absolute'}}
            type="submit">
            Sav{loading ? 'ing' : 'e'} Changes
          </SickButton>
          </div>

        
    

      </Form>       <h2>Subscription Settings</h2>
      <SubscriptionSettings>
 
        <div
          style={{
            background: 'rgba(240,240,240,.8)',
            padding: '20px',
            borderRadius: '5px',
            marginBottom: '45px',
          }}
        >
          <label htmlFor="accountType">
          
            <p style={{ marginTop: '10px' }}> Current Subscription: <em >{me && me.subscription}</em></p>
          </label>
          {me && me.subscription === 'ALLACCESS' ? (
            <a
              href="https://buy.stripe.com/test_4gweXM0Pt2IM0qkfYY"
              className="subscription-buttons"
            >
              Manage  Subscription
            </a>
          ) : (
            <a
              href="https://buy.stripe.com/test_4gweXM0Pt2IM0qkfYY"
              className="subscription-buttons"
            >
              Upgrade to Full Access Pass
            </a>
          )}
        </div>
        </SubscriptionSettings>
    </Grid>
  )
}

export default UpdateUserInfo
export { UPDATE_USER_MUTATION }
