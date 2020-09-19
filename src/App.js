import React, { useState } from 'react';
import Client from './Client';

function App() {
	const [loadClient, setLoadClient] = useState(true);
	const [start, setStart] = useState(false);

	const handleClick = () => {
		setLoadClient(!loadClient);
		setStart(!start);
	};

	return (
		<div className='App'>
			<button onClick={handleClick}>start</button>
			{/* SOCKET IO CLIENT*/}
			{/* {loadClient ? <Client loadClient={loadClient} /> : null} */}
			<Client start={start} />
		</div>
	);
}

export default App;
