import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Router from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/inputs/custom-input";
import { useUser } from "../hooks/user-hook";
import { Col, Row } from "react-bootstrap";

export default function Login() {
  const user = useUser();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user?.isLoggedIn) {
      Router.push("/");
    }
  }, [user]);

  const handleLogin = async (values) => {
    setLoading(true);
    setErrorMessage("");

    try {
      await axios.post("http://localhost:3000/api/login", values);
      Router.push("/");
    } catch (error) {
      if (error.response.status == 422) {
        setErrorMessage("Username or Password not valid!");
      }
      setLoading(false);
    }
  };

  if (user && !user.isLoggedIn) {
    return (
      <Container className="d-flex justify-content-center">
        <Card className="mt-5" style={{ minWidth: "500px", width: "50%" }}>
          <Card.Body>
            <h1 className="text-center">Portal</h1>
            <hr />
            <h3 className="text-center">Login</h3>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required("Field is required."),
                password: Yup.string().required("Field is required."),
              })}
              onSubmit={handleLogin}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <CustomInput
                    name="username"
                    label="Username"
                    errors={errors}
                    touched={touched}
                    required={true}
                  />
                  <CustomInput
                    name="password"
                    label="Password"
                    errors={errors}
                    touched={touched}
                    required={true}
                    type="password"
                  />
                  {errorMessage ? (
                    <Alert variant="danger">{errorMessage}</Alert>
                  ) : null}
                  <Button
                    variant="primary"
                    type="submit"
                    className="me-3"
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                  <Link href="/forgot-password">Forgot password?</Link>
                  <Row className="mt-3">
                    <Col>
                      You don't have an account?{" "}
                      <Link href="/register">Click here</Link> to register.
                    </Col>
                  </Row>
                  <br />
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
