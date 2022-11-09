import { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setBlockOneRefAction } from "../../../store/reducer";

import styles from "./BlockOnePromo.module.scss";

import { ONE_VALUE } from "../../../utils/utils";

import VideoPromo from "./VideoPromo";

export default function BlockOnePromo() {
  const [ratioValue, setRatioValue] = useState(ONE_VALUE);
  const widthViewport = useSelector(state => state.reducer.widthViewport);
  const headerElement = useSelector(state => state.reducer.headerElement);
  const blockRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(setBlockOneRefAction(blockRef.current));
    },
    [blockRef]
  );

  const anchorLinkClickHandler = useCallback(
    async evt => {
      evt.preventDefault();

      if (!headerElement) {
        return;
      }

      const anchorHref = evt.target.closest("a").getAttribute("href");
      const elementById = document.querySelector(`${anchorHref}`);

      const distanceToTopScreenY = elementById.getBoundingClientRect().top;
      const deltaPageYAndElementClientY = Math.abs(
        window.pageYOffset + distanceToTopScreenY
      );

      headerElement.hidden && (headerElement.hidden = false);
      const heightHeaderElement = await new Promise(resolve =>
        setTimeout(
          () => resolve(headerElement.getBoundingClientRect().height),
          0
        )
      );

      if (widthViewport < 690) {
        window.scrollTo(0, deltaPageYAndElementClientY - heightHeaderElement);
        return;
      }

      window.scrollTo(0, deltaPageYAndElementClientY);
    },
    [headerElement, widthViewport]
  );

  if (widthViewport >= 1160 && ratioValue !== 1) {
    setRatioValue(1);
  } else if (
    widthViewport < 1159 &&
    widthViewport >= 690 &&
    ratioValue !== 0.7
  ) {
    setRatioValue(0.7);
  } else if (
    widthViewport < 690 &&
    widthViewport >= 590 &&
    ratioValue !== 0.8
  ) {
    setRatioValue(0.8);
  } else if (
    widthViewport < 590 &&
    widthViewport >= 490 &&
    ratioValue !== 0.6
  ) {
    setRatioValue(0.6);
  } else if (widthViewport < 490 && ratioValue !== 0.4) {
    setRatioValue(0.4);
  }

  return (
    <article ref={blockRef} className={styles.block_one_promo} id="block-1">
      <div className="container-wrapper">
        <h1 className="h1 display_none">Анастасия Судакова — Психолог</h1>
        <p className={styles.description}>
          «Большая часть того, что реально внутри нас,<br />
          — не осознается, а то, что осознается,<br />
          — нереально»
          <br />
          <br />
          Зигмунд Фрейд
        </p>
        <div className={styles.arrow_wrapper}>
          <a
            onClick={anchorLinkClickHandler}
            className={styles.arrow_link}
            href="#block_two_about_me"
          >
            <svg
              width={`${175 * ratioValue}`}
              height={`${77 * ratioValue}`}
              viewBox={`0 0 175 77`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 4.94916L2.76757 0.172798L88.6793 70.4757C89.859 71.441 90.1958 73.2929 89.4316 74.6118V74.6118C88.6673 75.9308 87.0914 76.2174 85.9117 75.252L0 4.94916Z"
                fill="white"
              />
              <path
                d="M172.232 0L175 4.77636L89.0883 75.0792C87.9086 76.0446 86.3327 75.758 85.5684 74.439V74.439C84.8042 73.1201 85.141 71.2683 86.3207 70.3029L172.232 0Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
      </div>
      <VideoPromo />
    </article>
  );
}
