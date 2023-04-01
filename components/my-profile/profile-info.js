import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button, Col, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useUser } from "../../hooks/user-hook";
import { axiosInstance } from "../../lib/axios";
import CitySelect from "../inputs/cities-select";
import CountrySelect from "../inputs/countries-select";
import CustomInput from "../inputs/custom-input";
import MunicipalitySelect from "../inputs/municipalities-select";
import StreetNumberSelect from "../inputs/street-numbers-select";
import StreetSelect from "../inputs/streets-select";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import * as Yup from "yup";

export default function ProfileInfo() {
  const user = useUser();

  const handleSave = async (values) => {
    await axiosInstance.put(`update-investor/${user.user.id}`);
    NotificationManager.success("Profile is successfully updated.");
  };

  return (
    <>
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
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Field is required."),
          email: Yup.string()
            .email("Wrong email format.")
            .required("Field is required."),
          firstName: Yup.string().required("Field is required."),
          lastName: Yup.string().required("Field is required."),
          tin: Yup.string().required("Field is required."),
          legalEntityName: Yup.string().required("Field is required."),
          website: Yup.string().required("Field is required."),
          phone: Yup.string().required("Field is required."),
        })}
        onSubmit={handleSave}
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
            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>
      <NotificationContainer />
    </>
  );
}
