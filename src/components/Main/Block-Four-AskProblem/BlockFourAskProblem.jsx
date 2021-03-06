import React, {useState, useRef} from "react";
import {useSelector} from 'react-redux';

import styles from "./BlockFourAskProblem.module.scss";

import plusSvg from "../../../content/image/block-four-ask-problem/plus-icon.svg";
import { DeviceTypeList } from "../../../utils/utils";

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
  targetVideoHorizontal: require('../../../content/video/help-block/target-video/compress/target-horizontal.mp4'),
  targetVideoVertical: require('../../../content/video/help-block/target-video/compress/target-vertical.mp4'),
  behaviorVideoHorizontal: require('../../../content/video/help-block/behavior-video/compress/behavior-horizontal.mp4'),
  behaviorVideoVertical: require('../../../content/video/help-block/behavior-video/compress/behavior-vertical.mp4'),
  otherVideoHorizontal: require('../../../content/video/help-block/other-video/compress/other-horizontal.mp4'),
  otherVideoVertical: require('../../../content/video/help-block/other-video/compress/other-vertical.mp4'),
};

export default function BlockFourAskProblem() {
  const deviceType = useSelector((state) => state.reducer.typeUserDevice);
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
    <article className={`${styles.block_four_ask_problem} gradient_background padding_wrapper`}>
        <div className={`${styles.block_wrapper} container_wrapper`}>
          <h2 className="h2">?? ?????? ?? ???????? ?????? ????????????</h2>
          <div ref={listWrapperRef} className={styles.problems_list_wrapper}>
            <ul
	      ref={listElementRef}
              onClick={askProblemsListClickHandler}
              className={`${styles.problems_list} ${isOpenList ? `${styles.open_list}` : ''} ${deviceType === DeviceTypeList.Desktop ? `${styles.problems_list_hover}` : `${styles.problems_list_active}`}`}
            >
              <li
                data-item={askProblemsItems.Mood}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <img src={plusSvg} alt="???????????? ????????-??????????????" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    ???????????????? ?? ??????????????????????
                  </h3>
                </div>
                <ul className={`${styles.item_description_list} `}> 
                  <li className={styles.description_list_item}>
                    ???????????????????? ???????????????? ????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????? ???????????????????? ?? ?????????????? ??????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????????????????? ??????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????????????? ??????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????????? ??????????, ?????????????????? ?? ?????????????????? ?? ????????????????
                  </li>
                </ul>
              </li>
              <li
                data-item={askProblemsItems.Target}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <img src={plusSvg} alt="???????????? ????????-??????????????" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    ?????????????????? ???????????????????? ?? ???????????????????? ??????????
                  </h3>
                </div>
                <ul className={`${styles.item_description_list}`}>
                  <li className={styles.description_list_item}>
                    ?????? ??????????????????, ????????????, ?????????????? ??????????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????? ????????????????????????????, ????????????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????????????????????? ??????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????????????????? ??????????????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????? ???????????? ??????????????????????????
                  </li>
                </ul>
              </li>
              <li
                data-item={askProblemsItems.Behavior}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <img src={plusSvg} alt="???????????? ????????-??????????????" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    ?????????????????????????? ??????????????????
                  </h3>
                </div>
                <ul className={`${styles.item_description_list}`}>
                  <li className={styles.description_list_item}>
                    ???????????? ?????????? ??????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????????????? ????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????? ????????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????? ?????????? ???????????????????????????? ??????????????????
                  </li>
                </ul>
              </li>
              <li
                data-item={askProblemsItems.Other}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <img src={plusSvg} alt="???????????? ????????-??????????????" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    ???????????? ????????????????
                  </h3>
                </div>
                <ul className={`${styles.item_description_list}`}>
                  <li className={styles.description_list_item}>
                    ???????????????????????? ????????????????????, ?????????????????????????? ?? ????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????????? ?????????????????? ?? ???????????????? ????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????? ??????????????
                  </li>
                  <li className={styles.description_list_item}>??????????</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      <video src={currentVideo} className={`${styles.video_background} ${isOpenList ? `${styles.visible_video}` : `${styles.hidden_video}`}`} autoPlay loop />
    </article>
  );
}
