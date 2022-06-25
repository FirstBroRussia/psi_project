import React from "react";

import styles from "./BlockSevenSignUp.module.scss";

import SocialNetworkList from "../../Social-Network-List/SocialNetworkList";

import imageContent from "../../../content/image/block-seven-sign-up/image.jpg";
import videoBackground from "../../../content/video/feedback-video.mp4";

export default function BlockSevenSignUp() {
  return (
    <article className={`${styles.block_seven_sign_up} padding_wrapper`} id='block_seven_sign_up'>
      <div className={`${styles.block_wrapper}`}>
        <div className="container_wrapper">
          <h2 className="h2">Записаться</h2>
        </div>
        <div className={styles.content_wrapper}>
          <div className={styles.info_wrapper}>
            <h3 className="h3">Для записи вы можете:</h3>
            <ul className={styles.content_list}>
              <li className={`p_description ${styles.content_item}`}>
                Выбрать удобный для вас мессенджер
              </li>
              <li className={`p_description ${styles.content_item}`}>
                В сообщении указать ваше имя и возраст
              </li>
              <li className={`p_description ${styles.content_item}`}>Описать проблему</li>
            </ul>
            <p className={`p_description ${styles.subtext}`}>Вам ответят в ближайшее время</p>
            <SocialNetworkList width="60" />
          </div>
          <div className={styles.image_wrapper}>
            <img className={styles.image} src={imageContent} alt="Изображение контента" />
          </div>
        </div>
      </div>
      <video src={videoBackground} className={styles.video_block} />
    </article>
  );
}
