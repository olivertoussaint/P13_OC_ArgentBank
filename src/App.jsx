import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@home';
import Login from '@login';
import Profile from '@profile';
import Error from '@error';
import './App.css';
import Header from '@layout/Header';
import Footer from '@layout/Footer';
import PrivateRoute from './components/privateRoute';
import Transactions from './containers/Transactions';

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/profile"
						element={<PrivateRoute element={<Profile />} />}
					/>
					<Route
          path="/transactions/:accountId" 
          element={<PrivateRoute element={<Transactions />} />} 
        />
	
					<Route path="*" element={<Error />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
