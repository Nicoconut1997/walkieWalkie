// walkieWalkie - Dog walking events application with responsive routing
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { DogWalks } from './pages/DogWalks';
import { DogProfile } from './pages/DogProfile';
import { CreateEvent } from './pages/CreateEvent';

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
						<Route path='/profile' element={<DogProfile />} />
						<Route path='/create-event' element={<CreateEvent />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
