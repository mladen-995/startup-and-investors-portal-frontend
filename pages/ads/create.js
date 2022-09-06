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

export default function AdsCreate({ user, token }) {
  function handleSubmit(values) {
    axiosInstance.post("surveys", values).then((response) => {
      console.log(response);
    });
  }

  return (
    <Formik
      initialValues={{
        title: "",
        text: "",
        expiryDate: "",
        visibility: false,
      }}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <Field id="title" name="title">
            {({ field, form, meta }) => (
              <FormGroup className="mb-3">
                <FormLabel>Title</FormLabel>
                <FormControl
                  id="title"
                  type={"text"}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormGroup>
            )}
          </Field>

          <Field id="public" name="public" type="checkbox">
            {({ field, form, meta }) => (
              <FormCheck
                className="mb-3"
                type="checkbox"
                id="public"
                label="Public"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          </Field>

          <FieldArray name="questions">
            {({ insert, remove, push }) => (
              <div>
                <div className="d-inline-flex">
                  <h3>Questions</h3>
                  <Button
                    variant="primary"
                    type="button"
                    className="ms-3"
                    onClick={() => push("")}
                  >
                    Add question
                  </Button>
                </div>

                {values.questions.length > 0 &&
                  values.questions.map((question, index) => (
                    <Field
                      name={`questions.${index}`}
                      id={`questions.${index}`}
                      key={`questions.${index}`}
                    >
                      {({ field, form, meta }) => (
                        <FormGroup className="mb-3">
                          <FormLabel>Question #{index + 1}</FormLabel>
                          <InputGroup>
                            <FormControl
                              id={`questions.${index}`}
                              type={"text"}
                              value={field.value}
                              onChange={field.onChange}
                            />
                            <Button
                              variant="outline-danger"
                              onClick={() => remove(index)}
                            >
                              X
                            </Button>
                          </InputGroup>
                        </FormGroup>
                      )}
                    </Field>
                  ))}
              </div>
            )}
          </FieldArray>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

AdsCreate.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
