import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Footer.module.scss";

import Navbar from "../header/Navbar/Navbar";
// import SocialNetworkList from "../Social-Network-List/SocialNetworkList";
import Logo from "../header/Navbar/Logo/Logo";
import { DeviceTypeList, iconSizes } from "../../utils/utils";
import { useRef } from "react";
import { setFooterElementAction } from "../../store/reducer";

function Footer() {
  const dispatch = useDispatch();
  const typeDevice = useSelector(state => state.reducer.typeUserDevice);
  const widthViewport = useSelector(state => state.reducer.widthViewport);
  const [sizeSocialIcon, setSizeSocialIcon] = useState(iconSizes.Sixty);
  const [sizeLogo, setSizeLogo] = useState(iconSizes.Sixty);
  const footerElementRef = useRef(null);

  useEffect(() => {
	dispatch(setFooterElementAction(footerElementRef.current));
  }, [dispatch, footerElementRef, widthViewport]);

  if (widthViewport >= 590 &&
	sizeSocialIcon !== iconSizes.Thirty) {
    setSizeSocialIcon(iconSizes.Thirty);
  } else if (
    widthViewport < 590 &&
    widthViewport >= 490 &&
    sizeSocialIcon !== iconSizes.Thirty
  ) {
    setSizeSocialIcon(iconSizes.Thirty);
  } else if (
    widthViewport < 490 &&
    widthViewport >= 390 &&
    sizeSocialIcon !== iconSizes.Twenty
  ) {
    setSizeSocialIcon(iconSizes.Twenty);
  } else if (widthViewport < 390 && sizeSocialIcon !== iconSizes.Twenty) {
    setSizeSocialIcon(iconSizes.Twenty);
  }

  if (
    widthViewport < 690 &&
    widthViewport >= 590 &&
    sizeLogo !== iconSizes.Sixty
  ) {
    setSizeLogo(iconSizes.Sixty);
  } else if (
    widthViewport < 590 &&
    widthViewport >= 490 &&
    sizeLogo !== iconSizes.Fifty
  ) {
    setSizeLogo(iconSizes.Fifty);
  } else if (widthViewport < 490 && sizeLogo !== iconSizes.Forty) {
    setSizeLogo(iconSizes.Forty);
  }

  if (widthViewport >= 690) {
    return (
      <footer         
	ref={footerElementRef}
	className={styles.footer}>
        <div className={styles.navbar_wrapper}>
          <Navbar />
        </div>
        <div className={`${styles.content_wrapper} container_wrapper`}>
          <div className={styles.logo_wrapper}>
            <Logo width="300" height="80" />
          </div>
          <ul className={styles.copyright_list}>
            <li className={`${styles.copyright_item} year`}>2022</li>
            <li
              className={`${styles.copyright_item} privacy ${typeDevice ===
              DeviceTypeList.Desktop
                ? `${styles.hover}`
                : `${styles.active}`}`}
            >
              <Link to="/privacy">Политика конфиденциальности</Link>
            </li>
          </ul>
        </div>
      </footer>
    );
  } else {
    return (
      <footer 
        ref={footerElementRef}
        className={styles.footer}>
        <div className={`${styles.content_wrapper} container_wrapper`}>
          <div className={styles.logo_wrapper}>
            <Logo height={sizeLogo} type={'center'} />
          </div>
          <ul className={styles.copyright_list}>
            {/* <li className={`${styles.copyright_item} year`}>2022</li> */}
            <li
              className={`${styles.copyright_item} privacy ${typeDevice ===
              DeviceTypeList.Desktop
                ? `${styles.hover}`
                : `${styles.active}`}`}
            >
              <Link to="/privacy" className={styles.privacy_link}>Политика конфиденциальности</Link>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
