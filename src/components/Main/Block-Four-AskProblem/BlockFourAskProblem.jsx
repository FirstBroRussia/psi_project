import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./BlockFourAskProblem.module.scss";

import plusSvg from "../../../content/image/block-four-ask-problem/plus-icon.svg";
import {DeviceTypeList} from "../../../utils/utils";
import {setIsLockScrollAction} from "../../../store/reducer";

import PeriodicMethodsClass from '../../../utils/PeriodicMethods/PeriodicMethods.js';

const TIMEOUT_VALUE = 500;

const videoNull = `#`;
const askProblemsItems = {
  Mood: "mood",
  Target: "target",
  Behavior: "behavior",
  Other: "other"
};
const videoList = {
  moodVideoHorizontal: require("../../../content/video/help-block/mood-video/compress/mood-horizontal.mp4"),
  moodVideoVertical: require("../../../content/video/help-block/mood-video/compress/mood-vertical.mp4"),
  targetVideoHorizontal: require("../../../content/video/help-block/target-video/compress/target-horizontal.mp4"),
  targetVideoVertical: require("../../../content/video/help-block/target-video/compress/target-vertical.mp4"),
  behaviorVideoHorizontal: require("../../../content/video/help-block/behavior-video/compress/behavior-horizontal.mp4"),
  behaviorVideoVertical: require("../../../content/video/help-block/behavior-video/compress/behavior-vertical.mp4"),
  otherVideoHorizontal: require("../../../content/video/help-block/other-video/compress/other-horizontal.mp4"),
  otherVideoVertical: require("../../../content/video/help-block/other-video/compress/other-vertical.mp4")
};

let PeriodicMethodsClassInstance = null;

export default function BlockFourAskProblem() {
  const dispatch = useDispatch();
  const deviceType = useSelector(state => state.reducer.typeUserDevice);
  const widthViewport = useSelector(state => state.reducer.widthViewport);
  const headerElement = useSelector(state => state.reducer.headerElement);

  const currentOpenListRef = useRef(null);
  const [isOpenList, setIsOpenList] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(videoNull);

  const blockFourElementRef = useRef(null);
  const listWrapperRef = useRef(null);
  const listElementRef = useRef(null);

  const isFalseLockDocumentScroll = useCallback(() => {
	dispatch(setIsLockScrollAction(false))
  }, []);

  const fastPageScrollHandler = useCallback(() => {
	if (!PeriodicMethodsClassInstance) {
		return;
	}

	PeriodicMethodsClassInstance.periodicUpdateTimeRecordData();
  }, []);

  useEffect(() => {
	if (!PeriodicMethodsClassInstance) {
		PeriodicMethodsClassInstance = new PeriodicMethodsClass(isFalseLockDocumentScroll, 100);
	}
  }, []);

  
  const askProblemsListClickHandler = async (evt) => {
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

    if (widthViewport >= 1024) {
	if (targetElement.closest(`[data-item=${askProblemsItems.Mood}]`)) {
		targetElement
		  .closest(`[data-item=${askProblemsItems.Mood}]`)
		  .classList.add(`${styles.open_item}`);
		setCurrentVideo(videoList.moodVideoHorizontal);
	      } else if (
		targetElement.closest(`[data-item=${askProblemsItems.Target}]`)
	      ) {
		targetElement
		  .closest(`[data-item=${askProblemsItems.Target}]`)
		  .classList.add(`${styles.open_item}`);
		setCurrentVideo(videoList.targetVideoHorizontal);
	      } else if (
		targetElement.closest(`[data-item=${askProblemsItems.Behavior}]`)
	      ) {
		targetElement
		  .closest(`[data-item=${askProblemsItems.Behavior}]`)
		  .classList.add(`${styles.open_item}`);
		setCurrentVideo(videoList.behaviorVideoHorizontal);
	      } else if (targetElement.closest(`[data-item=${askProblemsItems.Other}]`)) {
		targetElement
		  .closest(`[data-item=${askProblemsItems.Other}]`)
		  .classList.add(`${styles.open_item}`);
		setCurrentVideo(videoList.otherVideoHorizontal);
	      }
    } else {
	if (targetElement.closest(`[data-item=${askProblemsItems.Mood}]`)) {
		targetElement
		  .closest(`[data-item=${askProblemsItems.Mood}]`)
		  .classList.add(`${styles.open_item}`);
		setCurrentVideo(videoList.moodVideoVertical);
	      } else if (
		targetElement.closest(`[data-item=${askProblemsItems.Target}]`)
	      ) {
		targetElement
		  .closest(`[data-item=${askProblemsItems.Target}]`)
		  .classList.add(`${styles.open_item}`);
		setCurrentVideo(videoList.targetVideoVertical);
	      } else if (
		targetElement.closest(`[data-item=${askProblemsItems.Behavior}]`)
	      ) {
		targetElement
		  .closest(`[data-item=${askProblemsItems.Behavior}]`)
		  .classList.add(`${styles.open_item}`);
		setCurrentVideo(videoList.behaviorVideoVertical);
	      } else if (targetElement.closest(`[data-item=${askProblemsItems.Other}]`)) {
		targetElement
		  .closest(`[data-item=${askProblemsItems.Other}]`)
		  .classList.add(`${styles.open_item}`);
		setCurrentVideo(videoList.otherVideoVertical);
	      }
    }

    setIsOpenList(!isOpenList);

    if (blockFourElementRef.current !== null) {
		const distanceToTopScreenY = blockFourElementRef.current.getBoundingClientRect().top;

		if (deviceType === 'mobile' || widthViewport < 690) {
			const deltaPageYAndElementClientY = Math.abs(window.pageYOffset + distanceToTopScreenY);
			const widthHeaderElement = await new Promise(resolve => resolve(headerElement.getBoundingClientRect().height));
			window.scrollTo(0, deltaPageYAndElementClientY - widthHeaderElement);

			return;
		}

		if (distanceToTopScreenY >= 0) {
		  headerElement.hidden = true;
		  blockFourElementRef.current.scrollIntoView(true);

		  return;
		}

		dispatch(setIsLockScrollAction(true));
		document.addEventListener('scroll', fastPageScrollHandler);
		blockFourElementRef.current.scrollIntoView(true);
		// setTimeout(() => {dispatch(setIsLockScrollAction(false))}, TIMEOUT_VALUE);
    }
  };

  return (
    <article
      ref={blockFourElementRef}
      className={`${styles.block_four_ask_problem} ${widthViewport < 690 && `${styles.mobile_height}`} gradient_background padding_wrapper`}
      id="block_four_ask_problem"
    >
      <div className="container_wrapper">
        <h2 className="h2">С чем я могу вам помочь</h2>
	</div>
        <div className={`container_wrapper ${styles.block_wrapper}`}>
          <div ref={listWrapperRef} className={styles.problems_list_wrapper}>
            <ul
              ref={listElementRef}
              onClick={askProblemsListClickHandler}
              className={`${styles.problems_list} ${isOpenList
                ? `${styles.open_list}`
                : ""} ${deviceType === DeviceTypeList.Desktop
                ? `${styles.problems_list_hover}`
                : `${styles.problems_list_active}`}`}
            >
              <li
                data-item={askProblemsItems.Mood}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <img src={plusSvg} alt="Иконка плюс-крестик" />
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
                    <img src={plusSvg} alt="Иконка плюс-крестик" />
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
                    <img src={plusSvg} alt="Иконка плюс-крестик" />
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
                    <img src={plusSvg} alt="Иконка плюс-крестик" />
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
      <video
        src={currentVideo}
        className={`${styles.video_background} ${isOpenList
          ? `${styles.visible_video}`
          : `${styles.hidden_video}`}`}
        autoPlay
		muted
        loop
		playsInline
      />
    </article>
  );
}
