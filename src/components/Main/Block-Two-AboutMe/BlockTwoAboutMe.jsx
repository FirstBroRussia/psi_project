import {useSelector} from "react-redux";

import styles from "./BlockTwoAboutMe.module.scss";

import mainImage from "../../../content/image/block-two-about-me/main-photo.jpg";

export default function BlockTwoAboutMe() {
  const widthViewport = useSelector(state => state.reducer.widthViewport);

  if (widthViewport >= 690) {
    return (
      <article
        className={`${styles.block_two_about_me} gradient_background padding_wrapper`}
        id="block_two_about_me"
      >
        <div className="container_wrapper">
          <div className={styles.block_wrapper}>
            <div className={styles.info_container}>
              <h2 className={`h2 ${styles.heading}`}>Анастасия Судакова</h2>
              <div className={styles.info_wrapper}>
                <div className={styles.description_wrapper}>
                  <p className={styles.description}>
                    <span className={styles.text_unique_1}>
                      Рада видеть вас!
                    </span>
                    <br />
                    <br />
                    Вы здесь, потому что решили изменить свою жизнь.<br />И я
                    вам в этом помогу. <br />
                    <br />
					Я клинический психолог,<br />
					использую cовременные подходы и методы в области психологии.{" "}
                    <br />
                    <br />
                    <span className={styles.text_unique_2}>
                    В частности —{" "}
                  </span>
                  <br />
                  методы работы с мыслями, которые и являются причиной вашего
                  состояния. <br />
                  <br />
                  Вы почувствуете результат работы с первых сеансов.
                </p>
                </div>
              </div>
            </div>
            <div className={styles.image_wrapper}>
              <div className={styles.image_container}>
                <img
                  className={styles.first_image}
                  src={mainImage}
                  alt="Фото психолога верхнее"
                />
                <img
                  className={styles.second_image}
                  src={mainImage}
                  alt="Фото психолога нижнее"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  } else {
    return (
      <article
        className={`${styles.block_two_about_me} gradient_background padding_wrapper`}
        id="block_two_about_me"
      >
        <div className="container_wrapper">
          <div className={styles.block_wrapper}>
            <h2 className={`h2 ${styles.heading}`}>Анастасия Судакова</h2>
            <div className={styles.info_wrapper}>
              <div className={styles.description_wrapper}>
                <p className={styles.description}>
                  <span className={styles.text_unique_1}>Рада видеть вас!</span>
                  <br />
                  <br />
                  Вы здесь, потому что решили изменить свою жизнь.<br />И я вам
                  в этом помогу. <br />
                  <br />
                  Я клинический психолог,
				  <br />
				  использую cовременные подходы и методы в области психологии.{" "}
                  <br />
                  <br />
                  <span className={styles.text_unique_2}>
                    В частности —{" "}
                  </span>
                  <br />
                  методы работы с мыслями, которые и являются причиной вашего
                  состояния. <br />
                  <br />
                  Вы почувствуете результат работы с первых сеансов.
                </p>
              </div>
            </div>

            <div className={styles.image_wrapper}>
              <div className={styles.image_container}>
                <img
                  className={styles.first_image}
                  src={mainImage}
                  alt="Фото психолога верхнее"
                />
                <img
                  className={styles.second_image}
                  src={mainImage}
                  alt="Фото психолога нижнее"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}
