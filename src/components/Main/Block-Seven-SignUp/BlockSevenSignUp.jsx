import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import styles from "./BlockSevenSignUp.module.scss";

import SocialNetworkList from "../../Social-Network-List/SocialNetworkList";

// import imageContent from "../../../content/image/block-seven-sign-up/image.jpg";
import videoBackground from "../../../content/video/feedback-video.mp4";
import {DeviceTypeList, iconSizes} from "../../../utils/utils";
import { setSevenBlockVideoAction } from "../../../store/reducer";

class Resize {
	#mainElement = null;
	#changeableElement = null;

	#resizeObserver = null;

	constructor (element, changeableElement) {
		this.#mainElement = element;
		this.#changeableElement = changeableElement;

		this.#resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				this.#changeableElement.style.width = `${entry.borderBoxSize[0].inlineSize}px`;
				this.#changeableElement.style.height = `${entry.borderBoxSize[0].blockSize}px`;
			}
		});
		this.#resizeObserver.observe(this.#mainElement);

	}

	setChangeableElement = (changeableElement) => {
		this.#changeableElement = changeableElement;
	};
}

let ResizeClass = null;

export default function BlockSevenSignUp() {
	const [sizeSocialIcon, setSizeSocialIcon] = useState(iconSizes.Sixty);
	const widthViewport = useSelector(state => state.reducer.widthViewport);
	const deviceType = useSelector(state => state.reducer.typeUserDevice);

	const dispatch = useDispatch();

	const infoRef = useRef(null);
	const imageRef = useRef(null);
	const videoElementRef = useRef(null);
	
	useEffect(() => {
		if (!ResizeClass) {
			ResizeClass = new Resize(infoRef.current, imageRef.current);
		}
		if (videoElementRef.current !== null) {
			dispatch(setSevenBlockVideoAction(videoElementRef.current));
		}
		if (widthViewport < 690) {
			imageRef.current.hidden = true;
		} else {
			imageRef.current.hidden = false;
		}
	}, [widthViewport]);

	if (widthViewport >= 1500 && sizeSocialIcon !== iconSizes.Sixty) {
		setSizeSocialIcon(iconSizes.Sixty);
	} else if (widthViewport < 1500 && widthViewport >= 1280 && sizeSocialIcon !== iconSizes.Fifty) {
		setSizeSocialIcon(iconSizes.Fifty);
	} else if (widthViewport < 1280 && widthViewport >= 1024 && sizeSocialIcon !== iconSizes.Forty) {
		setSizeSocialIcon(iconSizes.Forty);
	} else if (widthViewport < 1024 && widthViewport >= 864 && sizeSocialIcon !== iconSizes.Thirty) {
		setSizeSocialIcon(iconSizes.Thirty);
	} else if (widthViewport < 864 && widthViewport >= 690 && sizeSocialIcon !== iconSizes.Thirty) {
		setSizeSocialIcon(iconSizes.Thirty);
	} else if (widthViewport < 690 && sizeSocialIcon !== iconSizes.Forty) {
		setSizeSocialIcon(iconSizes.Forty);
	}
	// } else if (widthViewport < 590 && widthViewport >= 490 && sizeSocialIcon !== iconSizes.Thirty) {
	// 	setSizeSocialIcon(iconSizes.Thirty);
	// } else if (widthViewport < 490 && widthViewport >= 390 && sizeSocialIcon !== iconSizes.Twenty) {
	// 	setSizeSocialIcon(iconSizes.Twenty);
	// } else if (widthViewport < 390 && sizeSocialIcon !== iconSizes.Twenty) {
	// 	setSizeSocialIcon(iconSizes.Twenty);
	// }

  return (
    <article
      className={`${styles.block_seven_sign_up} padding_wrapper`}
      id="block_seven_sign_up"
    >
      <div className={`${styles.block_wrapper}`}>
        <div className="container_wrapper">
          <h2 className="h2">Записаться</h2>
        </div>
        <div className={`${styles.content_container} ${widthViewport < 690 && `${styles.background}`}`}>
          <div className={`${styles.content_wrapper} ${widthViewport >= 690 && `${styles.background}`}`}>
            <div ref={infoRef} className={styles.info_wrapper}>
              <h3 className={`h3 ${styles.heading}`}>Для записи вы можете:</h3>
              <ul className={styles.content_list}>
                <li className={`p_description ${styles.content_item}`}>
                  Выбрать удобный для вас мессенджер
                </li>
                <li className={`p_description ${styles.content_item}`}>
                  В сообщении указать ваше имя и возраст
                </li>
                <li className={`p_description ${styles.content_item}`}>
                  Описать проблему
                </li>
              </ul>
              <p className={`p_description ${styles.subtext}`}>
                Вам ответят в ближайшее время
              </p>
	      <div className={styles.social_list_wrapper}>
                <SocialNetworkList width={sizeSocialIcon} />
	      </div>
	      <p className={styles.privacy_info}>
		При передачe своих данных через месенджеры вы соглашаетесь с <Link to="/privacy" className={styles.privacy_link}>политикой конфиденциальности</Link>
	      </p>
            </div>
	    <div ref={imageRef} className={styles.image_wrapper}></div>
          </div>
        </div>
      </div>
      <video ref={videoElementRef} src={videoBackground} className={styles.video_block} loop autoPlay muted preload="auto" playsInline/>
    </article>
  );
}
