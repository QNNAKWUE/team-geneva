import React from 'react';
import HistoryCard from '../history-card';

export default function History({ historydata }) {
	return (
		<div>
			<ul className='ul'>
				<h5>History</h5>
				{historydata.map(history => (
					<HistoryCard history={history} />
				))}
			</ul>
		</div>
	);
}
