import React from 'react'
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.navigation_menu}>
	<ul className={styles.navigation_list}>
		<li className={styles.navigation_item}><a href="#" className="item_link">Обо мне</a></li>
		<li className={styles.navigation_item}><a href="#" className="item_link">Терапия</a></li>
		<li className={styles.navigation_item}><a href="#" className="item_link">Услуги</a></li>
		<li className={styles.navigation_item}><a href="#" className="item_link">Отзывы</a></li>
		<li className={styles.navigation_item}><a href="#" className="item_link">Записаться</a></li>
	</ul>
    </nav>
  )
}
