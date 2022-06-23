import React, {useState, useRef, useEffect} from "react";

import styles from "./BlockFivePrice.module.scss";

export default function BlockFivePrice() {
  const [isDefaultServices, setIsDefaultServices] = useState(true);
  const defListRef = useRef(null);
  const extendListRef = useRef(null);

  const toggleClickHandler = evt => {
    if (!evt.target.closest("[data-item]")) {
      return;
    }

     setIsDefaultServices(!isDefaultServices);
  };



  return (
    <article className={`gradient_background ${styles.block_five_services}`}>
      <div className="container_wrapper padding_wrapper">
        <div className={styles.block_wrapper}>
          <h2 className="h2">Услуги</h2>
          <ul onClick={toggleClickHandler} className={styles.services_toggle_list}>
            <li
              data-item="default"
              className={`${styles.services_toggle_item} ${isDefaultServices
                ? `${styles.active_item}`
                : ""}`}
            >
              Консультация
            </li>
            <li
              data-item="extended"
              className={`${styles.services_toggle_item} ${!isDefaultServices
                ? `${styles.active_item}`
                : ""}`}
            >
              Пакет консультаций
            </li>
          </ul>
	  <div className={styles.services_list_wrapper}>
          <ul className={styles.services_list}>
		{isDefaultServices ? (
			<ul ref={defListRef} className={styles.consultation_default_list}>
			<li className={styles.services_item}>
			  <h3 className={`h3 ${styles.services_item_heading}`}>
			    Первичная консультация
			  </h3>
			  <p className={styles.services_item_description}>
			    Сформулируем задачи терапии, наметим вектор работы
			  </p>
			  <p className={styles.services_item_price}>1 500 руб</p>
			</li>
			<li className={styles.services_item}>
			  <h3 className={`h3 ${styles.services_item_heading}`}>
			    Индивидуальная консультация
			  </h3>
			  <p className={styles.services_item_description}>
			    Работа онлайн, 60-80 минут
			  </p>
			  <p className={styles.services_item_price}>2 000 руб</p>
			</li>
			<li className={styles.services_item}>
			  <h3 className={`h3 ${styles.services_item_heading}`}>
			    Расширенная консультация
			  </h3>
			  <p className={styles.services_item_description}>
			    Углубленная работа с проблемой, 120 минут
			  </p>
			  <p className={styles.services_item_price}>3 000 руб</p>
			</li>
		      </ul>
		) : (
	              <ul ref={extendListRef} className={styles.consultation_extended_list}>
			<li className={styles.services_item}>
				<h3 className={`h3 ${styles.services_item_heading}`}>6 консультаций</h3>
				<p className={styles.services_item_description}>
				Достаточно для проработки одной проблемы
				</p>
				<p className={styles.services_item_price}>10 000 руб</p>
			</li>
			<li className={styles.services_item}>
				<h3 className={`h3 ${styles.services_item_heading}`}>12 консультаций</h3>
				<p className={styles.services_item_description}>
				Чтобы научиться глубже себя понимать и управлять своей
				психикой
				</p>
				<p className={styles.services_item_price}>17 000 руб</p>
			</li>
		      </ul>
		)}
          </ul>
        </div>
        </div>
      </div>
    </article>
  );
}
