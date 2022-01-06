// import { Parallax } from 'react-scroll-parallax'
// import styled from 'styled-components'

// const Wrap = styled.div`


//     display: flex;
//     flex-flow: column wrap;
//     align-items: space-around;
//     justify-content: center;
//     align-items: center;
//     height: 50vh;

// .copy {
//     margin: 0.2em 0;
//     text-align: center;
// }

// .barTop {
//     margin-left: 0.8em;
//     width: 20em;
//     height: 1.5em;
//     border-top: 0.45em solid #f8b0b0;
//     border-bottom: 0.45em solid #f8b0b0;
//     transform: skew(-10deg);
// }

// .barBottom {

//     margin-left: 0;
//     margin-right: 0.8em;
// }

// .letter {    
//     display: inline-block;
// }
// `
// export default function ParallaxSample() {
 
//     const copy = 'Parallax'.split('')
//   return (
//       <Wrap>
//           <div className="barTop"/>
//     <span className="copy">{copy.map((letter, i) => (
//         <Parallax
//             key={`copy-${i}`}
//             offsetXMax={100 * (i - 3)}
//              classNam="letter"
//         >
//             {letter}
//         </Parallax>
//     ))  
//      }
//      </span>   <div className="barBottom" /> </Wrap>
//   )
// }