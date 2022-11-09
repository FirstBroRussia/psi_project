import { useRef, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { setFirstBlockVideoAction } from '../../../store/reducer';

import styles from './BlockOnePromo.module.scss';

const video = require('../../../content/video/main-video.mp4');

export default function VideoPromo() {
	const videoRef = useRef(null);
	const dispatch = useDispatch();
	  
	useEffect(() => {
		if (videoRef.current !== null) {
			dispatch(setFirstBlockVideoAction(videoRef.current));
		}
	}, [dispatch, videoRef]);
  return (
	<video ref={videoRef} className={styles.video_background} autoPlay muted loop preload="auto" playsInline>
		<source src={video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
    </video>
  )
}
