// walkieWalkie - Dog walking events application with responsive routing
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { DogWalks } from './pages/DogWalks';
import { DogProfile } from './pages/DogProfile';
import { CreateEvent } from './pages/CreateEvent';
import { RoutesSuggestion } from './pages/RoutesSuggestion';
import { PlaceDetail } from './pages/PlaceDetail';
import { WalkingHistory } from './pages/WalkingHistory';
import { FavoriteWalks } from './pages/FavoriteWalks';
import { MyWalks } from './pages/MyWalks';
import { EventDetails } from './pages/EventDetails';
import { ClinicPartnership } from './pages/ClinicPartnership';

function App() {
	return (
		<Router>
			<div className='min-h-screen flex flex-col'>
				{/* Navigation */}
				<Navigation />

				{/* Main Content */}
				<main className='flex-1'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/walks' element={<DogWalks />} />
						<Route path='/my-walks' element={<MyWalks />} />
						<Route path='/favorites' element={<FavoriteWalks />} />
						<Route path='/routes' element={<RoutesSuggestion />} />
						<Route path='/place-detail/:placeId' element={<PlaceDetail />} />
						<Route path='/walking-history' element={<WalkingHistory />} />
						<Route path='/profile' element={<DogProfile />} />
						<Route path='/create-event' element={<CreateEvent />} />
						<Route path='/event/:id' element={<EventDetails />} />
						<Route path='/clinic-partnership' element={<ClinicPartnership />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
