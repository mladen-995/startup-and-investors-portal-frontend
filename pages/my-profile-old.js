import AuthLayout from "./../components/layout-auth";
import { getUser } from "./../services/user.service";
import { useEffect, useState } from "react";
import Router from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import { Field, Form, Formik } from "formik";
import { Col, FormGroup, FormLabel, Row } from "react-bootstrap";
import CustomInput from "../components/inputs/custom-input";
import StreetNumberSelect from "../components/inputs/street-numbers-select";
import StreetSelect from "../components/inputs/streets-select";
import MunicipalitySelect from "../components/inputs/municipalities-select";
import CitySelect from "../components/inputs/cities-select";
import CountrySelect from "../components/inputs/countries-select";
import { useUser } from "../context/user-hook";

export default function MyProfile() {
  const user = useUser();
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [municipalityId, setMunicipalityId] = useState("");
  const [streetId, setStreetId] = useState("");

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!user) {
    return;
  }

  return (
    <>
      <h1>My profile</h1>
      <hr />

      <Formik
        initialValues={{
          username: user?.user?.username || "",
          email: user?.user?.email || "",
          firstName: user?.user?.firstName || "",
          middleName: user?.user?.middleName || "",
          lastName: user?.user?.lastName || "",
          tin: user?.user?.profile?.tin || "",
          legalEntityName: user?.user?.profile?.legalEntityName || "",
          website: user?.user?.profile?.website,
          phone: user?.user?.profile?.phone,
          countryId: user?.user?.profile?.countryId,
        }}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Col>
                <CustomInput
                  label="Username"
                  name="username"
                  required="true"
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col>
                <CustomInput
                  label="Password"
                  name="password"
                  type="password"
                  required="true"
                  errors={errors}
                  touched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <CustomInput
                  label="First name"
                  name="firstName"
                  required="true"
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col>
                <CustomInput
                  label="Middle name"
                  name="middleName"
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col>
                <CustomInput
                  label="Last name"
                  name="lastName"
                  required="true"
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col>
                <CustomInput
                  label="Email"
                  name="email"
                  required="true"
                  errors={errors}
                  touched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <CustomInput
                  label="Tin"
                  name="tin"
                  required="true"
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col>
                <CustomInput
                  label="Legal entity name"
                  name="legalEntityName"
                  required="true"
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col>
                <CustomInput
                  label="Website"
                  name="website"
                  required="true"
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col>
                <CustomInput
                  label="Phone"
                  name="phone"
                  required="true"
                  errors={errors}
                  touched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field name="countryId" id="countryId">
                  {({ field, meta, form: { setFieldValue } }) => (
                    <FormGroup className="mb-3">
                      <FormLabel>
                        Country <span className="text-danger">*</span>
                      </FormLabel>
                      <pre>{user?.user?.profile?.countryId}</pre>
                      <CountrySelect
                        name="countryId"
                        onChange={(option) => {
                          setFieldValue(field.name, option.value);
                          setCountryId(option.value);
                        }}
                        value={user?.user?.profile?.countryId}
                      />
                      {errors.countryId ? (
                        <div className="text-danger">{errors.countryId}</div>
                      ) : null}
                    </FormGroup>
                  )}
                </Field>
              </Col>
              <Col>
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
              </Col>
              <Col>
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
                          setMunicipalityId(option.value);
                        }}
                      />
                      {errors.municipalityId ? (
                        <div className="text-danger">
                          {errors.municipalityId}
                        </div>
                      ) : null}
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>
            <Row>
              <Col>
                <Field name="streetId" id="streetId">
                  {({ field, meta, form: { setFieldValue } }) => (
                    <FormGroup className="mb-3">
                      <FormLabel>
                        Street <span className="text-danger">*</span>
                      </FormLabel>
                      <StreetSelect
                        name="streetId"
                        municipalityId={municipalityId}
                        onChange={(option) => {
                          setFieldValue(field.name, option.value);
                          setStreetId(option.value);
                        }}
                      />
                      {errors.streetId ? (
                        <div className="text-danger">{errors.streetId}</div>
                      ) : null}
                    </FormGroup>
                  )}
                </Field>
              </Col>
              <Col>
                <Field name="streetNumberId" id="streetNumberId">
                  {({ field, meta, form: { setFieldValue } }) => (
                    <FormGroup className="mb-3">
                      <FormLabel>
                        Street number <span className="text-danger">*</span>
                      </FormLabel>
                      <StreetNumberSelect
                        name="streetNumberId"
                        streetId={streetId}
                        onChange={(option) => {
                          setFieldValue(field.name, option.value);
                        }}
                      />
                      {errors.streetNumberId ? (
                        <div className="text-danger">
                          {errors.streetNumberId}
                        </div>
                      ) : null}
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
}

MyProfile.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
