import React, { useState } from 'react';
import Client from './Client';

function App() {
	const [loadClient, setLoadClient] = useState(true);

	return (
		<div className='App'>
			<button onClick={() => setLoadClient((prevState) => !prevState)}>
				{loadClient ? 'Stop' : 'Start'}
			</button>
			{/* SOCKET IO CLIENT*/}
			{loadClient ? <Client /> : null}
			{/* <Client loadClient={loadClient} /> */}
		</div>
	);
}

export default App;
