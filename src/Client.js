import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import Webcam from 'react-webcam';
const ENDPOINT = 'https://b8e040a28c69.ngrok.io';

const Client = (props) => {
	const webCamRef = useRef(null);
	const [response, setResponse] = useState('');
	const [firstTime, setFirstTime] = useState(false);
	const videoConstraints = {
		facingMode: 'user',
	};

	useEffect(() => {
		console.log('this is useeff');
		let socket = socketIOClient(ENDPOINT);

		let myInterval = null;

		socket.on('connect', () => {
			myInterval = setInterval(() => {
				let frame = webCamRef.current.getScreenshot();
				// console.log('tis is frame: ', frame);
				if (frame && frame.indexOf('data:image/jpeg') !== -1) {
					frame = frame.replace(/^data:image\/jpeg;base64,/, '');
					if (frame && frame !== '') {
						console.log('this is first time: ', firstTime);
						socket.emit('frame', {
							b64: frame,
							status: firstTime,
							width: 1080,
							height: 1080,
						});
					}
				}
			}, 100);
		});
		setFirstTime(true);
		console.log('this is first time outside: ', firstTime);
		socket.on('response', function (res) {
			console.log(res);
			setResponse(`data:image/jpeg;base64,${res.b64}`);
		});

		// console.log('this is socket in else: ', socket);
		return () => {
			socket.disconnect();
			clearInterval(myInterval);
		};
	}, [props]);

	console.log('render');
	return (
		<div>
			<img src={response} alt='' />
			<Webcam
				audio={false}
				height={1080}
				width={1080}
				ref={webCamRef}
				screenshotFormat='image/jpeg'
				videoConstraints={videoConstraints}
			/>
		</div>
	);
};

export default Client;
