import React from "react";

import styles from "./Footer.module.scss";

import Navbar from "../header/Navbar/Navbar";
import SocialNetworkList from "../Social-Network-List/SocialNetworkList";
import Logo from "../header/Navbar/Logo/Logo";

function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.navbar_wrapper}>
          <Navbar />
        </div>
        <div className={`${styles.content_wrapper} container_wrapper`}>
          <div className={styles.social_network_wrapper}>
            <SocialNetworkList width="35" />
          </div>
          <div className={styles.logo_wrapper}>
            <Logo width="300" height="80" />
          </div>
          <ul className={styles.copyright_list}>
            <li className={`${styles.copyright_item} year`}>2022</li>
            <li className={`${styles.copyright_item} privacy`}>
              Политика конфиденциальности
            </li>
          </ul>
        </div>
    </footer>
  );
}

export default Footer;
