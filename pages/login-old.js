import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Router from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    // axios.defaults.baseURL = "http://localhost:3001/api/";
    console.log(username, password);
    axios
      .post("/api/login", { username, password })
      .then((response) => {
        const data = response.data.data;
        Cookies.set("token", data.token);
      })
      .catch((response) => {
        if (response.response.status === 401) {
          setError(response.response.data.message);
        }
      })
      .then(() => {
        setLoading(false);
      });
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5" style={{ minWidth: "500px", width: "50%" }}>
        <Card.Body>
          <h1>Login</h1>
          <Form className="justify-content-center" onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            {error ? <Alert variant="danger">{error}</Alert> : null}
            <Button
              variant="primary"
              type="submit"
              className="me-3"
              disabled={isLoading}
            >
              Login
            </Button>
            You don't have an account? <Link href="/register">Click here</Link>{" "}
            to register.
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
