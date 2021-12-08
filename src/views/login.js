import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Box,
  CssBaseline,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unRegister, setUnRegister] = useState(false);

  const loginData = async () => {
    let url = "";
    unRegister === false
      ? (url = "https://reqres.in/api/login")
      : (url = "https://reqres.in/api/register");

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([res, data]) => {
        if (res === 200) {
          console.log(res, data);
          unRegister === false
            ? navigate("/dashboard", { replace: true })
            : navigate("/");
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 224, 255, 1), rgba(0, 133, 255, 1))`,
        height: "100%",
        position: "absolute",
        left: "0px",
        top: "0px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      <Container style={{ marginTop: 120 }} maxWidth="xs">
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "70vh",
            boxShadow: "10px 10px 10px rgba(0, 133, 255, 1)",
          }}
        >
          <div>
            <h2 style={{ textAlign: "center", padding: 50 }}>
              {unRegister === false ? "Login Form" : "Register"}{" "}
            </h2>
          </div>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={(event) => setEmail(event.target.value)}
              style={{ marginTop: 20 }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              onChange={(event) => setPassword(event.target.value)}
              style={{ marginBottom: 20 }}
            />
            <Button onClick={loginData} variant="contained">
              {unRegister === false ? "Login" : "daftar"}
            </Button>
            <Stack direction="row" alignItems="center">
              {unRegister === false ? (
                <>
                  {" "}
                  <h5>Belum Punya Akun?</h5>
                  <Button
                    color={"info"}
                    style={{ marginTop: 1 }}
                    size={"small"}
                    variant="text"
                    onClick={() => setUnRegister(true)}
                  >
                    Daftar
                  </Button>{" "}
                </>
              ) : (
                <Button
                  color={"info"}
                  style={{ marginTop: 1 }}
                  size={"small"}
                  variant="text"
                  onClick={() => setUnRegister(false)}
                >
                  Login Form
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
