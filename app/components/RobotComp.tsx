"use client";

import React from "react";
import { motion } from "framer-motion";

const RobotComp = ({ size }: any) => {
  return (
    <div
      style={{ fontSize: size }}
      className={`inset-0 flex items-center justify-center bg-opacity-80`}
    >
      <motion.span
        animate={{
          y: [0, -10, 0], // Floating animation
          rotate: [0, 3, -3, 0], // Soft tilting
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        🤖
      </motion.span>
    </div>
  );
};

export default RobotComp;
