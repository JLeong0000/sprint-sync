import { Routes, Route } from "react-router-dom";
import ProjectView from "./pages/ProjectView";
import Home from "./pages/Home";
import Navbar from "./Navbar";

const App = () => {
	return (
		<div className="flex bg-[#efefef]">
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/:id"
					element={<ProjectView />}
				/>
			</Routes>
		</div>
	);
};

export default App;
