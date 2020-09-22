import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import Webcam from 'react-webcam';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import {
	CaretLeftFilled,
	CaretRightFilled,
	CaretUpFilled,
	CaretDownFilled,
} from '@ant-design/icons';
const ENDPOINT = 'http://localhost:5000';

const Client = (props) => {
	const webCamRef = useRef(null);
	const [screenshot, setScreenshot] = useState('');
	const [direction, setDirection] = useState(null);
	const videoConstraints = {
		facingMode: 'user',
	};

	// useEffect(() => {
	// 	console.log('this is useeff');
	// 	let socket = socketIOClient(ENDPOINT);

	// 	let myInterval = null;

	// 	socket.on('connect', () => {
	// 		myInterval = setInterval(() => {
	// 			let frame = webCamRef.current.getScreenshot();
	// 			// console.log('tis is frame: ', frame);
	// 			if (frame && frame.indexOf('data:image/jpeg') !== -1) {
	// 				frame = frame.replace(/^data:image\/jpeg;base64,/, '');
	// 				if (frame && frame !== '') {
	// 					// console.log(
	// 					// 	'this is res: ',
	// 					// 	screenshot,
	// 					// 	' and this is length: ',
	// 					// 	screenshot.length,
	// 					// );
	// 					console.log('this is props.start: ', props.start);
	// 					socket.emit('frame', {
	// 						b64: frame,
	// 						status: screenshot.length > 0,
	// 						width: 1080,
	// 						height: 1080,
	// 					});
	// 				}
	// 			}
	// 		}, 10000 / 40);
	// 	});

	// 	socket.on('response', function (res) {
	// 		console.log(res);
	// 		setScreenshot(`data:image/jpeg;base64,${res.b64}`);
	// 		setDirection(res.res);
	// 	});

	// 	return () => {
	// 		socket.disconnect();
	// 		clearInterval(myInterval);
	// 	};
	// }, [screenshot]);
	// console.log('this is screenshot.length before return: ', screenshot.length);
	return (
		<div>
			<p>{direction}</p>
			<Row>
				<Col span={24}>
					<CaretUpFilled
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							fontSize: '8em',
							height: '100%',
						}}
					/>
				</Col>
				<Col span={4}>
					<CaretLeftFilled
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							fontSize: '8em',
							height: '100%',
						}}
					/>
				</Col>
				<Col span={16}>
					<img src={screenshot} alt='' />
					<Webcam
						audio={false}
						height={screenshot.length > 0 ? 0 : '100%'}
						width={screenshot.length > 0 ? 0 : '100%'}
						ref={webCamRef}
						screenshotFormat='image/jpeg'
						videoConstraints={videoConstraints}
					/>
				</Col>
				<Col span={4}>
					<CaretRightFilled
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							fontSize: '8em',
							height: '100%',
						}}
					/>
				</Col>
				<Col span={24}>
					<CaretDownFilled
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							fontSize: '8em',
							height: '100%',
						}}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default Client;
