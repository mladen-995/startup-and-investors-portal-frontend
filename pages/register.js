import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import InvestorForm from "../components/register-forms/investor-form";
import StartupForm from "../components/register-forms/startup-form";

export default function Register() {
  const [accountType, setAccountType] = useState("");

  function handleChange(e) {
    setAccountType(e.target.value);
  }

  let form;
  if (accountType === "investor") {
    form = <InvestorForm></InvestorForm>;
  } else if (accountType === "startup") {
    form = <StartupForm></StartupForm>;
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5" style={{ minWidth: "500px", width: "50%" }}>
        <Card.Body>
          <h1>Register</h1>
          <Form.Group className="mb-3">
            <Form.Label>Account type</Form.Label>
            <Form.Select onChange={handleChange}>
              <option value="">Please select an account type...</option>
              <option value="investor">Investor</option>
              <option value="startup">Startup</option>
            </Form.Select>
          </Form.Group>
          {form}
        </Card.Body>
      </Card>
    </Container>
  );
}
