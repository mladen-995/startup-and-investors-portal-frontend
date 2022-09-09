import AuthLayout from "../../components/layout-auth";
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
import * as Yup from "yup";
import CustomInput from "../../components/inputs/custom-input";
import SweetAlert from "react-bootstrap-sweetalert";
import { useState } from "react";
import Router from "next/router";

export default function SurveysCreate() {
  const [notificationAlertShow, setNotificationAlertShow] = useState(false);

  const handleSubmit = async (values) => {
    await axiosInstance.post("surveys", values);
    setNotificationAlertShow(true);
  };

  const createSurveySchema = Yup.object().shape({
    title: Yup.string().required("Field is required."),
    questions: Yup.array().of(Yup.string().required("Field is required.")),
  });

  return (
    <div>
      <h1>Create survey</h1>

      <SweetAlert
        title="Success"
        type="success"
        show={notificationAlertShow}
        onConfirm={() => {
          Router.push("/surveys");
          setNotificationAlertShow(false);
        }}
      >
        Survey is successfully created.
      </SweetAlert>

      <Formik
        initialValues={{
          title: "",
          public: false,
          questions: [""],
        }}
        validationSchema={createSurveySchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <CustomInput
              label="Title"
              required="true"
              name="title"
              errors={errors}
              touched={touched}
            />

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
                                className={
                                  errors.questions && errors.questions[index]
                                    ? "is-invalid"
                                    : null
                                }
                              />
                              <Button
                                variant="outline-danger"
                                onClick={() => remove(index)}
                                disabled={
                                  values.questions.length === 1 ? true : null
                                }
                              >
                                X
                              </Button>
                            </InputGroup>
                            {errors.questions && errors.questions[index] ? (
                              <div className="text-danger">
                                {errors.questions[index]}
                              </div>
                            ) : null}
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
    </div>
  );
}

SurveysCreate.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
