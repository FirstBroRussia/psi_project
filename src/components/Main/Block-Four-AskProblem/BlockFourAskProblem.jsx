import Image from "next/image";
import React, {useState, useRef} from "react";

import styles from "./BlockFourAskProblem.module.scss";

import plusSvg from "../../../public/image/block-four-ask-problem/plus-icon.svg";

const videoNull = `#`;

const askProblemsItems = {
  Mood: "mood",
  Target: "target",
  Behavior: "behavior",
  Other: "other"
};

const videoList = {
  moodVideoHorizontal: require("../../../public/video/help-block/mood-video/compress/mood-horizontal.mp4"),
  moodVideoVertical: require("../../../public/video/help-block/mood-video/compress/mood-vertical.mp4"),
  targetVideoHorizontal: require('../../../public/video/help-block/target-video/compress/target-horizontal.mp4'),
  targetVideoVertical: require('../../../public/video/help-block/target-video/compress/target-vertical.mp4'),
  behaviorVideoHorizontal: require('../../../public/video/help-block/behavior-video/compress/behavior-horizontal.mp4'),
  behaviorVideoVertical: require('../../../public/video/help-block/behavior-video/compress/behavior-vertical.mp4'),
  otherVideoHorizontal: require('../../../public/video/help-block/other-video/compress/other-horizontal.mp4'),
  otherVideoVertical: require('../../../public/video/help-block/other-video/compress/other-vertical.mp4'),
};

export default function BlockFourAskProblem({store}) {
	console.log(store);
  const currentOpenListRef = useRef(null);
  const [isOpenList, setIsOpenList] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(videoNull);

  const listWrapperRef = useRef(null);
  const listElementRef = useRef(null);

  const askProblemsListClickHandler = evt => {
    if (!evt.target.closest(`[data-item]`)) {
      return;
    }

    const targetElement = evt.target.closest(`[data-item]`);

    if (isOpenList) {
	currentOpenListRef.current.classList.remove(styles.open_item);
	currentOpenListRef.current = null;
	setIsOpenList(!isOpenList);

	return;
    }

    currentOpenListRef.current = targetElement;

    if (targetElement.closest(`[data-item=${askProblemsItems.Mood}]`)) {
	targetElement.closest(`[data-item=${askProblemsItems.Mood}]`).classList.add(`${styles.open_item}`);
	setCurrentVideo(videoList.moodVideoHorizontal);
    } else if (targetElement.closest(`[data-item=${askProblemsItems.Target}]`)) {
	targetElement.closest(`[data-item=${askProblemsItems.Target}]`).classList.add(`${styles.open_item}`);
	setCurrentVideo(videoList.targetVideoHorizontal);
    } else if (targetElement.closest(`[data-item=${askProblemsItems.Behavior}]`)) {
	targetElement.closest(`[data-item=${askProblemsItems.Behavior}]`).classList.add(`${styles.open_item}`);
	setCurrentVideo(videoList.behaviorVideoHorizontal);
    } else if (targetElement.closest(`[data-item=${askProblemsItems.Other}]`)) {
	targetElement.closest(`[data-item=${askProblemsItems.Other}]`).classList.add(`${styles.open_item}`);
	setCurrentVideo(videoList.otherVideoHorizontal);
    }

    setIsOpenList(!isOpenList);
  };

  return (
    <article className={`gradient_background ${styles.block_four_ask_problem}`}>
      <div className="container_wrapper padding_wrapper">
        <div className={styles.block_wrapper}>
          <h2 className="h2">С чем я могу вам помочь</h2>
          <div ref={listWrapperRef} className={styles.problems_list_wrapper}>
            <ul
	      ref={listElementRef}
              onClick={askProblemsListClickHandler}
              className={`${styles.problems_list} ${isOpenList ? `${styles.open_list}` : ''}`}
            >
              <li
                data-item={askProblemsItems.Mood}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <Image src={plusSvg} alt="Иконка плюс-крестик" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    Проблемы с настроением
                  </h3>
                </div>
                <ul className={`${styles.item_description_list} `}> 
                  <li className={styles.description_list_item}>
                    Регулярное снижение настроения
                  </li>
                  <li className={styles.description_list_item}>
                    Скачки настроения в течении дня
                  </li>
                  <li className={styles.description_list_item}>
                    Депрессивные состояния
                  </li>
                  <li className={styles.description_list_item}>
                    Повышенная тревожность
                  </li>
                  <li className={styles.description_list_item}>
                    Вспышки гнева, трудности в обращении с эмоциями
                  </li>
                </ul>
              </li>
              <li
                data-item={askProblemsItems.Target}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <Image src={plusSvg} alt="Иконка плюс-крестик" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    Сложности постановки и достижения целей
                  </h3>
                </div>
                <ul className={`${styles.item_description_list}`}>
                  <li className={styles.description_list_item}>
                    Нет мотивации, апатия, чувство безнадёжности
                  </li>
                  <li className={styles.description_list_item}>
                    Низкая продуктивность, прокрастинация
                  </li>
                  <li className={styles.description_list_item}>
                    Эмоциональное выгорание
                  </li>
                  <li className={styles.description_list_item}>
                    Болезненная нерешительность
                  </li>
                  <li className={styles.description_list_item}>
                    Нет навыка целеполагания
                  </li>
                </ul>
              </li>
              <li
                data-item={askProblemsItems.Behavior}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <Image src={plusSvg} alt="Иконка плюс-крестик" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    Нежелательное поведение
                  </h3>
                </div>
                <ul className={`${styles.item_description_list}`}>
                  <li className={styles.description_list_item}>
                    Лёгкие формы зависимости
                  </li>
                  <li className={styles.description_list_item}>
                    Навязчивые действия
                  </li>
                  <li className={styles.description_list_item}>
                    Формы аутоагрессии
                  </li>
                  <li className={styles.description_list_item}>
                    Другие формы нежелательного поведения
                  </li>
                </ul>
              </li>
              <li
                data-item={askProblemsItems.Other}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <Image src={plusSvg} alt="Иконка плюс-крестик" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    Другие проблемы
                  </h3>
                </div>
                <ul className={`${styles.item_description_list}`}>
                  <li className={styles.description_list_item}>
                    Нестабильная самооценка, неуверенность в себе
                  </li>
                  <li className={styles.description_list_item}>
                    Сложные отношения с близкими людьми
                  </li>
                  <li className={styles.description_list_item}>
                    Страх общения
                  </li>
                  <li className={styles.description_list_item}>Фобии</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <video src={currentVideo} className={`${styles.video_background} ${isOpenList ? `${styles.visible_video}` : `${styles.hidden_video}`}`} autoPlay loop />
    </article>
  );
}
