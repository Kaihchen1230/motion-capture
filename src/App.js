import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import socketIOClient from 'socket.io-client';

const UseInterval = (handler, interval) => {
	const [intervalId, setIntervalId] = useState();
	useEffect(() => {
		const id = setInterval(handler, interval);
		setIntervalId(id);
		return () => clearInterval(id);
	}, []);
	return () => clearInterval(intervalId);
};

function App() {
	const webCamRef = useRef(null);

	const [capturedImageUrl, setCapturedImageUrl] = useState([]);
	const [intervalId, setIntervalId] = useState();

	let socket = socketIOClient('https://6c627a9603e5.ngrok.io');

	const videoConstraints = {
		facingMode: 'user',
	};

	const onStartCapture = () => {
		socket.on('connect', onConnect);
	};

	const onStopCapture = () => {
		socket.off('connect', onConnect);
		// setSocket(null);
	};

	const onConnect = () => {
		console.log('this is socket: ', socket);

		let myInterval = setInterval(() => {
			let frame = webCamRef.current.getScreenshot();

			if (frame && frame.indexOf('data:image/jpeg') !== -1) {
				frame = frame.replace(/^data:image\/jpeg;base64,/, '');
				if (frame && frame !== '') {
					socket.emit('frame', {
						b64: frame,
						status: true,
					});
				}
			}
			console.log('this is frame: ');
		}, 100);
	};

	const imageArea = capturedImageUrl.map((imgUrl) => {
		return (
			<li key={imgUrl}>
				<img src={imgUrl} alt='' />
			</li>
		);
	});

	return (
		<div className='App'>
			<Webcam
				audio={false}
				height={1080}
				width={1920}
				ref={webCamRef}
				screenshotFormat='image/jpeg'
				videoConstraints={videoConstraints}
			/>
			<button onClick={onStopCapture}>Stop</button>
			<ul>{imageArea}</ul>
			<button onClick={onStartCapture}>Start</button>
		</div>
	);
}

export default App;
