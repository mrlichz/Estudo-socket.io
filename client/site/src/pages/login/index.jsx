import React, { useState } from "react";
import { FormControl, TextField, InputAdornment, IconButton, InputLabel, OutlinedInput, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Title } from "../../styled";
import "./index.sass";

const Index = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [shown, setShown] = useState(false);

	return (
		<div className="login page">
			<main>
				<Title color="#424242" font="4vw">
					Login
				</Title>
				<div>
					<FormControl sx={{ m: 1, width: "90%" }}>
						<TextField margin="dense" id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
					</FormControl>
					<FormControl sx={{ m: 1, width: "90%" }} margin="dense" variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={!shown ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton aria-label="toggle password visibility" onClick={() => setShown(!shown)} onMouseDown={() => setShown(true)} edge="end">
										{!shown ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
					<br />
					<Button variant="contained" sx={{ width: "90%", height: "50px", marginTop: "30px" }}>
						Login
					</Button>
					<p>
						New to here? <span>Create an account</span>
					</p>
				</div>
			</main>
		</div>
	);
};

export default Index;
