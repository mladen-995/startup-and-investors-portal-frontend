import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import { axiosInstance } from "../lib/axios";
import { useUser } from "../hooks/user-hook";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import DeleteButton from "../components/delete-button";
import DeclineDeleteRequestButton from "../components/decline-delete-request-button";
import ArchiveButton from "../components/archive-button";
import RequestDeleteButton from "../components/request-delete-button.js";
import AdDetailsModal from "../components/ads/details-modal";
import AuthLayout from "../components/layout-auth";
import moment from "moment";
import { Field, Formik, Form } from "formik";
import DatePicker from "react-datepicker";

export default function Statistics() {
  const user = useUser();
  const [stats, setStats] = useState(null);
  const [error, setErrors] = useState(null);

  const statsParts = [
    {
      label: "Created ads",
      field: "adsCount",
    },
    {
      label: "Created discussions",
      field: "discussionsCount",
    },
    {
      label: "Created news",
      field: "newsCount",
    },
    {
      label: "Created notifications",
      field: "notificationsCount",
    },
    {
      label: "Created surveys",
      field: "surveysCount",
    },
    {
      label: "Registered users",
      field: "usersCount",
    },
  ];

  const loadStats = async (values) => {
    setErrors(false);
    try {
      const {
        data: { data },
      } = await axiosInstance.post("statistics", values);

      setStats(data);
    } catch (error) {
      if (error.response.status == 422) {
        setErrors(error.response.data.message);
      }
    }
  };

  const loadInitial = () => {
    loadStats({
      dateFrom: moment(),
      dateTo: moment(),
    });
  };

  useEffect(() => {
    if (user) {
      loadInitial();
    }
  }, [user]);

  return (
    <div>
      <h1>Statistics</h1>
      <hr />

      <Formik
        initialValues={{
          dateFrom: new Date(),
          dateTo: new Date(),
        }}
        onSubmit={loadStats}
      >
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Col>
                <Field name="dateFrom">
                  {({ field, form: { setFieldValue } }) => (
                    <FormGroup className="mb-3">
                      <FormLabel>Date from</FormLabel>
                      <DatePicker
                        className="form-control"
                        value={field.value}
                        onChange={(val) => {
                          setFieldValue(field.name, val);
                        }}
                        selected={
                          (field.value && new Date(field.value)) || null
                        }
                        dateFormat="dd/MM/yyyy"
                      />
                    </FormGroup>
                  )}
                </Field>
              </Col>
              <Col>
                <Field name="dateTo">
                  {({ field, form: { setFieldValue } }) => (
                    <FormGroup className="mb-3">
                      <FormLabel>Date to</FormLabel>
                      <DatePicker
                        className="form-control"
                        value={field.value}
                        onChange={(val) => {
                          setFieldValue(field.name, val);
                        }}
                        selected={
                          (field.value && new Date(field.value)) || null
                        }
                        dateFormat="dd/MM/yyyy"
                      />
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button type="submit">Load statistics</Button>
          </Form>
        )}
      </Formik>
      <hr />
      <Row>
        {statsParts.map((statsPart, index) => (
          <>
            <Col key={index} className="mb-3" xs={4}>
              <Card
                style={{
                  width: "18rem",
                  "margin-left": "auto",
                  "margin-right": "auto",
                }}
                className="text-center"
              >
                <Card.Header>{statsPart.label}</Card.Header>
                <Card.Body>
                  <h2>{stats && stats[statsPart.field]}</h2>
                </Card.Body>
              </Card>
            </Col>
          </>
        ))}
      </Row>

      <NotificationContainer />
    </div>
  );
}

Statistics.getLayout = function getLayout(page) {
  return (
    <AuthLayout isProtected={true} isAdmin={true}>
      {page}
    </AuthLayout>
  );
};
