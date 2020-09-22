import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import Client from './Client';

import 'antd/dist/antd.css';
import './App.css';

function App() {
	const [stopStreaming, setStopStreaming] = useState(false);

	const webcamOff = (
		<div>
			<center>
				<span id='Number'>Webcam is off</span>
			</center>
		</div>
	);

	return (
		<div className='App'>
			<Row type='flex' align='middle' style={{ paddingTop: '20px' }}>
				<Col
					span={24}
					style={{
						display: 'inline-flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Button
						type='primary'
						onClick={() => {
							setStopStreaming((prevState) => !prevState);
						}}>
						{!stopStreaming ? 'stop' : 'start'}
					</Button>
				</Col>
			</Row>

			{!stopStreaming ? <Client /> : webcamOff}
		</div>
	);
}

export default App;
