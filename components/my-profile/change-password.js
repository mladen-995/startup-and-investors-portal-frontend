import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import CustomInput from "../inputs/custom-input";
import * as Yup from "yup";
import { axiosInstance } from "../../lib/axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useState } from "react";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await axiosInstance.post("password-change", values);
      resetForm();
      NotificationManager.success("Password is successfully changed.");
    } catch (error) {
      NotificationManager.error(error.response.data.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().required("Field is required."),
          newPassword: Yup.string()
            .required("Field is required.")
            .min(8, "Password must contain minimum of 8 characters."),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <CustomInput
              label="Old password"
              name="oldPassword"
              required="true"
              errors={errors}
              touched={touched}
              type="password"
            />
            <CustomInput
              label="New password"
              name="newPassword"
              required="true"
              errors={errors}
              touched={touched}
              type="password"
            />
            <Button type="submit" disabled={loading}>
              Change password
            </Button>
          </Form>
        )}
      </Formik>
      <NotificationContainer />
    </>
  );
}
