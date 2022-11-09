import React, { useRef, useLayoutEffect } from "react";
import {useSelector} from "react-redux";

import styles from "./BlockThreeTherapy.module.scss";

import evidentlyImage from "../../../content/image/block-three-therapy/evidently.svg";
import suitableForAllImage from "../../../content/image/block-three-therapy/suitableForAll.svg";
import effectivelyImage from "../../../content/image/block-three-therapy/effectively.svg";

import {DeviceTypeList, setForcedHeightValue} from "../../../utils/utils";

export default function BlockThreeTherapy() {
  const deviceType = useSelector(state => state.reducer.typeUserDevice);
  const widthViewport = useSelector(state => state.reducer.widthViewport);
  const orientationScreen = useSelector(state => state.reducer.orientationScreen);

  const therapyListRef = useRef(null);

  useLayoutEffect(() => {
	if (therapyListRef.current !== null && (deviceType === DeviceTypeList.Tablet || deviceType === DeviceTypeList.SmartTv)) {
		const therapyListChildrenElements = therapyListRef.current.children;

		setForcedHeightValue(therapyListChildrenElements, {delay: 300});
		
	} else if (therapyListRef.current !== null && (deviceType !== DeviceTypeList.Tablet || deviceType !== DeviceTypeList.SmartTv)) {
		const therapyListChildrenElements = therapyListRef.current.children;

		setTimeout(() => {
			for (const item of therapyListChildrenElements) {
				item.style.height = `100%`;
			}
		}, 500);
	}

  }, [therapyListRef, deviceType, orientationScreen, widthViewport]);

  if (widthViewport >= 690 && deviceType !== DeviceTypeList.Tablet && deviceType !== DeviceTypeList.SmartTv) {
    return (
      <article
        className={`${styles.block_three_therapy} gradient_background padding_wrapper`}
        id="block_three_therapy"
      >
        <div className={`${styles.block_wrapper} container_wrapper`}>
          <h2 className={`h2 ${styles.heading}`}>
            Преимущества <span>когнитивного</span> направления
          </h2>
          <ul
	    ref={therapyListRef}
            className={`${styles.therapy_list} ${deviceType ===
              DeviceTypeList.Desktop && `${styles.therapy_list_hover}`}`}
          >
            <li className={styles.therapy_item}>
              <div className={styles.card_front}>
                <div className={styles.card_inner}>
                  <img
                    className={styles.item_image}
                    src={evidentlyImage}
                    alt="Доказательно"
                  />
                  <h3 className={`h3 ${styles.item_heading}`}>Доказательно</h3>
                </div>
              </div>
              <div className={styles.card_back}>
                <div className={styles.card_inner}>
                  <p className={styles.item_description}>
                    Единственный метод с научно-доказанной
                    эффективностью.
                  </p>
                </div>
              </div>
            </li>
            <li className={styles.therapy_item}>
              <div className={styles.card_front}>
                <div className={styles.card_inner}>
                  <img
                    className={styles.item_image}
                    src={suitableForAllImage}
                    alt="Подходит всем"
                  />
                  <h3 className={`h3 ${styles.item_heading}`}>Подходит всем</h3>
                </div>
              </div>
              <div className={styles.card_back}>
                <div className={styles.card_inner}>
                  <p className={styles.item_description}>
                    Независимо от вашего возраста, характера проблемы и
                    личностных особенностей.
                  </p>
                </div>
              </div>
            </li>
            <li className={styles.therapy_item}>
              <div className={styles.card_front}>
                <div className={styles.card_inner}>
                  <img
                    className={styles.item_image}
                    src={effectivelyImage}
                    alt="Эффективно"
                  />
                  <h3 className={`h3 ${styles.item_heading}`}>Эффективно</h3>
                </div>
              </div>
              <div className={styles.card_back}>
                <div className={styles.card_inner}>
                  <p className={styles.item_description}>
                    Решение проблемы за 2-3 сеанса. Облегчение вашего состояния
                    с первой встречи.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </article>
    );
  } else if (widthViewport >= 690 && (deviceType === DeviceTypeList.Tablet || deviceType === DeviceTypeList.SmartTv)) {
	return (
		<article
		  className={`${styles.block_three_therapy} gradient_background padding_wrapper`}
		  id="block_three_therapy"
		>
		  <div className={`${styles.block_wrapper} container_wrapper`}>
		    <h2 className={`h2 ${styles.heading}`}>
		      Преимущества <span>когнитивного</span> направления
		    </h2>
		    <ul
		      ref={therapyListRef}
		      className={`${styles.therapy_list__no_desktop}`}
		    >
		      <li className={styles.therapy_item__no_desktop}>
			<div className={styles.therapy_item_wrapper}>
				<h3 className={`h3 ${styles.item_heading}`}>Доказательно</h3>
				<img
				className={styles.item_image}
				src={evidentlyImage}
				alt="Доказательно"
				/>
				<p className={styles.item_description}>
				Единственный метод с научно-доказанной
				эффективностью.
				</p>
			</div>
		      </li>
		      <li className={styles.therapy_item__no_desktop}>
		      <div className={styles.therapy_item_wrapper}>
				  <h3 className={`h3 ${styles.item_heading}`}>Подходит всем</h3>
			    <img
			      className={styles.item_image}
			      src={suitableForAllImage}
			      alt="Подходит всем"
			    />
			    <p className={styles.item_description}>
			      Независимо от вашего возраста, характера проблемы и
			      личностных особенностей.
			    </p>
			    </div>
		      </li>
		      <li className={styles.therapy_item__no_desktop}>
		      <div className={styles.therapy_item_wrapper}>
				  <h3 className={`h3 ${styles.item_heading}`}>Эффективно</h3>
			    <img
			      className={styles.item_image}
			      src={effectivelyImage}
			      alt="Эффективно"
			    />
			    <p className={styles.item_description}>
			      Решение проблемы за 2-3 сеанса. Облегчение вашего состояния
			      с первой встречи.
			    </p>
			    </div>
		      </li>
		    </ul>
		  </div>
		</article>
	      );
  } else if (widthViewport < 690) {
    return (
      <article
        className={`${styles.block_three_therapy} gradient_background padding_wrapper`}
        id="block_three_therapy"
      >
        <div className={`${styles.block_wrapper} container_wrapper`}>
          <h2 className={`h2 ${styles.heading}`}>
            Преимущества <span>когнитивного</span> направления
          </h2>
          <ul 
		ref={therapyListRef}
		className={styles.therapy_list}
	  >
            <li className={styles.therapy_item_mobile}>
		<h3 className={`h3 ${styles.item_heading}`}>Доказательно</h3>
		<img
			className={styles.item_image}
			src={evidentlyImage}
			alt="Доказательно"
		/>
		<p className={styles.item_description}>
		Единственный метод с научно-доказанной
		эффективностью.
		</p>
            </li>
            <li className={styles.therapy_item_mobile}>
		<h3 className={`h3 ${styles.item_heading}`}>Подходит всем</h3>
		<img
			className={styles.item_image}
			src={suitableForAllImage}
			alt="Подходит всем"
		/>
		<p className={styles.item_description}>
			Независимо от вашего возраста, характера проблемы и личностных
			особенностей.
		</p>
            </li>
            <li className={styles.therapy_item_mobile}>
		<h3 className={`h3 ${styles.item_heading}`}>Эффективно</h3>
		<img
			className={styles.item_image}
			src={effectivelyImage}
			alt="Эффективно"
		/>
                <p className={styles.item_description}>
                  Решение проблемы за 2-3 сеанса. Облегчение вашего состояния с
                  первой встречи.
                </p>
            </li>
          </ul>
        </div>
      </article>
    );
  }
}
