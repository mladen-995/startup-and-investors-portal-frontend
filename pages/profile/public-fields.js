import { useEffect, useState } from "react";
import Router from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import DataTable from "react-data-table-component";
import AuthLayout from "../../components/layout-auth";
import { sessionOptions } from "../../lib/session";
import {
  Button,
  Col,
  Dropdown,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import { axiosInstance } from "../../lib/axios";
import { Field, FieldArray, Form, Formik } from "formik";
import CompletedSurveys from "../../components/surveys/completed";
import NotCompletedSurveys from "../../components/surveys/not-completed";
import { Role } from "../../enums/role";
import { useUser } from "../../hooks/user-hook";

export default function PublicFields() {
  const user = useUser();
  const [initialValues, setInitialValues] = useState();

  const fields = {
    businessTypeId: "Business type",
    cityId: "City",
    countryId: "Country",
    email: "Email",
    establishmentDate: "Establishment date",
    firstName: "First name",
    lastName: "Last name",
    legalEntityName: "Legal entity name",
    middleName: "Middle name",
    municipalityId: "Municipality",
    phone: "Phone",
    registrationNumber: "Registration number",
    streetId: "Street",
    streetNumberId: "Street number",
    tin: "Tin",
    website: "Website",
  };

  const getKeyValuePairsOfFields = () => {
    let keyLabelArray = [];

    for (const key in fields) {
      keyLabelArray.push({
        key: key,
        label: fields[key],
      });
    }

    return keyLabelArray;
  };

  const updateInitialValues = (values = {}) => {
    let obj = {};

    return { website: false };

    for (const field in fields) {
      obj[field] = values[field] ? values[field] : false;
    }

    console.log(obj);

    setInitialValues(obj);
  };

  function handleSubmit(values) {
    axiosInstance.put(`startup-public-fields/${user.user.id}`, values);
  }

  useEffect(() => {
    const loadFields = async () => {
      const {
        data: { data },
      } = await axiosInstance.get(`startup-public-fields/${user.user.id}`);

      updateInitialValues(data);
    };

    if (user) {
      loadFields();
    }
  }, [user]);

  return (
    <div>
      <h1>Public fields</h1>
      <hr />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form>
          <>
            {getKeyValuePairsOfFields().map((fieldItem) => (
              <Field
                id={fieldItem.key}
                name={fieldItem.key}
                key={fieldItem.key}
                type="checkbox"
              >
                {({ field, form: { setFieldValue } }) => (
                  <FormCheck
                    inline
                    className="mb-3"
                    type="checkbox"
                    id={fieldItem.key}
                    label={fieldItem.label}
                    value={field.value}
                    onChange={(val) => {
                      console.log(field.onChange);
                      setFieldValue(field.name, val);
                    }}
                  />
                )}
              </Field>
            ))}
          </>
          <Row>
            <Col>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Formik>
    </div>
  );
}

PublicFields.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
