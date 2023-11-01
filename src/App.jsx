import { Routes, Route } from "react-router-dom";
import ProjectView from "./pages/project/ProjectView";
import Home from "./pages/Home";
import Navbar from "./Navbar";
import TeamView from "./pages/member/TeamView";

const App = () => {
	return (
		<div className="bg-[#efefef] sm:flex">
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/project/:id"
					element={<ProjectView />}
				/>
				<Route
					path="/member/:id"
					element={<TeamView />}
				/>
			</Routes>
		</div>
	);
};

export default App;
