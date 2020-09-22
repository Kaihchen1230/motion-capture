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

	useEffect(() => {
		let socket = socketIOClient(ENDPOINT);

		let myInterval = null;

		socket.on('connect', () => {
			myInterval = setInterval(() => {
				let frame = webCamRef.current.getScreenshot();
				if (frame && frame.indexOf('data:image/jpeg') !== -1) {
					frame = frame.replace(/^data:image\/jpeg;base64,/, '');
					if (frame && frame !== '') {
						socket.emit('frame', {
							b64: frame,
							status: screenshot.length > 0,
							width: 1080,
							height: 1080,
						});
					}
				}
			}, 10000 / 40);
		});

		socket.on('response', function (res) {
			console.log(res);
			setScreenshot(`data:image/jpeg;base64,${res.b64}`);
			setDirection(res.res);
		});

		return () => {
			socket.disconnect();
			clearInterval(myInterval);
		};
	}, [screenshot]);
	return (
		<div>
			<Row>
				<Col span={6} />
				<Col span={12}>
					<CaretUpFilled
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							fontSize: '8em',
							height: '100%',
							color:
								direction === 'up' ? 'rgb(17 193 37)' : 'rgba(0, 0, 0, 0.85)',
						}}
					/>
				</Col>
				<Col span={6} />
				<Col span={4} />
				<Col span={2}>
					<CaretLeftFilled
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							fontSize: '8em',
							height: '100%',
							color:
								direction === 'left' ? 'rgb(17 193 37)' : 'rgba(0, 0, 0, 0.85)',
						}}
					/>
				</Col>
				<Col span={12}>
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
				<Col span={2}>
					<CaretRightFilled
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							fontSize: '8em',
							height: '100%',
							color:
								direction === 'right'
									? 'rgb(17 193 37)'
									: 'rgba(0, 0, 0, 0.85)',
						}}
					/>
				</Col>
				<Col span={4} />
				<Col span={6} />
				<Col span={12}>
					<CaretDownFilled
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							fontSize: '8em',
							height: '100%',
							color:
								direction === 'down' ? 'rgb(17 193 37)' : 'rgba(0, 0, 0, 0.85)',
						}}
					/>
				</Col>
				<Col span={6} />
			</Row>
			<Row type='flex' align='middle'>
				<Col
					span={24}
					style={{
						display: 'inline-flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<p>
						Captured Finger Direction:{' '}
						<span style={{ color: 'rgb(253 22 22)', fontWeight: 'bolder' }}>
							{direction}
						</span>
					</p>
				</Col>
			</Row>
		</div>
	);
};

export default Client;
