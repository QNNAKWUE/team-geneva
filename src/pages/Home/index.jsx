import { useReducer } from 'react';
import History from '../../components/history';
import { getWeatherData } from '../../services/weatherapi';
import { ScaleLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css';

const reducer = (state, action) => {
	const stateCopy = { ...state };

	if (action.type === 'SET_LOCATION') {
		stateCopy.city = action.payload;
	}
	if (action.type === 'SET_WEATHER') {
		stateCopy.weatherdata = action.payload;
		stateCopy.history = [action.payload, ...stateCopy.history];
		stateCopy.loading = false;
	}
	if (action.type === 'START_REQUEST') {
		stateCopy.loading = true;
	}
	if (action.type === 'END_REQUEST') {
		stateCopy.loading = false;
	}
	return stateCopy;
};

const initialState = {
	history: [],
	loading: false,
	weatherdata: null,
	city: 'Nigeria',
};

function Home() {
	const [appState, dispatchAction] = useReducer(reducer, initialState);

	const getData = async () => {
		try {
			dispatchAction({
				type: 'START_REQUEST',
			});
			const data = await getWeatherData(appState.city);
			dispatchAction({
				type: 'SET_WEATHER',
				payload: data,
			});
		} catch (error) {
			console.log({ err: error.message });
			dispatchAction({ type: 'END_REQUEST' });
			if (error.message.includes('404'))
				toast.error(
					`Could not get weather information for ${appState.city}. Location not found`,
				);
		}
	};

	return (
		<section>
			<ToastContainer />
			<div>
				<h1 className="weather">Weather App</h1>
				<div className="input-button">
					<input
						className="input-field"
						type="text"
						value={appState.city}
						onChange={e =>
							dispatchAction({
								type: 'SET_LOCATION',
								payload: e.target.value,
							})
						}
						placeholder="Enter your location"
					/>

					<button type="button" onClick={() => getData()}>
						Search
					</button>
				</div>
				{appState.loading ? (
					<div>
						<ScaleLoader loading={appState.loading} />
					</div>
				) : (
					<>
						{appState.weatherdata !== null ? (
							<span>
								{
									<h4 className="weather1">
										Live Weather Condition
									</h4>
								}
								<div className="name-date">
									<h2>
										<i className="fa fa-street-view"></i>
										{appState.weatherdata.name} |{' '}
										{appState.weatherdata.sys.country}
									</h2>

									<h3>{new Date().toString()}</h3>
								</div>

								<div className="others">
									<img
										src={`http://openweathermap.org/img/w/${appState.weatherdata.weather[0].icon}.png`}
										alt="imgicon"
									/>

									<h3>
										{parseFloat(
											appState.weatherdata.main.temp -
												273.15,
										).toFixed(1)}
										&deg;C |{' '}
										{appState.weatherdata.weather[0].main}
									</h3>
									<h4>
										Min:{' '}
										{parseFloat(
											appState.weatherdata.main.temp_min -
												273.15,
										).toFixed(1)}
										&deg;C || Max:{' '}
										{parseFloat(
											appState.weatherdata.main.temp_max -
												273.15,
										).toFixed(1)}
										&deg;C || Humidity:{' '}
										{appState.weatherdata.main.humidity}%
									</h4>
								</div>
							</span>
						) : null}

						<History historydata={appState.history} />
					</>
				)}
			</div>
		</section>
	);
}

export default Home;
