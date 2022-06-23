import React from 'react'
import TelegramSvg from '../Social-Networks/TelegramSvg'
import VkSvg from '../Social-Networks/VkSvg'
import WhatsAppSvg from '../Social-Networks/WhatsAppSvg'

export default function SocialNetworkList({width}) {
  return (
	<ul className="social_networks_list">
	<li className="social_networks_item">
		<a href="#" className="social_network_link"><TelegramSvg width={width} /></a>
	</li>
	<li className="social_networks_item">
		<a href="#" className="social_network_link"><WhatsAppSvg width={width} /></a>
	</li>
	<li className="social_networks_item">
		<a href="#" className="social_network_link"><VkSvg width={width} /></a>
	</li>
</ul>
  )
}
