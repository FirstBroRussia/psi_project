import React from "react";

import styles from "./Main.module.scss";

import BlockOnePromo from "./Block-One-Promo/BlockOnePromo";
import BlockTwoAboutMe from "./Block-Two-AboutMe/BlockTwoAboutMe";
import BlockThreeTherapy from "./Block-Three-Therapy/BlockThreeTherapy";
import BlockFourAskProblem from "./Block-Four-AskProblem/BlockFourAskProblem";
import BlockFivePrice from "./Block-Five-Price/BlockFivePrice";
import BlockSixReviews from "./Block-Six-Reviews/BlockSixReviews";
import BlockSevenSignUp from "./Block-Seven-SignUp/BlockSevenSignUp";

export default function Main() {
  return (
    <main 
      className={styles.main}>
        <BlockOnePromo />
        <BlockTwoAboutMe />
        <BlockFourAskProblem />
        {/* <BlockThreeTherapy /> */}
        <BlockFivePrice />
        <BlockSixReviews />
        <BlockSevenSignUp />
    </main>
  );
}
