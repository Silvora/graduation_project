import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoute } from "./static/AdminRouter";

import Home from "./views/Home";
import Login from "./views/Login";
import Admin from "./views/Admin";
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/admin" element={<Admin />}>
				<Route index path="" element={<Home />}></Route>

					{adminRoute.map((item, index) => {
						return (
							<Route
								path={item.path}
								element={item.component}
								key={index}
							></Route>
						);
					})}

				</Route>
				<Route path="/" element={<Navigate replace to="/login" />} />
			</Routes>
		</div>
	);
}

export default App;
