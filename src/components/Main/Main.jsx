import React from "react";
import BlockFivePrice from "./Block-Five-Price/BlockFivePrice";
import BlockFourAskProblem from "./Block-Four-AskProblem/BlockFourAskProblem";
import BlockOnePromo from "./Block-One-Promo/BlockOnePromo";
import BlockSevenSignUp from "./Block-Seven-SignUp/BlockSevenSignUp";
import BlockSixReviews from "./Block-Six-Reviews/BlockSixReviews";
import BlockThreeTherapy from "./Block-Three-Therapy/BlockThreeTherapy";
import BlockTwoAboutMe from "./Block-Two-AboutMe/BlockTwoAboutMe";

import styles from "./Main.module.scss";

export default function Main() {
  return (
    <main className={styles.main}>
        <BlockOnePromo />
        <BlockTwoAboutMe />
        <BlockThreeTherapy />
        <BlockFourAskProblem />
        <BlockFivePrice />
        <BlockSixReviews />
        <BlockSevenSignUp />
    </main>
  );
}
