import { useRef, useEffect } from 'react';
import styles from './BlockOnePromo.module.scss';

const video = require('../../../public/video/main-video.mp4');

export default function VideoPromo() {
	const videoRef = useRef(null);
	  
	useEffect(() => {
		const videoElement = videoRef.current;
		videoElement.play();
	}, [videoRef]);
  return (
	<video ref={videoRef} className={styles.video_background} autoPlay loop>
	<source src={video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
      </video>
  )
}
