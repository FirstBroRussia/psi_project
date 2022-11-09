import React from "react";

import styles from "./Sandwich.module.scss";

export default function Sandwich({ size, type }) {
  if (type === "open") {
    return (
      <svg
        className={styles.sandwich}
        width="32"
        height="32"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M33.8198 2.1802L2 34"
          stroke="#333399"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33.8198 33.8198L2 2"
          stroke="#333399"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } else if (type === "default") {
    return (
      <svg
        className={styles.sandwich}
        width="40"
        height="34"
        viewBox="0 0 40 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M37.5 2H2.5"
          stroke="#333399"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M37.5 12H2.5"
          stroke="#333399"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M37.5 22H2.5"
          stroke="#333399"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M37.5 32H2.5"
          stroke="#333399"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}
