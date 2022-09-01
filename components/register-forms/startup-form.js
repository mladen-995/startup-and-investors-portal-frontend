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

export default function StartupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [tin, setTin] = useState("");
  const [legalEntityName, setLegalEntityName] = useState("");
  const [website, setWebsite] = useState("");
  const [establishmentDate, setEstablishmentDate] = useState(new Date());
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [currentCompanyPhase, setCurrentCompanyPhase] = useState("");
  const [lastThreeYearIncome, setLastThreeYearIncome] = useState("");
  const [lastThreeYearProfit, setLastThreeYearProfit] = useState("");
  const [projectProposal, setProjectProposal] = useState("");
  const [requiredAmountOfMoney, setRequiredAmountOfMoney] = useState("");
  const [intellectualPropertyStatus, setIntellectualPropertyStatus] =
    useState("");
  const [patentInfo, setPatentInfo] = useState("");
  const [logo, setLogo] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    axios.defaults.baseURL = "http://localhost:3001/api/";

    axios
      .post("register-startup", {
        email,
        password,
        firstName,
        lastName,
        middleName,
        tin,
        legalEntityName,
        website,
        establishmentDate,
        registrationNumber,
        address,
        municipality,
        city,
        country,
        phone,
        facebookLink,
        twitterLink,
        linkedInLink,
        instagramLink,
        businessType,
        employeeNumber,
        currentCompanyPhase,
        lastThreeYearIncome,
        lastThreeYearProfit,
        projectProposal,
        requiredAmountOfMoney,
        intellectualPropertyStatus,
        patentInfo,
        logo,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        setError(response.response.data.message);
      })
      .then(() => {
        setLoading(false);
      });
  }

  return (
    <Form className="justify-content-center" onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Middle name</Form.Label>
        <Form.Control
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Tin</Form.Label>
        <Form.Control
          type="text"
          value={tin}
          onChange={(e) => setTin(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Legal entity name</Form.Label>
        <Form.Control
          type="text"
          value={legalEntityName}
          onChange={(e) => setLegalEntityName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Website</Form.Label>
        <Form.Control
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Establishment date</Form.Label>
        <DatePicker
          className="form-control"
          selected={establishmentDate}
          onChange={(date) => setEstablishmentDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Registration number</Form.Label>
        <Form.Control
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Municipality</Form.Label>
        <Form.Control
          type="text"
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Facebook</Form.Label>
        <Form.Control
          type="text"
          value={facebookLink}
          onChange={(e) => setFacebookLink(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Twitter</Form.Label>
        <Form.Control
          type="text"
          value={twitterLink}
          onChange={(e) => setTwitterLink(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>LinkedIn</Form.Label>
        <Form.Control
          type="text"
          value={linkedInLink}
          onChange={(e) => setLinkedInLink(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Instagram</Form.Label>
        <Form.Control
          type="text"
          value={instagramLink}
          onChange={(e) => setInstagramLink(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Business Type</Form.Label>
        <Form.Control
          type="text"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Employee number</Form.Label>
        <Form.Control
          type="text"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Current company phase</Form.Label>
        <Form.Control
          type="text"
          value={currentCompanyPhase}
          onChange={(e) => setCurrentCompanyPhase(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Last three year income</Form.Label>
        <Form.Control
          type="text"
          value={lastThreeYearIncome}
          onChange={(e) => setLastThreeYearIncome(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Last three year profit</Form.Label>
        <Form.Control
          type="text"
          value={lastThreeYearProfit}
          onChange={(e) => setLastThreeYearProfit(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Set project proposal</Form.Label>
        <Form.Control
          type="text"
          value={projectProposal}
          onChange={(e) => setProjectProposal(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Required amount of money</Form.Label>
        <Form.Control
          type="text"
          value={requiredAmountOfMoney}
          onChange={(e) => setRequiredAmountOfMoney(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Intellectual property status</Form.Label>
        <Form.Control
          type="text"
          value={intellectualPropertyStatus}
          onChange={(e) => setIntellectualPropertyStatus(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Patent info</Form.Label>
        <Form.Control
          type="text"
          value={patentInfo}
          onChange={(e) => setPatentInfo(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Logo</Form.Label>
        <Form.Control
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />
      </Form.Group>
      {error ? <Alert variant="danger">Validation error</Alert> : null}
      <Button
        variant="primary"
        type="submit"
        className="me-3"
        disabled={isLoading}
      >
        Login
      </Button>
      You don't have an account? <Link href="/login">Click here</Link> to login.
    </Form>
  );
}
