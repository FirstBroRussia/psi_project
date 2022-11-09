import React, {useLayoutEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux';

import styles from './Navbar.module.scss';

import {NavBarLinkAndScroll} from './navlink_scroll/NavBarLinkAndScroll';
import {DeviceTypeList} from '../../../utils/utils';
import { setIsOpenMobileMenuAction } from '../../../store/reducer';


let NavBarLinkAndScrollClass = null;

export default function Navbar({navbarType}) {
	const navBarRef = useRef(null);

	const deviceType = useSelector((state) => state.reducer.typeUserDevice);

	useLayoutEffect(() => {
		if (!NavBarLinkAndScrollClass) {
			NavBarLinkAndScrollClass = new NavBarLinkAndScroll(navBarRef.current, 'nav_link', {fadingHeader: false, navbarType: navbarType || null});
		}
		if (NavBarLinkAndScrollClass) {
			NavBarLinkAndScrollClass.setNavbarType(navbarType);
		}
	}, [navbarType]);

  return (
    <nav ref={navBarRef} className={styles.navigation_menu}>
	<ul className={`${navbarType === 'mobile' ? styles.navigation_list_mobile : styles.navigation_list} ${deviceType === DeviceTypeList.Desktop ? `${styles.navigation_list_hover}` : `${styles.navigation_list_active}`}`}>
		<li className={styles.navigation_item}><a href="#block_two_about_me" className={`p_navlink nav_link ${styles.nav_link}`}>Обо мне</a></li>
		<li className={styles.navigation_item}><a href="#block_four_ask_problem" className={`p_navlink nav_link ${styles.nav_link}`}>Помощь</a></li>
		<li className={styles.navigation_item}><a href="#block_five_services" className={`p_navlink nav_link ${styles.nav_link}`}>Услуги</a></li>
		<li className={styles.navigation_item}><a href="#block_six_reviews" className={`p_navlink nav_link ${styles.nav_link}`}>Отзывы</a></li>
		<li className={styles.navigation_item}><a href="#block_seven_sign_up" className={`p_navlink nav_link ${styles.nav_link}`}>Записаться</a></li>
	</ul>
    </nav>
  )
}
