import React from "react";
import { testimonials } from '../lib/testimonials'
import { motion } from "framer-motion";
import move from "lodash-move";
import styled from 'styled-components'
const Wrapper = styled(motion.div)`
position: relative;
display: flex;
align-items: center;
justify-content: center;
transform: perspective(1000px)
    rotateX(4deg)
    rotateY(-16deg)
    rotateZ(4deg);
 
border-radius: .5em;
`
const Card = styled(motion.div)`
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  font-Size: 18px;
  letter-spacing: 2px;
  line-height: 20px;
  width: 90%;
  background: ${props => props.theme.second};
 background-image: linear-gradient(145deg,  #f8b0b0 ,#ffd7d4 );
  height: 200px;
 flex-flow: column;   overflow: hidden;
  color: rgba(245,245,245,1);
  padding: 15px;

  transform-origin: top center;
  list-style: none;
    box-shadow: 0 4px 21px   rgba(0,0,0,.1), 24px 16px 64px 0 rgba(0, 0, 0, 0.08);
`
 
const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.04;

export default function NewReviews(){
  const [cards, setCards] = React.useState(testimonials);
  const moveToEnd = from => {
    setCards(move(cards, from, cards.length - 1));
  };

  return (
    <Wrapper  >
      <ul style={cardWrapStyle}>
        {cards.map((card, index) => {
          const canDrag = index === 0;

          return (
            <Card
              key={card.color}
              style={{
              
                
                cursor: canDrag ? "grab" : "auto"
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                translateX: 1 - index * SCALE_FACTOR,
                zIndex: cards.length - index
              }}
              drag={canDrag ? "y" : false}
              dragConstraints={{
                top: 0,
                bottom: 0
              }}
              onDragEnd={() => moveToEnd(index)}
            >{card.paraphrase} <p> &mdash; {card.name}      </p>  <div
            style={{
              color: 'white',
              transform: 'translateY(30%)',
              left: '20px',
              overflow: "hidden",
              lineHeight: '330px',
              fontSize: '280px',
              position: 'absolute',
              zIndex: 100000,
              opacity: '.2', 
             
            }}
          >
            &#10077;
          </div></Card>
          );
        })}
      </ul>
    </Wrapper>
  );
};
 
const cardWrapStyle = {
  position: "relative",
  width: "90%",
  height: "250px",
};

 