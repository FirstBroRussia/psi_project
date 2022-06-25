import arrowDown from "../../../content/image/block-one-promo/arrow-down.svg";

import styles from "./BlockOnePromo.module.scss";
import VideoPromo from "./VideoPromo";

export default function BlockOnePromo() {
	const arrowClickHandler = (evt) => {
		const anchorHref = evt.target.closest('a').href;
		const elementId = anchorHref.slice(anchorHref.indexOf('/#') + 2);
		const element = document.querySelector(`#${elementId}`);
		element.scrollIntoView(true);
	};
	
  return (
    <article className={styles.block_one_promo} id='block-1'>
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
          <a onClick={arrowClickHandler} className={styles.arrow_link} href="#block_two_about_me">
            <img src={arrowDown} alt="Стрелка вниз" />
          </a>
        </div>
      </div>
      <VideoPromo />
    </article>
  );
}
