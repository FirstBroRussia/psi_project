import React from "react";
import Header from "./components/header/Header/Header";
import Logo from "./components/header/Logo";
import Navbar from "./components/header/Navbar/Navbar";
import Main from "./components/Main/Main";
import SocialNetworkList from "./components/Social-Network-List/SocialNetworkList";

import styles from './styles/App.module.scss';

function App() {
  return (
    <div className={styles.main_container}>
      <Header />
      <Main />
      <footer className="footer">
        <div className="navbar_wrapper">
          <Navbar />
        </div>
        <div className="content_wrapper">
          <div className="social_network_wrapper">
            <SocialNetworkList width="35" />
          </div>
          <div className="logo_wrapper">
            <Logo width="300" height="80" />
          </div>
          <ul className="copyright_list">
            <li className="copyright_item year">2022</li>
            <li className="copyright_item privacy">
              Политика конфиденциальности
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
