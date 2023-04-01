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
import CompletedSurveys from "../../components/surveys/completed";
import NotCompletedSurveys from "../../components/surveys/not-completed";
import { Role } from "../../enums/role";
import { useUser } from "../../hooks/user-hook";

export default function Surveys() {
  const user = useUser();

  const [surveys, setSurveys] = useState([]);

  const [show, setShow] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [surveyId, setSurveyId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setShow(true);
    axiosInstance.get(`surveys-questions/${row.id}`).then((response) => {
      setSurveyId(row.id);
      setQuestions(response.data.data);
    });
  };

  const handleSubmit = (values) => {
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
    axiosInstance.get("surveys").then((response) => {
      setSurveys(response.data.data);
    });
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
          <Button onClick={() => handleShow(row)}>Submit</Button>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Actions
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ),
    },
  ];

  if (user?.isInvestor() || user?.isAdministrator()) {
    return (
      <div>
        <h1>Surveys</h1>
        <hr />
        <Link href="/surveys/create">
          <Button variant="primary" type="submit">
            Create survey
          </Button>
        </Link>
        <CompletedSurveys></CompletedSurveys>
      </div>
    );
  } else if (user?.isStartup()) {
    return (
      <div>
        <h1>Surveys</h1>
        <hr />
        <div className="row">
          <div className="col-6">
            <CompletedSurveys></CompletedSurveys>
          </div>
          <div className="col-6">
            <NotCompletedSurveys></NotCompletedSurveys>
          </div>
        </div>
      </div>
    );
  }
}

Surveys.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
