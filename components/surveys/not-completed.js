import { getUser } from "../../services/user.service";
import { useEffect, useState } from "react";
import Router from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import DataTable from "react-data-table-component";
import AuthLayout from "../../components/layout-auth";
import { sessionOptions } from "../../lib/session";
import {
  Button,
  Dropdown,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";
import Link from "next/link";
import { axiosInstance } from "../../lib/axios";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import SweetAlert from "react-bootstrap-sweetalert";

export default function NotCompletedSurveys() {
  const [notificationAlertShow, setNotificationAlertShow] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [surveyId, setSurveyId] = useState("");

  const CompleteSurveySchema = Yup.object().shape({
    answers: Yup.array().required().of(Yup.string().required("Required")),
  });

  const loadSurveys = () => {
    axiosInstance
      .get("surveys?showUnanswered=true&showAnswered=false")
      .then((response) => {
        setSurveys(response.data.data);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setShow(true);
    axiosInstance.get(`surveys-questions/${row.id}`).then((response) => {
      setSurveyId(row.id);
      setQuestions(response.data.data);
    });
  };

  const handleDoNotFillIn = async (row) => {
    await axiosInstance.post(`surveys/reject/${row.id}`);
    loadSurveys();
  };

  const handleSubmit = async (values) => {
    if (values.answers.length != questions.length) {
      alert("Fill in all answers.");
      return;
    }

    let answers = {
      answersObjects: questions.map((question, index) => {
        return { questionId: question.id, answer: values.answers[index] };
      }),
    };

    await axiosInstance.post(`surveys/answer/${surveyId}`, answers);
    setNotificationAlertShow(true);
  };

  useEffect(() => {
    loadSurveys();
  }, []);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Publicly visible",
      selector: (row) => row.public,
      cell: (row) => {
        return row.public ? "Yes" : "No";
      },
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <SweetAlert
            title="Success"
            type="success"
            show={notificationAlertShow}
            onConfirm={() => {
              Router.push("/surveys");
              setNotificationAlertShow(false);
            }}
          >
            Survey is successfully completed.
          </SweetAlert>

          <Dropdown>
            <Dropdown.Toggle variant="success" size="sm" id="dropdown-basic">
              Actions
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleShow(row)}>
                Fill in
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDoNotFillIn(row)}>
                Don't fill in
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ),
    },
  ];

  return (
    <div>
      <h3>Not completed</h3>
      <div className="table-wrapper">
        <DataTable columns={columns} data={surveys} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Formik
          initialValues={{ answers: [] }}
          validationSchema={CompleteSurveySchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Fill in survey</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FieldArray name="answers">
                  <>
                    {questions.map((question, index) => (
                      <Field
                        name={`answers.${index}`}
                        id={`answers.${index}`}
                        key={`answers.${index}`}
                      >
                        {({ field, form, meta }) => (
                          <FormGroup className="mb-3">
                            <FormLabel>{question.question}</FormLabel>
                            <FormControl
                              id={`answers.${index}`}
                              type={"text"}
                              value={field.value || ""}
                              onChange={field.onChange}
                              className={
                                errors[field.name] ? "is-invalid" : null
                              }
                            />
                            {errors[field.name] ? (
                              <div className="invalid-feedback">
                                {errors[field.name]}
                              </div>
                            ) : null}
                          </FormGroup>
                        )}
                      </Field>
                    ))}
                  </>
                </FieldArray>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
