import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button, Col, FormGroup, FormLabel, Row } from "react-bootstrap";
import CitySelect from "../../inputs/cities-select";
import CountrySelect from "../../inputs/countries-select";
import CustomInput from "../../inputs/custom-input";
import MunicipalitySelect from "../../inputs/municipalities-select";
import StreetNumberSelect from "../../inputs/street-numbers-select";
import StreetSelect from "../../inputs/streets-select";
import DatePicker from "react-datepicker";
import CipherSelect from "../../inputs/cipher-select";
import { Cipher } from "../../../enums/cipher";

export default function StartupSearchForm(props) {
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [municipalityId, setMunicipalityId] = useState("");
  const [streetId, setStreetId] = useState("");

  const handleSubmit = async (values) => {
    const preparedFilters = {};

    for (const key in values) {
      if (values[key]) {
        preparedFilters[key] = values[key];
      }
    }

    props.onSubmit(new URLSearchParams(preparedFilters).toString());
  };

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
        establishmentDate: null,
        registrationNumber: "",
        streetId: "",
        streetNumberId: "",
        municipalityId: "",
        cityId: "",
        countryId: "",
        phone: "",
        facebookLink: "",
        twitterLink: "",
        linkedInLink: "",
        instagramLink: "",
        businessTypeId: "",
        areasOfInterestId: null,
        profesionalSkillsId: null,
        employeeNumber: "",
        currentCompanyPhase: "",
        lastThreeYearIncome: "",
        lastThreeYearProfit: "",
        projectProposal: "",
        requiredAmountOfMoney: "",
        intellectualPropertyStatus: "",
        logo: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Row>
            <Col>
              <CustomInput
                label="First name"
                name="firstName"
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
              <CustomInput label="Last name" name="lastName" errors={errors} />
            </Col>
            <Col>
              <CustomInput label="Email" name="email" errors={errors} />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput label="Tin" name="tin" errors={errors} />
            </Col>
            <Col>
              <CustomInput
                label="Legal entity name"
                name="legalEntityName"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput label="Website" name="website" errors={errors} />
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
                      selected={null}
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
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput label="Phone" name="phone" errors={errors} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field name="countryId" id="countryId">
                {({ field, meta, form: { setFieldValue } }) => (
                  <FormGroup className="mb-3">
                    <FormLabel>Country</FormLabel>
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
                    <FormLabel>City</FormLabel>
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
                    <FormLabel>Municipality</FormLabel>
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
                    <FormLabel>Street</FormLabel>
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
                    <FormLabel>Street number</FormLabel>
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
                    <FormLabel>Business type</FormLabel>
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
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                label="Current company phase"
                name="currentCompanyPhase"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Last three year income"
                name="lastThreeYearIncome"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Last three year profit"
                name="lastThreeYearProfit"
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                label="Project proposal"
                name="projectProposal"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Requred amount of money"
                name="requiredAmountOfMoney"
                errors={errors}
              />
            </Col>
            <Col>
              <CustomInput
                label="Intellectual property status"
                name="intellectualPropertyStatus"
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                label="Patent info"
                name="patentInfo"
                errors={errors}
              />
            </Col>
          </Row>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Search
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
