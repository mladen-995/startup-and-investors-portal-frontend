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
import { useUser } from "../context/user-hook";
import { axiosInstance } from "../lib/axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function ForgotPassword() {
  const user = useUser();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  useEffect(() => {
    if (user?.isLoggedIn) {
      Router.push("my-profile");
    }
  }, [user]);

  const handleLogin = async (values) => {
    setLoading(true);
    setErrorMessage("");

    try {
      await axiosInstance.post("password-reset", values);
      setLinkSent(true);
    } catch (error) {
      if (error.response.status == 422) {
        setErrorMessage("Username or Password not valid!");
      }
      setLoading(false);
    }
  };

  if (user && !user.isLoggedIn) {
    return (
      <>
        <Container className="d-flex justify-content-center">
          <Card className="mt-5" style={{ minWidth: "500px", width: "50%" }}>
            <Card.Body>
              <h1 className="text-center">Portal</h1>
              <hr />
              <h3 className="text-center">Forgot password</h3>

              {linkSent && (
                <>
                  <Alert variant="success">
                    Reset link is successfully sent to your email address.
                  </Alert>
                  <Link href="/login">Click here</Link> to go back to login.
                </>
              )}

              {!linkSent && (
                <Formik
                  initialValues={{
                    username: "",
                  }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().required("Field is required."),
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
                      {errorMessage ? (
                        <Alert variant="danger">{errorMessage}</Alert>
                      ) : null}
                      <Button
                        variant="primary"
                        type="submit"
                        className="me-3"
                        disabled={isLoading}
                      >
                        Send reset link
                      </Button>
                      <Link href="/login">Click here</Link> to go back to login.
                    </Form>
                  )}
                </Formik>
              )}
            </Card.Body>
          </Card>
        </Container>
        <NotificationContainer />
      </>
    );
  }
}
