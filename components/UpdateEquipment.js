import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Form3 from './styles/Form3'
import gql from 'graphql-tag'
import Equipment from './Equipment'
import Error from './ErrorMessage'
import styled from 'styled-components'
import SickButton from './styles/SickButton'
import useForm from '../lib/useForm'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
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
  user-select: none;
  outline: none;
  width: 100%;

  margin-top: 0px;
  .buttonBack___1mlaL,
  .buttonNext___2mOCa,
  .buttonNext___3Lm3s {
    cursor: pointer;
    border: none;
    outline: none;
    background: rgba(20, 20, 20, 0.3);
    background: ${(props) => props.theme.second};
    font-size: 32px;
    z-index: 9999;
    cursor: pointer;
    transition: 0.2s;
    position: absolute;
    z-index: 9000;
    &:hover {
      opacity: 0.8;
      /* transform: scale(1.04); */
    }
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
  .buttonBack___1mlaL {
    display: flex;
    transform: translate(0, 180px);
    /* height: 110px; */
    color: white;
    left: 0;
    line-height: 20px;
    height: 120px;

    align-items: center;
  }
  .buttonNext___2mOCa,
  .buttonNext___3Lm3s {
    display: flex;
    align-items: center;
    right: 0;
    transform: translate(0, 180px);
    /* height: 110px; */
    color: white;
    line-height: 20px;
    height: 120px;
  }
  .image___xtQGH {
    display: block;
    width: 100%;
    height: 100%;
  }
  .spinner___27VUp {
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    width: 30px;
    height: 30px;
    animation-name: spin___S3UuE;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    border: 4px solid #a9a9a9;
    border-top-color: #000;
    border-radius: 30px;
  }
  @keyframes spin___S3UuE {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
  }
  .container___2O72F {
    position: relative;
    overflow: hidden;
    height: 100%;
    outline: none;
    width: 100%;
  }
  .overlay___IV4qY {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    cursor: zoom-in;
    transition: opacity 0.3s, transform 0.3s;
  }
  .hover___MYy31,
  .loading___1pvNI,
  .zoom___3kqYk {
    opacity: 1;
  }
  .imageLoadingSpinnerContainer___3UIPD {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f4f4f4;
  }
  .slide___3-Nqo {
    position: relative;
    display: block;
    box-sizing: border-box;
    height: 0;
    margin: 0;
    list-style-type: none;
  }
  .slide___3-Nqo:focus {
    outline: none !important;
  }
  .slideHorizontal___1NzNV {
    float: left;
  }
  [dir='rtl'] .slideHorizontal___1NzNV {
    direction: rtl;
    transform: scaleX(-1);
  }
  .slideInner___2mfX9 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    height: 100%;
  }
  .focusRing___1airF {
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 5px;
    pointer-events: none;
    outline-width: 5px;
    outline-style: solid;
    outline-color: Highlight;
  }
  @media (-webkit-min-device-pixel-ratio: 0) {
    .focusRing___1airF {
      outline: none;
    }
  }
  .horizontalSlider___281Ls {
    position: relative;
    overflow: hidden;
    outline: none;
  }
  [dir='rtl'] .horizontalSlider___281Ls {
    direction: ltr;
    transform: scaleX(-1);
  }
  .horizontalSliderTray___1L-0W {
    overflow: hidden;
    width: 100%;
    outline: none;
  }
  .verticalSlider___34ZFD {
    position: relative;
    overflow: hidden;
    outline: none;
  }
  .verticalSliderTray___267D8 {
    overflow: hidden;
  }
  .verticalTray___12Key {
    float: left;
  }
  .verticalSlideTrayWrap___2nO7o {
    overflow: hidden;
    outline: none;
  }
  .sliderTray___-vHFQ {
    display: block;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .sliderAnimation___300FY {
    transition: transform 0.56s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    will-change: transform;
  }
  .masterSpinnerContainer___1Z6hB {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f4f4f4;
  }
  .menu-item-wrapper {
    user-select: none;
    cursor: grab;
    border-radius: 10px;
    /* background: rgba(245, 245, 245, 0.8); */
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.09);
    display: flex;
    align-items: center;
    width: 80%;
    margin: 50px auto 50px;
    
    /* margin-bottom: 70px; */
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

            <CarouselProvider
          naturalSlideWidth={150}
          naturalSlideHeight={150}
          orientation="horizontal"
          isIntrinsicHeight="yes"
          infinite="yes"
          visibleSlides={4}
          totalSlides={data &&
              data.allRequireds}
        >
          <ButtonBack>&lsaquo;</ButtonBack>{' '}
          <ButtonNext >&rsaquo;</ButtonNext>
          <Slider>
            {data &&
              data.allRequireds.map((item, i) => {
            
              return (
                <Slide key={item.id + 'desktop'} index={i}>
                  <MenuItem
                   
                    next={i}
                    name={item.name}
                    image={item.image.publicUrlTransformed}
                    id={item.id}
                    theIndex={i}
                    equipment={item}
                  />
                </Slide>
              )
            })}
          </Slider>
        </CarouselProvider>
 


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


