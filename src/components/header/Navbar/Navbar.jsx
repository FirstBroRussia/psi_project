import React, {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux';

import styles from './Navbar.module.scss';

import {NavBarLinkAndScroll} from './navlink_scroll/NavBarLinkAndScroll';
import {DeviceTypeList} from '../../../utils/utils';

let init = false;
let initNavBarLinkAndScroll = false;

export default function Navbar() {
	const dispatch = useDispatch();
	const navBarRef = useRef(null);

	const deviceType = useSelector((state) => state.reducer.typeUserDevice);
	const headerElement = useSelector((state) => state.reducer.headerElement);

	useEffect(() => {
		if (headerElement) {
			if (!initNavBarLinkAndScroll) {
				new NavBarLinkAndScroll(navBarRef.current, 'nav_link', headerElement, {fadingHeader: true,});
				initNavBarLinkAndScroll = true;
			}
		}
	}, [headerElement]);

  return (
    <nav ref={navBarRef} className={styles.navigation_menu}>
	<ul className={`${styles.navigation_list} ${deviceType === DeviceTypeList.Desktop ? `${styles.navigation_list_hover}` : `${styles.navigation_list_active}`}`}>
		<li className={styles.navigation_item}><a href="#block_two_about_me" className="nav_link">Обо мне</a></li>
		<li className={styles.navigation_item}><a href="#block_three_therapy" className="nav_link">Терапия</a></li>
		<li className={styles.navigation_item}><a href="#block_five_services" className="nav_link">Услуги</a></li>
		<li className={styles.navigation_item}><a href="#block_six_reviews" className="nav_link">Отзывы</a></li>
		<li className={styles.navigation_item}><a href="#block_seven_sign_up" className="nav_link">Записаться</a></li>
	</ul>
    </nav>
  )
}
