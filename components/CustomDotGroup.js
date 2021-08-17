
import { DotGroup } from "pure-react-carousel";
import React from "react";
import styled from 'styled-components'

const Wrap = styled.div`
position: relative;

`

const CustomDotGroup = ( ) => (
  <Wrap>
  <DotGroup style={{textAlign: "center"}}>
  </DotGroup></Wrap>
);




export default CustomDotGroup;
