import Image from "next/image";
import React from "react";

import styles from "./BlockTwoAboutMe.module.scss";

import mainImage from "../../../public/image/block-two-about-me/main-photo.jpg";

export default function BlockTwoAboutMe() {
  return (
    <article className={`gradient_background ${styles.block_two_about_me}`}>
      <div className="container_wrapper padding_wrapper">
        <div className={styles.block_wrapper}>
          <div className={styles.info_wrapper}>
            <h2 className="h2">Анастасия Судакова</h2>
            <div className={styles.description_wrapper}>
              <p className={styles.description}>
                <span className={styles.text_unique_1}>Рада видеть вас!</span>
                <br />
                <br />
                Вы здесь, потому что решили изменить свою жизнь.<br />И я вам в
                этом помогу. <br />
                <br />
                Я клинический психолог и когнитивно-поведенческий терапевт.{" "}
                <br />
                <br />
                <span className={styles.text_unique_2}>
                  Когнитивная терапия —{" "}
                </span>
                <br />
                это метод работы с мыслями, которые и являются причиной вашего
                состояния. <br />
                <br />
                Вы почувствуете результат работы с первых сеансов.
              </p>
            </div>
          </div>
          <div className={styles.image_wrapper}>
            <div className={styles.first_image}>
              <Image src={mainImage} alt="Фото психолога верхнее" />
            </div>
            <div className={styles.second_image}>
              <Image src={mainImage} alt="Фото психолога нижнее" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
