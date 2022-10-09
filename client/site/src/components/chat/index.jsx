import React from "react";
import localStorage from "local-storage";
import "./index.sass";

const Index = ({ user, message, local }) => {
	return <div className={"comp-chat " + (user === localStorage("user").id || local ? "comp-chat-p" : "")}>{message}</div>;
};

export default Index;
