import * as React from "react";
import { useState } from "react";
import styled from 'styled-components'
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function CheckToAgree(props) {
  const [isChecked, setIsChecked] = useState(true)
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])

  return (
      <div>
          <motion.div
              style={{
                  width: 150,
                  height: 150,
border: '2px solid black',
                  borderRadius: 30,
                  backgroundColor: "#fff",
                  cursor: "pointer",
              }}
              animate={{
                  scale: isChecked ? .15 : 0.12,
                  backgroundColor: isChecked
                      ? "#f8b0b0"
                      : "#ffd7d4",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onTap={() => setIsChecked(!isChecked)}
          >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="150"
                  height="150"
              >
                  <motion.path
                      d="M38 74.707l24.647 24.646L116.5 45.5"
                      fill="transparent"
                      strokeWidth="20"
                      stroke="#fff"
                      strokeLinecap="round"
                      initial={{ pathLength: 0.9, opacity: 1 }}
                      animate={{ pathLength: isChecked ? 0.9 : 0 }}
                      style={{ pathLength: pathLength, opacity: opacity }}
                  />
              </svg>
          </motion.div>
      </div>
  )
}