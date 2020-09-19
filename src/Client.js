import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import Webcam from 'react-webcam';
const ENDPOINT = 'https://6c627a9603e5.ngrok.io';

const Client = (props) => {
	const webCamRef = useRef(null);

	const [response, setResponse] = useState('');
	const videoConstraints = {
		facingMode: 'user',
	};

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		let myInterval = null;

		socket.on('connect', () => {
			myInterval = setInterval(() => {
				console.log('here');
				let frame = webCamRef.current.getScreenshot();
				if (frame && frame.indexOf('data:image/jpeg') !== -1) {
					frame = frame.replace(/^data:image\/jpeg;base64,/, '');
					if (frame && frame !== '') {
						socket.emit('frame', {
							b64: frame,
							status: true,
							width: 1080,
							height: 1080,
						});
					}
				}
			}, 100);
		});

		socket.on('response', (res) => {
			console.log('this is response: ', res);
		});

		return () => {
			socket.disconnect();
			clearInterval(myInterval);
		};
	}, []);

	return (
		<Webcam
			audio={false}
			height={1080}
			width={1080}
			ref={webCamRef}
			screenshotFormat='image/jpeg'
			videoConstraints={videoConstraints}
		/>
	);
};

export default Client;
