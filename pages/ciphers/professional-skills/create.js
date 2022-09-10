import { Form, Formik } from "formik";
import AuthLayout from "../../../components/layout-auth";
import * as Yup from "yup";
import CustomInput from "../../../components/inputs/custom-input";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import SweetAlert from "react-bootstrap-sweetalert";
import Router from "next/router";
import { Cipher } from "../../../enums/cipher";

export default function CreateProfessionalSkills() {
  const [loading, setLoading] = useState(false);
  const [notificationAlertShow, setNotificationAlertShow] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    await axiosInstance.post("ciphers", {
      name: values.name,
      cipherTypeName: Cipher.PROFESIONAL_SKILLS,
    });
    setLoading(false);
    setNotificationAlertShow(true);
  };

  return (
    <>
      <h1>Create professional skill</h1>
      <hr />

      <SweetAlert
        title="Success"
        type="success"
        show={notificationAlertShow}
        onConfirm={() => {
          Router.push("/ciphers/professional-skills");
          setNotificationAlertShow(false);
        }}
      >
        Professional skill is successfully created.
      </SweetAlert>

      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Field is required."),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <CustomInput
              name="name"
              label="Name"
              errors={errors}
              touched={touched}
              required={true}
            />
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              disabled={loading}
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

CreateProfessionalSkills.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
