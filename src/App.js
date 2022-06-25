import React, { useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

import styles from "./styles/App.module.scss";

import Header from "./components/header/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import ScrollUpButton from "./utils/ScrollUpButton/ScrollUpButton";

let init = false;

function App() {
  const mainWrapperRef = useRef(null);

  useEffect(() => {
    if (!init) {
      new ScrollUpButton(mainWrapperRef.current);
      init = true;
    }
  }, []);

  return (
    <BrowserRouter>
      <div ref={mainWrapperRef} className={styles.main_container}>
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
