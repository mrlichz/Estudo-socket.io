import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, InputAdornment, IconButton, InputLabel, OutlinedInput, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Title } from "../../styled";
import { newUser } from "../../api/userApi";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import "./index.sass";

const Index = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [shown, setShown] = useState(false);
	const [shown2, setShown2] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSignUp() {
		setLoading(true);
		try {
			if (!name || !name.trim() || !email || !email.trim() || !password || !password.trim() || !password2 || !password2.trim()) throw new Error("All the fields need to be filled");
			else if (password !== password2) throw new Error("Passwords do not match");
			const r = await newUser(name, email, password);
			if (r !== 204) throw new Error("An error has ocurred");
			setTimeout(() => {
				toast.success("Account created");
				setLoading(false);
			}, 2500);
		} catch (err) {
			if (err.response) toast.warn(err.response.data.err);
			else toast.warn(err.message);
			setLoading(false);
		}
	}

	return (
		<div className="signup page">
			<HashLoader
				color="#2d95b1"
				loading={loading}
				cssOverride={{
					transition: "1s ease-in-out",
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
					Sign Up
				</Title>
				<div>
					<FormControl sx={{ m: 1, width: "90%" }} disabled={loading}>
						<TextField label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
					</FormControl>
					<FormControl sx={{ m: 1, width: "90%" }} disabled={loading}>
						<TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
					</FormControl>
					<FormControl sx={{ m: 1, width: "90%" }} variant="outlined" disabled={loading}>
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
					<FormControl sx={{ m: 1, width: "90%" }} variant="outlined" disabled={loading}>
						<InputLabel htmlFor="outlined-adornment-password">Confirm your password</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={shown2 ? "text" : "password"}
							value={password2}
							onChange={(e) => setPassword2(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton aria-label="toggle password visibility" onClick={() => setShown2(!shown2)} onMouseDown={() => setShown2(true)} edge="end">
										{shown2 ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Confirm your password"
						/>
					</FormControl>
					<br />
					<Button onClick={() => handleSignUp()} variant="contained" sx={{ width: "90%", height: "50px", marginTop: "30px" }}>
						Sign Up
					</Button>
					<p>
						Already have an account? <span onClick={() => navigate("/")}>Login</span>
					</p>
				</div>
			</main>
		</div>
	);
};

export default Index;
