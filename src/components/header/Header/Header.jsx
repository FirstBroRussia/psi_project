import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux/es/exports";
import { setHeaderBarElementAction } from "../../../store/reducer";

import styles from "./Header.module.scss";

import Logo from "../Navbar/Logo/Logo";
import Navbar from "../Navbar/Navbar";
import Sandwich from "../Sandwich/Sandwich";

import HeaderControl from "../../../utils/HeaderControl/HeaderControl";

let init = false;

export default function Header() {
	const headerRef = useRef(null);
	const dispatch = useDispatch();

	const deviceType = useSelector((state) => state.reducer.typeUserDevice);

	useEffect(() => {
		if(!init) {
			new HeaderControl(headerRef.current, {fadingHeader: true,});
			dispatch(setHeaderBarElementAction(headerRef.current));
			init = true;
		}
	}, []);

  return (
    <header ref={headerRef} className={styles.header}>
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
