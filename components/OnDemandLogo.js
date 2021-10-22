import React from 'react'
import styled from 'styled-components'

import { motion, useMotionValue, useTransform } from "framer-motion";

export function Example() {
    const x = useMotionValue(200);
    const y = useMotionValue(200);

    const rotateX = useTransform(y, [0, 400], [5, -5]);
    const rotateY = useTransform(x, [0, 400], [-5, 5]);

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();

        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }

    return (
        <motion.div
            style={{
                width: '100vw',
                height: '100vh',
                display: "flex",
                placeItems: "center",
                placeContent: "center",
                borderRadius: 10,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                perspective: 400
            }}
            onMouseMove={handleMouse}
        >
            <motion.div
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 30,
                    backgroundColor: "#fff",
                    rotateX: rotateX,
                    rotateY: rotateY
                }}
            />
        </motion.div>
    );
}
