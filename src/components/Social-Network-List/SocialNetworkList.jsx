import React, { useEffect, useRef } from "react";

import styles from "./SocialNetworkList.module.scss";

import TelegramSvg from "../Social-Networks/TelegramSvg";
import VkSvg from "../Social-Networks/VkSvg";
import WhatsAppSvg from "../Social-Networks/WhatsAppSvg";

export default function SocialNetworkList({ width }) {
	const listRef = useRef(null);

	const linkClickHandler = (evt) => {
		evt.preventDefault();

		const href = evt.target.closest('a').href;
		window.open(href, '_blank');
		
		// eslint-disable-next-line no-undef
		console.log(VK.Goal('contact'));
	};

	useEffect(() => {
		listRef.current.style.gap = `${width}px`;
	}, [width]);

  return (
    <ul id="social_networks_list" ref={listRef} className={`${styles.social_networks_list} social_networks_list`}>
      <li className="social_networks_item">
        <a onClick={linkClickHandler} className="social_network_link" href="http://t.me/tochcasborki" target='_blank' rel="Переход в соцсеть">
          <TelegramSvg width={width} />
        </a>
      </li>
      <li className="social_networks_item">
        <a onClick={linkClickHandler} className="social_network_link" href="https://wa.me/79105708477?text=Здравствуйте%2C+у+меня+есть+вопрос" target='_blank' rel="Переход в соцсеть">
          <WhatsAppSvg width={width} />
        </a>
      </li>
      <li className="social_networks_item">
        <a onClick={linkClickHandler} className="social_network_link" href="http://vk.com/id32146093" target='_blank' rel="Переход в соцсеть">
          <VkSvg width={width} />
        </a>
      </li>
    </ul>
  );
}
