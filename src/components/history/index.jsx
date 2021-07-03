import React from 'react';
import HistoryCard from '../history-card';

export default function History({ historydata }) {
	return (
		<div>
			<ul>
				{historydata.map(history => (
					<HistoryCard history={history} />
				))}
			</ul>
		</div>
	);
}
