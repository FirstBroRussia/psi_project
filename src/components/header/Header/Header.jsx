import React from "react";
import Logo from "../Logo";
import Navbar from "../Navbar/Navbar";
import Sandwich from "../Sandwich/Sandwich";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container_wrapper">
        <div className={styles.wrapper}>
          <Logo width="300" height="80" />
          <Navbar />
	  <div className={styles.sandwich}>
	    <Sandwich />
	  </div>
        </div>
      </div>
    </header>
  );
}
