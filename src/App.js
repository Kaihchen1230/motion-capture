import React, { useState } from 'react';
import Client from './Client';


function App() {
	const [loadWebCam, setLoadWebCam] = useState(true);
	const [stopStreaming, setStopStreaming] = useState(false);

	const handleStart = () => {
		setLoadWebCam(false);
		setStopStreaming(false);
	};

	const handleStopStreaming = () => {
		setStopStreaming((prevState) => !prevState);
		setLoadWebCam(true);
	};

	return (
		<div className='App'>
			{/* {loadWebCam ? (
				<button onClick={handleStart}>Start</button>
			) : (
				<button onClick={handleStopStreaming}>Stop</button>
				) } */}

			<button onClick={handleStopStreaming}>
				{!stopStreaming ? 'stop' : 'start'}
			</button>

			{/* <button onClick={handleStopStreaming}>Stop</button> */}

			{/* <button onClick={ handleClick }>start</button> */}

			{/* SOCKET IO CLIENT*/}
			{/* {loadClient ? <Client loadClient={loadClient} /> : null} */}
			{!stopStreaming ? <Client start={!loadWebCam} /> : null}
		</div>
	);
}

export default App;
