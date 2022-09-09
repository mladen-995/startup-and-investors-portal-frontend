import { getUser } from "../../services/user.service";
import { useEffect, useState } from "react";
import Router from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import DataTable from "react-data-table-component";
import AuthLayout from "../../components/layout-auth";
import { sessionOptions } from "../../lib/session";
import {
  Accordion,
  Button,
  Dropdown,
  FormControl,
  FormGroup,
  FormLabel,
  ListGroup,
  Modal,
} from "react-bootstrap";
import Link from "next/link";
import { axiosInstance } from "../../lib/axios";
import { Field, FieldArray, Form, Formik } from "formik";
import axios from "axios";
import { useUser } from "../../context/user-hook";

export default function CompletedSurveys() {
  const user = useUser();
  const [surveys, setSurveys] = useState([]);
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [surveyId, setSurveyId] = useState("");

  const loadSurveys = () => {
    axiosInstance
      .get("surveys?showUnanswered=false&showAnswered=true")
      .then((response) => {
        setSurveys(response.data.data);
      });
  };

  const handleClose = () => setShow(false);

  const handleShow = async (row) => {
    setShow(true);
    const response = await axiosInstance.get(`surveys-questions/${row.id}`);
    setSurveyId(row.id);
    setQuestions(response.data.data);
  };

  const loadAnswers = async (questionId) => {
    const response = await axiosInstance.get(
      `surveys/question-answers/${questionId}`
    );

    setAnswers(response.data.data);
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
          {(row.public ||
            (user?.isInvestor() && row.createdBy == user?.user?.id)) && (
            <Button variant="info" size="sm" onClick={() => handleShow(row)}>
              Stats
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h3>Completed</h3>
      <div className="table-wrapper">
        <DataTable columns={columns} data={surveys} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Survey statistics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Questions</h5>
          <Accordion>
            {questions.map((question, index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header onClick={() => loadAnswers(question.id)}>
                  #{index + 1} {question.question}
                </Accordion.Header>
                <Accordion.Body>
                  <h6>Answers</h6>
                  <ListGroup>
                    {answers.map((answer, index) => (
                      <ListGroup.Item>
                        #{index + 1} {answer}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
