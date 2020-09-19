import React, { useState } from 'react';
import Client from './Client';

function App() {
	const [loadClient, setLoadClient] = useState(false);

	return (
		<div className='App'>
			<button onClick={() => setLoadClient((prevState) => !prevState)}>
				{loadClient ? 'Stop' : 'Start'}
			</button>
			{/* SOCKET IO CLIENT*/}
			{loadClient ? <Client loadClient={loadClient} /> : null}
			{/* <Client loadClient={loadClient} /> */}
		</div>
	);
}

export default App;
