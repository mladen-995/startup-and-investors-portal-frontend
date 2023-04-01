import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, FormCheck, Row } from "react-bootstrap";
import { useUser } from "../../hooks/user-hook";
import { axiosInstance } from "../../lib/axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function PublicFields() {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState([]);

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

  useEffect(() => {
    const loadFields = async () => {
      const response = await axiosInstance.get(
        `startup-public-fields/${user.user.id}`
      );

      updateInitialValues(response.data.data);
    };

    if (user) {
      loadFields();
    }
  }, [user]);

  const updateInitialValues = (values = {}) => {
    let obj = {};

    for (const field in fields) {
      obj[field] = values[field] ? values[field] : false;
    }

    setInitialValues(obj);
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

  const handleSubmit = async (values) => {
    setLoading(true);
    await axiosInstance.put(`startup-public-fields/${user.user.id}`, values);
    setLoading(false);
    NotificationManager.success("Fields are successfully changed.");
  };

  return (
    <>
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
                {({ field, meta, form: { setFieldValue } }) => (
                  <FormCheck
                    inline
                    className="mb-3"
                    type="checkbox"
                    id={fieldItem.key}
                    label={fieldItem.label}
                    value={field.value}
                    checked={field.value}
                    onChange={(e) => {
                      setFieldValue(field.name, e.target.checked);
                    }}
                  />
                )}
              </Field>
            ))}
          </>
          <Row>
            <Col>
              <Button variant="primary" type="submit" disabled={loading}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Formik>
      <NotificationContainer />
    </>
  );
}
