import React, {useRef, useEffect} from "react";
import Swiper from "./slider/swiper";

import styles from "./BlockSixReviews.module.scss";

const imageObj = {
	image_1: require('../../../public/image/block-six-reviews/reviews/1-full.jpg'),
	image_2: require('../../../public/image/block-six-reviews/reviews/2-full.jpg'),
	image_3: require('../../../public/image/block-six-reviews/reviews/3-full.jpg'),
	image_4: require('../../../public/image/block-six-reviews/reviews/4-full.jpg'),
};

const imageArray = [
	require('../../../public/image/block-six-reviews/reviews/1-full.jpg'),
	require('../../../public/image/block-six-reviews/reviews/2-full.jpg'),
	require('../../../public/image/block-six-reviews/reviews/3-full.jpg'),
	require('../../../public/image/block-six-reviews/reviews/4-full.jpg'),
];

export default function BlockSixReviews() {
	const swiperElementRef = useRef(null);

	useEffect(() => {
		new Swiper(swiperElementRef.current, imageObj, {nextjs: true});
	}, []);

  return (
    <article className={`gradient_background ${styles.block_six_reviews}`}>
      <div className="container_wrapper padding_wrapper">
        <div className={styles.block_wrapper}>
          <h2 className="h2">Отзывы</h2>
          <div className={styles.reviews_swiper_wrapper}>
	    <div ref={swiperElementRef} className={styles.reviews_swiper}></div>
	  </div>
        </div>
      </div>
    </article>
  );
}
