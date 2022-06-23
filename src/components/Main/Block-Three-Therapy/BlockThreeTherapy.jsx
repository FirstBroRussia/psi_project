import Image from "next/image";
import React from "react";

import styles from "./BlockThreeTherapy.module.scss";

import evidentlyImage from "../../../public/image/block-three-therapy/evidently.svg";
import suitableForAllImage from "../../../public/image/block-three-therapy/suitableForAll.svg";
import effectivelyImage from "../../../public/image/block-three-therapy/effectively.svg";

export default function BlockThreeTherapy() {
  return (
    <article className={`gradient_background ${styles.block_three_therapy}`}>
      <div className="container_wrapper padding_wrapper">
        <div className={styles.block_wrapper}>
          <h2 className="h2">Преимущества когнитивной терапии</h2>
          <ul className={styles.therapy_list}>
            <li className={styles.therapy_item}>
              <div className={styles.card_front}>
                <div className={styles.card_inner}>
                  <div className="item_image">
                    <Image src={evidentlyImage} alt="Доказательно" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>Доказательно</h3>
                </div>
              </div>
              <div className={styles.card_back}>
                <div className={styles.card_inner}>
                  <p className={styles.item_description}>
                    Единственный психотерапевтический метод с научно-доказанной
                    эфективностью.
                  </p>
                </div>
              </div>
            </li>
            <li className={styles.therapy_item}>
              <div className={styles.card_front}>
                <div className={styles.card_inner}>
                  <div className="item_image">
                    <Image src={suitableForAllImage} alt="Подходит всем" />
                  </div>
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
                  <div className="item_image">
                    <Image src={effectivelyImage} alt="Эффективно" />
                  </div>
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
      </div>
    </article>
  );
}
