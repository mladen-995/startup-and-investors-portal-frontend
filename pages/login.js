import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Router from "next/router";
import { Formik, Field, Form } from "formik";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (Cookies.get("token")) {
      Router.push("my-profile");
    }
  });

  function handleLogin(values) {
    setLoading(true);
    setError("");

    const { username, password } = values;

    axios
      .post("/api/login", { username, password })
      .then((response) => {
        const data = response.data.data;
        Cookies.set("token", data.token);

        Router.push("/my-profile");
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
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <Field type="email" name="username" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
              </div>
              {error ? <Alert variant="danger">{error}</Alert> : null}
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
              </div>
              {/* <Button
                variant="primary"
                type="submit"
                className="me-3"
                disabled={isLoading}
              >
                Login
              </Button> */}
              You don't have an account?{" "}
              <Link href="/register">Click here</Link> to register.
            </Form>
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
}
