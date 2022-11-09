import React, {useEffect, useRef, useState} from "react";
import {HashRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import styles from "./styles/App.module.scss";

import Header from "./components/header/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import ScrollUpButton from "./utils/ScrollUpButton/ScrollUpButton";
import PrivacyPolitics from "./components/Privacy-Politics/PrivacyPolitics";
import PhoneOrientationSVG from './components/Phone-Orientation-SVG/PhoneOrientationSVG.jsx';
import {DeviceTypeList} from "./utils/utils";
import {setScrollUpButtonClassAction} from "./store/reducer";


let ScrollUpButtonClass = null;

const proportionalScale = (element, ratio) => {
	const fontSize = Number(window.getComputedStyle(element).fontSize.replace(/px/g, ''));
	const lineHeight = Number(window.getComputedStyle(element).lineHeight.replace(/px/g, ''));

	element.style.fontSize = `${fontSize * ratio}px !important`;
	element.style.lineHeight = `${lineHeight * ratio}px !important`;
	
	if (element.children.lenght > 0) {
		const width = Number(window.getComputedStyle(element).width.replace(/px/g, ''));
		const height = Number(window.getComputedStyle(element).height.replace(/px/g, ''));

		element.style.width = `${width * ratio}px`;
		element.style.height = `${height * ratio}px`;

		// GRID FLEX

		for (const item of element) {
			proportionalScale(item, ratio);
		}
	}

	// console.log(element.outerHTML);
	// console.log(element.textContent);
};



function App() {
  const dispatch = useDispatch();
  const mainWrapperRef = useRef(null);
  const footerElement = useSelector(state => state.reducer.footerElement);
  const deviceType = useSelector(state => state.reducer.typeUserDevice);
  const orientationScreen = useSelector(state => state.reducer.orientationScreen);
  const CSSDOMisLoad = useSelector(state => state.reducer.CSSDOMisLoad);
  const [isLockOrientation, setIsLockOrientation] = useState(false);

  useEffect(() => {
    if (!ScrollUpButtonClass) {
	ScrollUpButtonClass = new ScrollUpButton();
	dispatch(setScrollUpButtonClassAction(ScrollUpButtonClass));
    }
	if (ScrollUpButtonClass && footerElement) {
		ScrollUpButtonClass.setFooterElement(footerElement);
	}
    if (deviceType === DeviceTypeList.Mobile && orientationScreen.startsWith('landscape')) {
		setIsLockOrientation(true);
		ScrollUpButtonClass.hiddenScrollUpButton();
		document.querySelector('html').classList.add('overflow_hidden');
    } else {
		setIsLockOrientation(false);
		ScrollUpButtonClass.visibleScrollUpButton();
		document.querySelector('html').classList.remove('overflow_hidden');
    }
  }, [deviceType, dispatch, footerElement, orientationScreen]);

  if (!CSSDOMisLoad) {
	return;
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div ref={mainWrapperRef} className={`${styles.main_container}`}>
		{
		  isLockOrientation ? 
		  <div className={`${styles.lock_orientation_plug}`}>
				<p className={styles.lock_orientation_description}>
				Переверните мобильное устройство в портретный режим
				</p>
			<div className={styles.lock_orientation_image_wrapper}>
				<PhoneOrientationSVG size={100} className={styles.lock_orientation_image} />
			</div>
		  </div> 
		  : null
		}
              <Header />
              <Main />
              <Footer />
            </div>
          }
        />
	    <Route path="/privacy" element={<PrivacyPolitics />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
