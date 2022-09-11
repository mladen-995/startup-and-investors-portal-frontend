import { Field, Form, Formik } from "formik";
import AuthLayout from "../../../components/layout-auth";
import * as Yup from "yup";
import CustomInput from "../../../components/inputs/custom-input";
import { useState } from "react";
import { Button, FormGroup, FormLabel } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import SweetAlert from "react-bootstrap-sweetalert";
import Router from "next/router";
import CountrySelect from "../../../components/inputs/countries-select";
import CitySelect from "../../../components/inputs/cities-select";
import MunicipalitySelect from "../../../components/inputs/municipalities-select";
import StreetSelect from "../../../components/inputs/streets-select";

export default function CreateCity() {
  const [loading, setLoading] = useState(false);
  const [notificationAlertShow, setNotificationAlertShow] = useState(false);
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");

  const handleSubmit = async (values) => {
    setLoading(true);
    await axiosInstance.post("streets", values);
    setLoading(false);
    setNotificationAlertShow(true);
  };

  return (
    <>
      <h1>Create municipality</h1>
      <hr />

      <SweetAlert
        title="Success"
        type="success"
        show={notificationAlertShow}
        onConfirm={() => {
          Router.push("/ciphers/streets");
          setNotificationAlertShow(false);
        }}
      >
        Street is successfully created.
      </SweetAlert>

      <Formik
        initialValues={{
          name: "",
          countryId: "",
          cityId: "",
          municipalityId: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Field is required."),
          countryId: Yup.string().required("Field is required."),
          cityId: Yup.string().required("Field is required."),
          municipalityId: Yup.string().required("Field is required."),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="countryId" id="countryId">
              {({ field, meta, form: { setFieldValue } }) => (
                <FormGroup className="mb-3">
                  <FormLabel>
                    Country <span className="text-danger">*</span>
                  </FormLabel>
                  <CountrySelect
                    name="countryId"
                    onChange={(option) => {
                      setFieldValue(field.name, option.value);
                      setCountryId(option.value);
                    }}
                  />
                  {errors.countryId ? (
                    <div className="text-danger">{errors.countryId}</div>
                  ) : null}
                </FormGroup>
              )}
            </Field>

            <Field name="cityId" id="cityId">
              {({ field, meta, form: { setFieldValue } }) => (
                <FormGroup className="mb-3">
                  <FormLabel>
                    City <span className="text-danger">*</span>
                  </FormLabel>
                  <CitySelect
                    name="cityId"
                    countryId={countryId}
                    onChange={(option) => {
                      setFieldValue(field.name, option.value);
                      setCityId(option.value);
                    }}
                  />
                  {errors.cityId ? (
                    <div className="text-danger">{errors.cityId}</div>
                  ) : null}
                </FormGroup>
              )}
            </Field>

            <Field name="municipalityId" id="municipalityId">
              {({ field, meta, form: { setFieldValue } }) => (
                <FormGroup className="mb-3">
                  <FormLabel>
                    Municipality <span className="text-danger">*</span>
                  </FormLabel>
                  <MunicipalitySelect
                    name="municipalityId"
                    cityId={cityId}
                    onChange={(option) => {
                      setFieldValue(field.name, option.value);
                    }}
                  />
                  {errors.municipalityId ? (
                    <div className="text-danger">{errors.municipalityId}</div>
                  ) : null}
                </FormGroup>
              )}
            </Field>

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

CreateCity.getLayout = function getLayout(page) {
  return (
    <AuthLayout isProtected={true} isAdmin={true}>
      {page}
    </AuthLayout>
  );
};
