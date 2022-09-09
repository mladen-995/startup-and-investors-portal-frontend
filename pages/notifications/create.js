import { useEffect, useState } from "react";
import Router from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import AuthLayout from "../../components/layout-auth";
import { sessionOptions } from "../../lib/session";
import { Field, FieldArray, Form, Formik } from "formik";
import {
  Button,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import { axiosInstance } from "../../lib/axios";
import axios from "axios";
import Select from "react-select";
import * as Yup from "yup";
import StartupSelector from "../../components/search/startups/startup-selector";
import NewsCategorySelect from "../../components/forms/news-category-select";
import Visibility from "../../components/forms/visibility";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import CustomInput from "../../components/inputs/custom-input";
import DiscussionVisibility from "../../components/forms/discussions-visibility";
import AdsVisibility from "../../components/ads/ads-visibility";
import SweetAlert from "react-bootstrap-sweetalert";

export default function DiscussionCreate({ user, token }) {
  const [loading, setLoading] = useState(false);
  const [notificationAlertShow, setNotificationAlertShow] = useState(false);

  const DiscussionCreateSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    text: Yup.string().required("Required"),
    visibility: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    await axiosInstance.post("notifications", values);

    setLoading(false);
    setNotificationAlertShow(true);
  };

  return (
    <div>
      <h1>Create notification</h1>
      <hr />

      <SweetAlert
        title="Success"
        type="success"
        show={notificationAlertShow}
        onConfirm={() => {
          Router.push("/notifications");
          setNotificationAlertShow(false);
        }}
      >
        Notification is successfully created.
      </SweetAlert>

      <Formik
        initialValues={{
          title: "",
          text: "",
          isEmailNotification: false,
          visibility: "",
          visibilityPairObject: [],
        }}
        validationSchema={DiscussionCreateSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form noValidate>
            <CustomInput
              name="title"
              label="Title"
              errors={errors}
              touched={touched}
              required={true}
            />

            <FormGroup className="mb-3">
              <FormLabel>
                Text <span className="text-danger">*</span>
              </FormLabel>
              <Field
                id="text"
                name="text"
                as="textarea"
                className="form-control"
              />
              {errors.text && touched.text ? (
                <div className="text-danger">{errors.text}</div>
              ) : null}
            </FormGroup>

            <Field
              id="isEmailNotification"
              name="isEmailNotification"
              type="checkbox"
            >
              {({ field, form, meta }) => (
                <FormCheck
                  className="mb-3"
                  type="checkbox"
                  id="isEmailNotification"
                  label="Email notification"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            </Field>

            <h3>Visibility</h3>

            <div className="mb-3">
              <AdsVisibility
                name="visibility"
                childrenName="visibilityPairObject"
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
            </div>

            <hr />
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
      <NotificationContainer />
    </div>
  );
}

DiscussionCreate.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
