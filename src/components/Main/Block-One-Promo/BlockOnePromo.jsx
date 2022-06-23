import Image from "next/image";
import arrowDown from "../../../public/image/block-one-promo/arrow-down.svg";

import styles from "./BlockOnePromo.module.scss";
import VideoPromo from "./VideoPromo";

export default function BlockOnePromo() {
  return (
    <article className={styles.block_one_promo}>
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
          <a className={styles.arrow_link} href="#">
            <Image src={arrowDown} alt="Стрелка вниз" />
          </a>
        </div>
      </div>
      <VideoPromo />
    </article>
  );
}
