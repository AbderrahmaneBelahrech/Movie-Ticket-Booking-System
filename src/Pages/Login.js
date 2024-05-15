import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo-log.png";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setEmailError("Email cannot be empty");
      return;
    }
    if (!password) {
      setPasswordError("Password cannot be empty");
      return;
    }

    setSubmitting(true);
    const loginData = { email, password };
    axios
      .post("http://localhost:8080/api/users/login", loginData)
      .then((response) => {
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userRole", response.data.userRole);
        console.log(response.data.userRole);

        if (response.data.userRole === "admin") {
          // Change 'role' to 'userRole'
          setIsLoggedIn(true);
          navigate("/AdminListFilm"); // Redirect to admin page
        } else if (response.data.userRole === "user") {
          // Change 'role' to 'userRole'
          setIsLoggedIn(true);
          navigate("/home"); // Redirect to user page
        } // Rediriger vers la page d'accueil après la connexion réussie
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setPasswordError("Incorrect email or password");
        } else {
          setPasswordError("Unknown Error");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={Logo} style={{ maxWidth: "150px" }} alt="logo" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              disabled={submitting}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
              helperText={passwordError}
              disabled={submitting}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={submitting || !email || !password}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </Button>
          </Box>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signup" variant="body2">
              Don't have account? sign up
            </Link>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
