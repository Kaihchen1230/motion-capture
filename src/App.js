import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import socketIOClient from 'socket.io-client';

function App() {
	const webCamRef = useRef(null);

	const [capturedImageUrl, setCapturedImageUrl] = useState([]);
	let myInterval;

	const videoConstraints = {
		facingMode: 'user',
	};

	const onStartCapture = () => {
		let imgLists = [];
		myInterval = setInterval(() => {
			const img = webCamRef.current.getScreenshot();

			setCapturedImageUrl((prevState) => [...prevState, img]);
			// imgLists.push(img);
			// console.log('this is list: ', imgLists);
		}, 900);
	};

	const onStopCapture = () => {
		clearInterval(myInterval);
		console.log('this is capture: ', capturedImageUrl);
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
				height={240}
				width={320}
				ref={webCamRef}
				screenshotFormat='image/jpeg'
				videoConstraints={videoConstraints}
			/>
			<ul>{imageArea}</ul>
			<button onClick={onStartCapture}>Start</button>
			<button onClick={onStopCapture}>Stop</button>
		</div>
	);
}

export default App;
