import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Chat from "./pages/chat";
import Room from "./pages/room";

const Index = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Login />} />
				<Route path="/signup" exact element={<SignUp />} />
				<Route path="/chat" exact element={<Chat />} />
				<Route path="/room" exact element={<Room />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Index;
