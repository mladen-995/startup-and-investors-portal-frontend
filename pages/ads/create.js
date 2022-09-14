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
import CustomInput from "../../components/inputs/custom-input";
import DatePicker from "react-datepicker";
import AdsVisibility from "../../components/ads/ads-visibility";
import * as Yup from "yup";

export default function AdsCreate() {
  const AdCreateSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    text: Yup.string().required("Required"),
    expiryDate: Yup.string().required("Required"),
    visibility: Yup.string().required("Required"),
  });

  function handleSubmit(values) {
    let requestValues = {};

    for (const key in values) {
      if (!values[key]) {
        requestValues[key] = null;
      } else {
        requestValues[key] = values[key];
      }
    }

    console.log(requestValues);
    axiosInstance.post("ads", requestValues).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <h1>Create ad</h1>
      <hr />

      <Formik
        initialValues={{
          title: "",
          text: "",
          expiryDate: null,
          visibility: false,
        }}
        validationSchema={AdCreateSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
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

            <Field name="expiryDate">
              {({ field, meta, form: { setFieldValue } }) => (
                <FormGroup className="mb-3">
                  <FormLabel>
                    Expiry date <span className="text-danger">*</span>
                  </FormLabel>
                  <DatePicker
                    className="form-control"
                    isClearable
                    value={field.value}
                    onChange={(val) => {
                      setFieldValue(field.name, val);
                    }}
                    selected={(field.value && new Date(field.value)) || null}
                    dateFormat="dd/MM/yyyy"
                  />
                </FormGroup>
              )}
            </Field>

            <h3>Visibility</h3>

            <AdsVisibility
              name="visibility"
              label="Title"
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              childrenName="visibilityPairObject"
            />

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

AdsCreate.getLayout = function getLayout(page) {
  return <AuthLayout isProtected={true}>{page}</AuthLayout>;
};
