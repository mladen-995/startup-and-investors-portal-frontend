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
import axios from "axios";
import * as Yup from "yup";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user, surveys: {} },
  };
},
sessionOptions);

export default function NotCompletedSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [surveyId, setSurveyId] = useState("");

  const SurveyCompleteSchema = Yup.object().shape({
    answers: Yup.array("type must be an array.").of(
      Yup.object().shape({
        answer: Yup.string().required("Answer required").nullable(),
      })
    ),
  });

  const loadSurveys = () => {
    axiosInstance.get("surveys?showUnanswered=true").then((response) => {
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

  const handleSubmit = (values) => {
    console.log(values);
    return;
    let answers = {
      answersObjects: questions.map((question, index) => {
        return { questionId: question.id, answer: values.answers[index] };
      }),
    };

    axiosInstance.post(`surveys/answer/${surveyId}`, answers).then((res) => {
      alert("uspesno");
    });
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
          initialValues={{ answers: {} }}
          // validationSchema={SurveyCompleteSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {questions.map((question, index) => (
                  <Field
                    name={`answers.${index}.answer`}
                    id={`answers.${index}.answer`}
                    key={`answers.${index}.answer`}
                  >
                    {({ field, form, meta }) => (
                      <FormGroup className="mb-3">
                        <FormLabel>{question.question}</FormLabel>
                        <FormControl
                          id={`answers.${index}.answer`}
                          type={"text"}
                          value={field.value || ""}
                          onChange={field.onChange}
                          className={errors.title ? "is-invalid" : null}
                        />
                        {JSON.stringify(errors)}
                        {errors.title ? (
                          <div className="invalid-feedback">{errors.title}</div>
                        ) : null}
                      </FormGroup>
                    )}
                  </Field>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
