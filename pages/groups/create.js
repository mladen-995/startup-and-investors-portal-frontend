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

export default function GroupsCreate({ user, token }) {
  const [loading, setLoading] = useState(false);

  const GroupCreateSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    // setLoading(true);
    await axiosInstance.post("startup-groups", values);

    Router.push("/groups");
  };

  const onStartupSelect = (startups, setFieldValue) => {
    setFieldValue(
      "startupIds",
      startups.map((startup) => startup.id)
    );
  };

  return (
    <div>
      <h1>Create group</h1>
      <hr />

      <Formik
        initialValues={{
          name: "",
          description: "",
          startupIds: [],
        }}
        validationSchema={GroupCreateSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form noValidate>
            <CustomInput
              name="name"
              label="Name"
              errors={errors}
              touched={touched}
              required={true}
            />

            <FormGroup className="mb-3">
              <FormLabel>
                Description <span className="text-danger">*</span>
              </FormLabel>
              <Field
                id="description"
                name="description"
                as="textarea"
                className="form-control"
              />
              {errors.description && touched.description ? (
                <div className="text-danger">{errors.description}</div>
              ) : null}
            </FormGroup>

            <StartupSelector
              onSelect={(startups) => onStartupSelect(startups, setFieldValue)}
            />

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
    </div>
  );
}

GroupsCreate.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
