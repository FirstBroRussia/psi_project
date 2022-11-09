import React, { useState, useRef, useEffect } from "react";
import {useSelector} from "react-redux";
import { DeviceTypeList} from "../../../utils/utils";

import styles from "./BlockFivePrice.module.scss";

export default function BlockFivePrice() {
  const deviceType = useSelector(state => state.reducer.typeUserDevice);

  const [isDefaultServices, setIsDefaultServices] = useState(true);

  const servicesListRef = useRef(null);
  const defListRef = useRef(null);
  const extendListRef = useRef(null);

  const priceClickHandler = (evt) => {
	evt.stopPropagation();
	const targetElement = evt.target.closest(`p[class^="${`p_toggle_price ${styles.services_item_price}`}"]`);
	if (!targetElement) {
		return;
	}

	const signUpElement = document.querySelector('#block_seven_sign_up');
	signUpElement.scrollIntoView(true);
  };

  const toggleClickHandler = async (evt) => {
    if (!evt.target.closest("[data-item]")) {
      return;
    }

    if (isDefaultServices) {
	defListRef.current.style.opacity = 0;
    } else {
	extendListRef.current.style.opacity = 0;
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    setIsDefaultServices(!isDefaultServices);
  };

  useEffect(() => {
	if (isDefaultServices) {
		defListRef.current.style.opacity = 1;
	} else {
		extendListRef.current.style.opacity = 1;
	}

	// 
  }, [isDefaultServices]);

  return (
    <article onClick={priceClickHandler} className={`${styles.block_five_services} gradient_background padding_wrapper`} id='block_five_services'>
      <div className={`${styles.block_wrapper} container_wrapper`}>
        <h2 className="h2">Услуги</h2>
        <ul
          onClick={toggleClickHandler}
          className={styles.services_toggle_list}
        >
          <li
            data-item="default"
            className={`p_toggle_price ${styles.services_toggle_item} ${isDefaultServices
              ? `${styles.active_item}`
              : ""}`}
          >
            Консультация
          </li>
          <li
            data-item="extended"
            className={`p_toggle_price ${styles.services_toggle_item} ${!isDefaultServices
              ? `${styles.active_item}`
              : ""}`}
          >
            Пакет консультаций
          </li>
        </ul>
        <div 
	  ref={servicesListRef}
	  className={styles.services_list_wrapper}>
          <ul
	    className={`${styles.services_list} ${deviceType === DeviceTypeList.Desktop
                ? `${styles.services_list_hover}`
                : `${styles.services_list_active}`}`}>
            {isDefaultServices
              ? <ul
                  ref={defListRef}
                  className={styles.consultation_default_list}
                >
                  <li className={styles.services_item}>
                    <h3 className={`h3 ${styles.services_item_heading}`}>
                      Первичная консультация
                    </h3>
                    <p className={`p_description ${styles.services_item_description}`}>
                      Сформулируем список проблем, наметим вектор работы
                    </p>
                    <p className={`p_toggle_price ${styles.services_item_price}`}>1 500 руб</p>
                  </li>
                  <li className={styles.services_item}>
                    <h3 className={`h3 ${styles.services_item_heading}`}>
                      Индивидуальная консультация
                    </h3>
                    <p className={`p_description ${styles.services_item_description}`}>
                      Работа онлайн, 60-80 минут
                    </p>
                    <p className={`p_toggle_price ${styles.services_item_price}`}>2 000 руб</p>
                  </li>
                  <li className={styles.services_item}>
                    <h3 className={`h3 ${styles.services_item_heading}`}>
                      Расширенная консультация
                    </h3>
                    <p className={`p_description ${styles.services_item_description}`}>
                      Углубленная работа с проблемой, 120 минут
                    </p>
                    <p className={`p_toggle_price ${styles.services_item_price}`}>3 000 руб</p>
                  </li>
                </ul>
              : <ul
                  ref={extendListRef}
                  className={styles.consultation_extended_list}
                >
                  <li className={styles.services_item}>
                    <h3 className={`h3 ${styles.services_item_heading}`}>
                      6 консультаций
                    </h3>
                    <p className={`p_description ${styles.services_item_description}`}>
                      Достаточно для проработки одной проблемы
                    </p>
                    <p className={`p_toggle_price ${styles.services_item_price}`}>10 000 руб</p>
                  </li>
                  <li className={styles.services_item}>
                    <h3 className={`h3 ${styles.services_item_heading}`}>
                      12 консультаций
                    </h3>
                    <p className={`p_description ${styles.services_item_description}`}>
                      Чтобы научиться глубже себя понимать и управлять своей
                      психикой
                    </p>
                    <p className={`p_toggle_price ${styles.services_item_price}`}>17 000 руб</p>
                  </li>
                </ul>}
          </ul>
        </div>
      </div>
    </article>
  );
}
