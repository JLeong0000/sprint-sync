import { Routes, Route } from "react-router-dom";
import ProjectPage from "./pages/project/ProjectPage";
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
					element={<ProjectPage />}
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
