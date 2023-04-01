import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Router, { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/inputs/custom-input";
import { useUser } from "../hooks/user-hook";
import { axiosInstance } from "../lib/axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function ForgotPassword() {
  const user = useUser();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (user?.isLoggedIn) {
      Router.push("my-profile");
    }
  }, [user]);

  const handleSubmit = async (values) => {
    setLoading(true);
    setErrorMessage("");

    try {
      await axiosInstance.post(`password-reset/${token}`, values);
      setPasswordChanged(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
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
              <h3>Set password</h3>

              {passwordChanged && (
                <>
                  <Alert variant="success">
                    You is successfully set the new password.
                  </Alert>
                  <Link href="/login">Click here</Link> to go back to login.
                </>
              )}

              {!passwordChanged && (
                <Formik
                  initialValues={{
                    newPassword: "",
                  }}
                  validationSchema={Yup.object().shape({
                    newPassword: Yup.string()
                      .required("Field is required.")
                      .min(8, "Password must contain minimum of 8 characters."),
                  })}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <CustomInput
                        name="newPassword"
                        label="New password"
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
                        Set password
                      </Button>
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
