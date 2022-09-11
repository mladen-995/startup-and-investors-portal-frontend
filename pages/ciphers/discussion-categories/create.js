import { Field, Form, Formik } from "formik";
import AuthLayout from "../../../components/layout-auth";
import * as Yup from "yup";
import CustomInput from "../../../components/inputs/custom-input";
import { useState } from "react";
import { Button, Col, FormGroup, FormLabel, Row } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import SweetAlert from "react-bootstrap-sweetalert";
import Router from "next/router";
import DatePicker from "react-datepicker";
import { Category } from "../../../enums/category";

export default function CreateDiscussionCategory() {
  const [loading, setLoading] = useState(false);
  const [notificationAlertShow, setNotificationAlertShow] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    await axiosInstance.post("categories", {
      ...values,
      entityName: Category.DISCUSSION,
    });
    setLoading(false);
    setNotificationAlertShow(true);
  };

  return (
    <>
      <h1>Create discussion category</h1>
      <hr />

      <SweetAlert
        title="Success"
        type="success"
        show={notificationAlertShow}
        onConfirm={() => {
          Router.push("/ciphers/discussion-categories");
          setNotificationAlertShow(false);
        }}
      >
        Discussion category is successfully created.
      </SweetAlert>

      <Formik
        initialValues={{
          name: "",
          dateFrom: "",
          dateTo: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Field is required."),
          dateFrom: Yup.string().required("Field is required."),
          dateTo: Yup.string().required("Field is required."),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Col>
                <CustomInput
                  name="name"
                  label="Name"
                  errors={errors}
                  touched={touched}
                  required={true}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field name="dateFrom">
                  {({ field, meta, form: { setFieldValue } }) => (
                    <FormGroup className="mb-3">
                      <FormLabel>
                        Valid from <span className="text-danger">*</span>
                      </FormLabel>
                      <DatePicker
                        className="form-control"
                        isClearable
                        value={field.value}
                        onChange={(val) => {
                          setFieldValue(field.name, val);
                        }}
                        selected={
                          (field.value && new Date(field.value)) || null
                        }
                        dateFormat="dd/MM/yyyy"
                      />
                      {errors[field.name] && touched[field.name] ? (
                        <div className="text-danger">{errors[field.name]}</div>
                      ) : null}
                    </FormGroup>
                  )}
                </Field>
              </Col>
              <Col>
                <Field name="dateTo">
                  {({ field, meta, form: { setFieldValue } }) => (
                    <FormGroup className="mb-3">
                      <FormLabel>
                        Valid until <span className="text-danger">*</span>
                      </FormLabel>
                      <DatePicker
                        className="form-control"
                        isClearable
                        value={field.value}
                        onChange={(val) => {
                          setFieldValue(field.name, val);
                        }}
                        selected={
                          (field.value && new Date(field.value)) || null
                        }
                        dateFormat="dd/MM/yyyy"
                      />
                      {errors[field.name] && touched[field.name] ? (
                        <div className="text-danger">{errors[field.name]}</div>
                      ) : null}
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>
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

CreateDiscussionCategory.getLayout = function getLayout(page) {
  return <AuthLayout isProtected={true}>{page}</AuthLayout>;
};
