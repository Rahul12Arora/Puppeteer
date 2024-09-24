import logo from "./logo.svg";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./App.css";
import MyPage from "./components/page";
import DetailsPage from "./components/DetailsPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<MyPage />}
				/>
				<Route
					path="/details"
					element={<DetailsPage />}
				/>
				{/* <MyPage></MyPage> */}
			</Routes>
		</Router>
	);
}

export default App;
