import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, InputAdornment, IconButton, InputLabel, OutlinedInput, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Title } from "../../styled";
import { userLogin } from "../../api/userApi";
import localStorage from "local-storage";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import "./index.sass";

const Index = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [shown, setShown] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleLogin() {
		setLoading(true);
		try {
			if (!email || !email.trim() || !password || !password.trim()) throw new Error("All the fields need to be filled");
			const r = await userLogin(email, password);
			localStorage("user", r);
			setTimeout(() => {
				navigate("/room");
				window.location.reload(false);
			}, 2500);
		} catch (err) {
			if (err.response) toast.warn(err.response.data.err);
			else toast.warn(err.message);
			setLoading(false);
		}
	}

	return (
		<div className="login page">
			<HashLoader
				color="#2d95b1"
				loading={loading}
				cssOverride={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
					zIndex: "10",
					background: "#0000002d",
					width: "100vw",
					height: "100vh",
				}}
				size={50}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
			<main>
				<Title color="#424242" font="4vw">
					Login
				</Title>
				<div>
					<FormControl sx={{ m: 1, width: "90%" }} disabled={loading}>
						<TextField margin="dense" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
					</FormControl>
					<FormControl sx={{ m: 1, width: "90%" }} margin="dense" variant="outlined" disabled={loading}>
						<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={shown ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton aria-label="toggle password visibility" onClick={() => setShown(!shown)} onMouseDown={() => setShown(true)} edge="end">
										{shown ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
					<br />
					<Button onClick={() => handleLogin()} variant="contained" sx={{ width: "90%", height: "50px", marginTop: "30px" }}>
						Login
					</Button>
					<p>
						New here? <span onClick={() => navigate("/signup")}>Create an account</span>
					</p>
				</div>
			</main>
		</div>
	);
};

export default Index;
