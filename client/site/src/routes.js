import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Chat from "./pages/chat";
import Room from "./pages/room";

const Index = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/chat" exact element={<Chat />} />
				<Route path="/room" exact element={<Room />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Index;
