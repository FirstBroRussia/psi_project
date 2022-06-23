import Image from 'next/image';
import React from 'react'
import sandwichDefault from '../../../public/image/sandwich/sandwich-default.svg';
import sandwichOpen from '../../../public/image/sandwich/sandwich-open.svg';

import styles from './Sandwich.module.scss';

export default function Sandwich() {
  return (
    <Image src={sandwichDefault} alt="Сендвич-меню"/>
  )

  return (
    <Image src={sandwichOpen} alt="Открытое сендвич-меню"/>
  );
}
