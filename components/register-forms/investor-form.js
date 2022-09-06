import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import DatePicker from "react-datepicker";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import { Field, Form, Formik } from "formik";
import { Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { axiosInstance } from "../../lib/axios";
import * as Yup from "yup";
import CustomInput from "../inputs/custom-input";
import CountrySelect from "../inputs/countries-select";
import CitySelect from "../inputs/cities-select";
import MunicipalitySelect from "../inputs/municipalities-select";
import BusinessTypeSelect from "../inputs/cipher-select";
import CipherSelect from "../inputs/cipher-select";
import { Cipher } from "../../enums/cipher";
import StreetSelect from "../inputs/streets-select";
import StreetNumberSelect from "../inputs/street-numbers-select";

export default function InvestorForm() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [municipalityId, setMunicipalityId] = useState("");
  const [streetId, setStreetId] = useState("");

  function handleSubmit(values) {
    setLoading(true);
    setError("");

    axiosInstance
      .post("register-investor", values)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        setError(response.response.data.message);
      })
      .then(() => {
        setLoading(false);
      });
  }

  const registerInvestorSchema = Yup.object().shape({
    username: Yup.string().required("Field is required."),
    password: Yup.string().required("Field is required."),
    email: Yup.string()
      .email("Wrong email format.")
      .required("Field is required."),
    firstName: Yup.string().required("Field is required."),
    lastName: Yup.string().required("Field is required."),
    tin: Yup.string().required("Field is required."),
    legalEntityName: Yup.string().required("Field is required."),
    website: Yup.string().required("Field is required."),
    establishmentDate: Yup.string().required("Field is required."),
    registrationNumber: Yup.string().required("Field is required."),
    streetId: Yup.string().required("Field is required.").uuid("Wrong id"),
    streetNumberId: Yup.string()
      .required("Field is required.")
      .uuid("Wrong id"),
    municipalityId: Yup.string()
      .required("Field is required.")
      .uuid("Wrong id"),
    cityId: Yup.string().required("Field is required.").uuid("Wrong id"),
    countryId: Yup.string().required("Field is required.").uuid("Wrong id"),
    phone: Yup.string().required("Field is required."),
    instagramLink: Yup.string().required("Field is required."),
    businessTypeId: Yup.string()
      .required("Field is required.")
      .uuid("Wrong id"),
    employeeNumber: Yup.number()
      .positive("The number must be positive.")
      .required("Field is required."),
    currentCompanyPhase: Yup.string().required("Field is required."),
    lastThreeYearIncome: Yup.number().required("Field is required."),
    lastThreeYearProfit: Yup.number().required("Field is required."),
    investorType: Yup.string().required("Field is required."),
    providedServiceTypes: Yup.string().required("Field is required."),
    minAmountOfMoney: Yup.number()
      .required("Field is required.")
      .positive("The number must be positive."),
    maxAmountOfMoney: Yup.number()
      .required("Field is required.")
      .positive("The number must be positive."),
    logo: Yup.string().required("Field is required."),
  });

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        firstName: "",
        middleName: "",
        lastName: "",
        tin: "",
        legalEntityName: "",
        website: "",
        establishmentDate: new Date(),
        registrationNumber: "",
        streetId: "",
        streetNumberId: "",
        municipality: "",
        cityId: "",
        countryId: "",
        phone: "",
        facebookLink: "",
        twitterLink: "",
        linkedInLink: "",
        instagramLink: "",
        businessTypeId: "",
        areasOfInterestId: "",
        profesionalSkillsId: "",
        employeeNumber: "",
        currentCompanyPhase: "",
        lastThreeYearIncome: "",
        lastThreeYearProfit: "",
        investorType: "",
        providedServiceTypes: "",
        minAmountOfMoney: "",
        maxAmountOfMoney: "",
        logo: "",
      }}
      validationSchema={registerInvestorSchema}
      onSubmit={handleSubmit}
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
              />
            </Col>
            <Col>
              <CustomInput
                label="Password"
                name="password"
                type="password"
                required="true"
                errors={errors}
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
              />
            </Col>
            <Col>
              <CustomInput
                label="Middle name"
                name="middleName"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Last name"
                name="lastName"
                required="true"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Email"
                name="email"
                required="true"
                errors={errors}
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
              />
            </Col>
            <Col>
              <CustomInput
                label="Legal entity name"
                name="legalEntityName"
                required="true"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Website"
                name="website"
                required="true"
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field name="establishmentDate">
                {({ field, meta, form: { setFieldValue } }) => (
                  <FormGroup className="mb-3">
                    <FormLabel>Establishment date</FormLabel>
                    <DatePicker
                      className="form-control"
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
            </Col>
            <Col>
              <CustomInput
                label="Registration number"
                name="registrationNumber"
                required="true"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Phone"
                name="phone"
                required="true"
                errors={errors}
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
                      <div className="text-danger">{errors.municipalityId}</div>
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
                      <div className="text-danger">{errors.streetNumberId}</div>
                    ) : null}
                  </FormGroup>
                )}
              </Field>
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                label="Linked In"
                name="linkedInLink"
                required="true"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Facebook"
                name="facebookLink"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput label="Twitter" name="twitterLink" errors={errors} />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                label="Instagram"
                name="instagramLink"
                errors={errors}
              />
            </Col>
            <Col>
              <Field name="businessTypeId" id="businessTypeId">
                {({ field, meta, form: { setFieldValue } }) => (
                  <FormGroup className="mb-3">
                    <FormLabel>
                      Business type <span className="text-danger">*</span>
                    </FormLabel>
                    <CipherSelect
                      name="businessTypeId"
                      cipherType={Cipher.BUSINESS_TYPES}
                      onChange={(option) => {
                        setFieldValue(field.name, option.value);
                      }}
                    />
                    {errors.businessTypeId ? (
                      <div className="text-danger">{errors.businessTypeId}</div>
                    ) : null}
                  </FormGroup>
                )}
              </Field>
            </Col>
            <Col>
              <Field name="areasOfInterestId" id="areasOfInterestId">
                {({ field, meta, form: { setFieldValue } }) => (
                  <FormGroup className="mb-3">
                    <FormLabel>Areas of interest</FormLabel>
                    <CipherSelect
                      name="areasOfInterestId"
                      cipherType={Cipher.AREAS_OF_INTEREST}
                      onChange={(option) => {
                        setFieldValue(field.name, option.value);
                      }}
                    />
                    {errors.areasOfInterestId ? (
                      <div className="text-danger">
                        {errors.areasOfInterestId}
                      </div>
                    ) : null}
                  </FormGroup>
                )}
              </Field>
            </Col>
            <Col>
              <Field name="profesionalSkillsId" id="profesionalSkillsId">
                {({ field, meta, form: { setFieldValue } }) => (
                  <FormGroup className="mb-3">
                    <FormLabel>Professional skills</FormLabel>
                    <CipherSelect
                      name="profesionalSkillsId"
                      cipherType={Cipher.PROFESIONAL_SKILLS}
                      onChange={(option) => {
                        setFieldValue(field.name, option.value);
                      }}
                    />
                    {errors.profesionalSkillsId ? (
                      <div className="text-danger">
                        {errors.profesionalSkillsId}
                      </div>
                    ) : null}
                  </FormGroup>
                )}
              </Field>
            </Col>
            <Col>
              <CustomInput
                label="Employee number"
                name="employeeNumber"
                required="true"
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                label="Current company phase"
                name="currentCompanyPhase"
                required="true"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Last three year income"
                name="lastThreeYearIncome"
                required="true"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Last three year profit"
                name="lastThreeYearProfit"
                required="true"
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                label="Investor type"
                name="investorType"
                required="true"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Provided service types"
                name="providedServiceTypes"
                required="true"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Min amount of money"
                name="minAmountOfMoney"
                required="true"
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                label="Max amount of money"
                name="maxAmountOfMoney"
                required="true"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Logo"
                name="logo"
                required="true"
                errors={errors}
              />
            </Col>
          </Row>
          <Button
            variant="primary"
            type="submit"
            className="me-3"
            disabled={isLoading}
          >
            Register
          </Button>
          You don't have an account? <Link href="/login">Click here</Link> to
          login.
        </Form>
      )}
    </Formik>
  );
}
