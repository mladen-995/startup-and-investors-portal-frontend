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

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;
  const token = req.session.jwt;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user, token },
  };
},
sessionOptions);

export default function DiscussionCreate({ user, token }) {
  const NewsCreateSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
  });

  function handleSubmit(values) {
    axiosInstance.post("discussions", values).then((res) => {
      console.log(res);
    });
  }

  function handleChange(event) {
    alert(1);
    console.log(event);
  }

  return (
    <div>
      <h1>Create discussion</h1>
      <Formik
        initialValues={{
          title: "",
          text: "",
          visibility: "",
        }}
        validationSchema={NewsCreateSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form noValidate>
            <Field id="title" name="title">
              {({ field }) => (
                <div>
                  <FormGroup className="mb-3">
                    <FormLabel>
                      Title <span className="text-danger">*</span>
                    </FormLabel>
                    <FormControl
                      id="title"
                      type={"text"}
                      value={field.value}
                      onChange={field.onChange}
                      className={errors.title ? "is-invalid" : null}
                    />
                    {errors.title ? (
                      <div className="invalid-feedback">{errors.title}</div>
                    ) : null}
                  </FormGroup>
                </div>
              )}
            </Field>

            <FormGroup className="mb-3">
              <FormLabel>Text</FormLabel>
              <Field
                id="text"
                name="text"
                as="textarea"
                className="form-control"
              />
            </FormGroup>

            <h3>Visibility</h3>

            <div className="mb-3">
              <Field
                type="radio"
                name="visibility"
                id="visibility-all"
                value="all"
              >
                {({ field }) => (
                  <FormCheck
                    inline
                    name="visibility"
                    label="All"
                    type="radio"
                    id="visibility-all"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              </Field>

              <Field
                type="radio"
                name="visibility"
                id="visibility-startups-all"
                value="startupsOnly"
              >
                {({ field }) => (
                  <FormCheck
                    inline
                    name="visibility"
                    label="All startups"
                    type="radio"
                    id="visibility-startups-all"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              </Field>

              <Field
                type="radio"
                name="visibility"
                id="visibility-investors-all"
                value="investorsOnly"
              >
                {({ field }) => (
                  <FormCheck
                    inline
                    name="visibility"
                    label="All investors"
                    type="radio"
                    id="visibility-investors-all"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              </Field>

              <Field
                type="radio"
                name="visibility"
                id="visibility-startups-certain"
                value="startupIds"
              >
                {({ field }) => (
                  <FormCheck
                    inline
                    name="visibility"
                    label="Certain startups"
                    type="radio"
                    id="visibility-startups-certain"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              </Field>

              <Field
                type="radio"
                name="visibility"
                id="visibility-investors-certain"
                value="investorIds"
                onChange={handleChange}
              >
                {({ field }) => (
                  <FormCheck
                    inline
                    name="visibility"
                    label="Certain investors"
                    type="radio"
                    id="visibility-investors-certain"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              </Field>
            </div>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

DiscussionCreate.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
