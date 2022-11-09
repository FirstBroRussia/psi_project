import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  setHeaderBarElementAction,
  setIsOpenMobileMenuAction
} from "../../../store/reducer";

import styles from "./Header.module.scss";

import Logo from "../Navbar/Logo/Logo";
import Navbar from "../Navbar/Navbar";
import Sandwich from "../Sandwich/Sandwich";

import HeaderControl from "../../../utils/HeaderControl/HeaderControl";
import { iconSizes } from "../../../utils/utils";

let init = false;

let HeaderControlClass = null;

export default function Header() {
  const [sizeLogo, setSizeLogo] = useState(iconSizes.Sixty);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const isOpenMobileMenu = useSelector(state => state.reducer.isOpenMobileMenu);
  const deviceType = useSelector(state => state.reducer.typeUserDevice);
  const widthViewport = useSelector(state => state.reducer.widthViewport);
  const headerRef = useRef(null);
  const dispatch = useDispatch();

  const sandwichClickHandler = () => {
    setIsOpenMenu(!isOpenMenu);
    dispatch(setIsOpenMobileMenuAction(!isOpenMenu));
  };

  if (isOpenMenu) {
    document.querySelector("html").style.overflow = "hidden";
  } else {
    document.querySelector("html").style.overflow = "auto";
  }

  if (widthViewport >= 690) {
	document.querySelector("html").style.overflow = "auto";
  }

  useEffect(
    () => {
      if (!init) {
        dispatch(setIsOpenMobileMenuAction(isOpenMenu));
        HeaderControlClass = new HeaderControl(headerRef.current, { fadingHeader: true, headerType: deviceType });
        dispatch(setHeaderBarElementAction(headerRef.current));
        init = true;

        return;
      }
	  if (!HeaderControlClass) {
        HeaderControlClass = new HeaderControl(headerRef.current, { fadingHeader: true, headerType: deviceType });
        dispatch(setHeaderBarElementAction(headerRef.current));
	  }
	  if (HeaderControlClass && widthViewport < 690) {
		HeaderControlClass.setHeaderType('mobile');
	  } else if (HeaderControlClass && widthViewport >= 690) {
		HeaderControlClass.setHeaderType(deviceType);
	  }

      setIsOpenMenu(isOpenMobileMenu);

	  return () => {
		HeaderControlClass = null;
	  }
    },
    [isOpenMobileMenu, deviceType, widthViewport]
  );

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
      <header ref={headerRef} className={styles.header}>
        <div className="container_wrapper">
          <div className={styles.wrapper}>
            <Logo width="300" height="80" />
            <Navbar />
          </div>
        </div>
      </header>
    );
  } else {
    if (!isOpenMenu) {
      return (
        <header 
	  ref={headerRef} 
	  className={styles.header_mobile}>
          <Logo height={sizeLogo} />
          <div
            onClick={sandwichClickHandler}
            className={styles.sandwich_wrapper}
          >
            <Sandwich type="default" />
          </div>
        </header>
      );
    } else {
      return (
        <header 
	  ref={headerRef}
	  className={styles.header_mobile_open}>
          <div className={styles.sandwich_container}>
            <div
              onClick={sandwichClickHandler}
              className={styles.sandwich_wrapper}
            >
              <Sandwich type="open" />
            </div>
          </div>
          <div
            className={styles.navbar_wrapper}
          >
            <Navbar navbarType="mobile" setIsOpenMenu={setIsOpenMenu} />
          </div>
        </header>
      );
    }
  }
}
