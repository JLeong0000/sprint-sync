import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
	const navigate = useNavigate();

	return (
		<button
			onClick={() => navigate(-1)}
			className="font-opensans font-semibold bg-green-400 px-10 py-2 rounded-md hover:bg-green-500 active:bg-green-600 active:text-white"
		>
			BACK
		</button>
	);
};

export default BackButton;
