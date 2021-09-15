import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { motion, useViewportScroll, useTransform } from "framer-motion";

import styled from 'styled-components'

const Wrap = styled.div`
  background: ${(props) => props.theme.primary};
  background-repeat: no-repeat;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SickestButton = styled.button`
  background: ${(props) => props.theme.second};
  color: white;

  border: 0;
  margin: 0 auto;
  border-radius: 5px;
  font-family: 'Bison';
transform: translate(0, 3px);
  font-size: 2rem;
  padding: 0.5rem 1.2rem;
  font-size: 1.8rem;

  letter-spacing: 3px;
  transition: all 0.5s;
  outline: none;
  cursor: pointer;
  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.2);
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    background: ${(props) => props.theme.primary};
  }
  &:active {
    box-shadow: none;
  }
`

const TextBody = styled.div`
  max-width:350px;
    height: 400px;
  overflow: scroll;
  border-radius: 5px;
  font-family: 'comfortaa';

  padding: 20px;
  h1 {
    color: ${(props) => props.theme.third};
    font-size: 14px;
  }
`
export default function ScrollToAgree({ hasAgreedToWaiver, setHasAgreedToWaiver }) {
  const buttonRef = useRef()
  const terms = useRef()
  console.log(terms)
  const [isComplete, setIsComplete] = useState(false)
  const [beenClicked, setBeenClicked] = useState(false)

  const ob = new IntersectionObserver(
    function ([entry], observer) {
      if (entry.intersectionRatio === 1) {
        buttonRef.current.disabled = false
        observer.unobserve(entry.target)
      }
    },
    { root: terms.current, threshold: 1 },
  )

  useEffect(() => {
    ob.observe(terms.current.lastElementChild)
  }, [terms, ob])

  function handleClick() {
    if (isComplete) {
      setBeenClicked(true)
    }
   
    console.log(isComplete)
    return
  }
  useEffect(() => {
    if (isComplete && beenClicked) {
      setHasAgreedToWaiver('AGREED')
    }
  }, [isComplete, beenClicked])
  return (
    <>
      <Wrap>
        <TextBody>
          <div ref={terms}>
            <h1>
              LIABILITY WAIVER, AGREEMENT TO PARTICIPATE and ASSUMPTION OF RISK
            </h1>
            <p>
              By attending a training session, such as a class, event, activity,
              or other program (the “Session”) virtually, and by accessing and
              using the facilities (the “Studio”) owned and operated by Lindsey
              Harrod (“Lindsey Harrod”), you acknowledge on behalf of yourself,
              your heirs, representatives, and/or assigns, that there are
              certain inherent risks associated with the Sessions and Studio.
            </p>
            <p>
              You understand and are aware that strength, flexibility and
              aerobic exercise, including the use of equipment, are potentially
              hazardous activities, more so in a virtual training
              environment. You also understand that fitness activities involve
              the risk of injury and that you are voluntarily participating in
              these activities and using equipment knowing the dangers involved.
              You acknowledge that in a virtual training environment an
              instructor may or may not be present and supervising, depending if
              the Session is live or pre-recorded. Knowing this, you agree to
              assume full responsibility for all injuries which are sustained or
              aggravated by you in relation to the Sessions.
            </p>
            <p>
              At all times, you shall comply with all stated safety terms,
              rules, and verbal instructions given to you by the instructor,
              regardless if the instructor is present live, or if you are
              receiving instruction via a pre-recording. You will use all
              reasonable efforts to ensure your physical safety. You understand
              that equipment used while exercising can be dangerous if used
              improperly. You also understand and agree that Lindsey Harrod is
              not responsible for any injury sustained due to a defect, damage,
              or lack of maintenance, in your individually owned equipment, or
              equipment used not while under in-person direction from Lindsey
              Harrod.
            </p>
            <p>
              You declare yourself to be physically sound enough to participate
              in a Session as instructed by, and with the direction of, a
              Lindsey Harrod instructor. You do not suffer from a condition,
              impairment, disease, infirmity or other illness that would prevent
              your participation, or use of equipment, except as noted by a
              Lindsey Harrod instructor, and modified accordingly, if
              practicable. In the instance that you cannot notify a Lindsey
              Harrod instructor of your physical condition and injury, you must
              take all reasonable precautions and make all necessary
              modifications. If you do not know how to do an exercise safely and
              pain-free, you agree to not undertake the exercise.
            </p>
            <p>
              You acknowledge and understand that if you are pre/post-natal, you
              increase the risk to yourself and, if applicable, your unborn
              child. In participating in a Session, you assume all associated
              risks to yourself, and if applicable, your unborn child. If you
              are pre/post-natal you have permission from your physician to
              participate in a pre/post-natal exercise program.
            </p>
            <p>
              You agree that if you experience any symptoms such as shortness of
              breath, chest pain, unusual fatigue, dizziness or fainting, or
              extreme pain, whether or not you are under direct supervision
              and/or instruction, you will immediately cease exercising and, if
              possible, inform a representative of Lindsey Harrod of your
              symptoms.
            </p>
            <p>
              You understand that you are the intended recipient of a Session
              from Lindsey Harrod and that any material, video or otherwise, you
              receive or have access to is for your use only. You will not
              upload any videos or materials provided by Lindsey Harrod to any
              online forum such as a personal website, YouTube, or social media.
              You also agree to not video any part of Lindsey Harrod’s material
              without express written consent and to not share, copy, video,
              summarize, share or reproduce in any way the materials received as
              they are protected under the United States Copyright Laws,
              including the Copyright Act of 1976. You grant Lindsey Harrod, its
              representatives, employees and agents the right to take
              photographs and video footage of me with or without my name for
              any lawful purpose.
            </p>
            <p>
              In consideration of being allowed to participate in and access the
              Sessions and Studio, you hereby release, indemnify, and hold
              harmless Lindsey Harrod, its direct and indirect parent,
              subsidiary, affiliates and entities, and each of their respective
              officers, directors, members, employees, representatives and
              agents, and each of their respective successors and assigns and
              all others, from all responsibility, claims, actions, suits,
              procedures, costs, expenses, damages, and liabilities to the
              fullest extent allowed by law arising out of or in any way related
              to participation in the Sessions or use of the Studio, or training
              with Lindsey Harrod in any way.
            </p>
          </div>
        </TextBody>
      </Wrap>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <SickestButton
          ref={buttonRef}
          onClick={handleClick}
          // disabled={isComplete === false}
          type="submit"
        >
          Agree &amp; Sign Up
        </SickestButton>
      </div>
    </>
  )
}
