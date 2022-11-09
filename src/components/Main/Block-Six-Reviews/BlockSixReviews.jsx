import React, { useRef, useEffect } from "react";

import styles from "./BlockSixReviews.module.scss";

import Swiper from "../../../utils/Swiper/Swiper.js";

const imageObj = {
	image_1: require("../../../content/image/block-six-reviews/reviews/1-full.jpg"),
	image_2: require("../../../content/image/block-six-reviews/reviews/2-full.jpg"),
	image_3: require("../../../content/image/block-six-reviews/reviews/3-full.jpg"),
	image_4: require("../../../content/image/block-six-reviews/reviews/4-full.jpg")
};

const imageArray = [
	require("../../../content/image/block-six-reviews/reviews/1-full.jpg"),
	require("../../../content/image/block-six-reviews/reviews/2-full.jpg"),
	require("../../../content/image/block-six-reviews/reviews/3-full.jpg"),
	require("../../../content/image/block-six-reviews/reviews/4-full.jpg")
];


let SwiperClass = null;

export default function BlockSixReviews() {
  const swiperElementRef = useRef(null);

  useEffect(() => {
	if (!SwiperClass) {
		SwiperClass = new Swiper(swiperElementRef.current, imageObj);
	} else {
		SwiperClass.rerender(swiperElementRef.current);
	}
  }, []);

  return (
    <article className={`${styles.block_six_reviews} gradient_background padding_wrapper`} id='block_six_reviews'>
      <div className={`${styles.block_wrapper}`}>
        <div className="container_wrapper">
          <h2 className="h2">Отзывы</h2>
        </div>
        <div ref={swiperElementRef} className={styles.reviews_swiper_wrapper}></div>
      </div>
    </article>
  );
}
