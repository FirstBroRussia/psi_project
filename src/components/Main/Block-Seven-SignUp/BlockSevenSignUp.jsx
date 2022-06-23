import Image from 'next/image'
import React from 'react'
import SocialNetworkList from '../../Social-Network-List/SocialNetworkList';

import mainImage from '../../../public/image/block-seven-sign-up/image.jpg';

export default function BlockSevenSignUp() {
  return (
    <article className='block_seven_sign_up'>
	<h2 className="h2">Записаться</h2>
	<div className="wrapper">
		<div className="content_wrapper">
			<h3 className="h3 content_heading">Для записи вы можете:</h3>
			<ul className="content_list">
				<li className="content_item">Выбрать удобный для вас мессенджер</li>
				<li className="content_item">В сообщении указать ваше имя и возраст</li>
				<li className="content_item">Описать проблему</li>
			</ul>
			<p className="correction_text">Вам ответят в ближайшее время</p>
			<SocialNetworkList width="60" />
		</div>
		<div className="content_image">
			<Image src={mainImage} alt="Изображение контента" />
		</div>
	</div>
	<video src="#" className="video_block"></video>
    </article>
  )
}
