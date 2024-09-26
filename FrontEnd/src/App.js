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
		// <Router>
		// 	<Routes>
		// 		<Route
		// 			path="/"
		// 			element={<MyPage />}
		// 		/>
		// 		<Route
		// 			path="/details"
		// 			element={<DetailsPage />}
		// 		/>
		// 		<Route
		// 			path="/details"
		// 			element={<DetailsPage />}
		// 		/>
		// 		{/* <MyPage></MyPage> */}
		// 	</Routes>
		// </Router>
		<>
			<Router>
				<Routes>
					{/* Define which component to render for each path */}
					<Route path="/" element={<MyPage />} />           {/* Shows Home component for '/' */}
					<Route path="/details/:id" element={<DetailsPage />} />     {/* Shows About component for '/about' */}
				</Routes>
			</Router>
	</>

	);
}

export default App;
