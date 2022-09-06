import { useEffect, useState } from "react";
import Router from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import AuthLayout from "../components/layout-auth";
import { sessionOptions } from "../lib/session";
import { Field, FieldArray, Form, Formik } from "formik";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Row,
} from "react-bootstrap";
import StartupSearchModal from "../components/search/startups/startups-modal";
import SearchModal from "../components/search/startups/search-modal";

export default function Search() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedStartups, setSelectedStartups] = useState([]);

  const onSelect = (startups) => {
    setSelectedStartups((prev) => prev.concat(startups));
    setModalShow(false);
  };

  return (
    <>
      <h1>Search</h1>

      <Button
        onClick={() => {
          setModalShow(true);
        }}
      >
        Search
      </Button>
      <StartupSearchModal
        show={modalShow}
        onClose={() => setModalShow(false)}
        onSelect={onSelect}
        selectedStartups={selectedStartups.map((startup) => startup.id)}
      />

      {selectedStartups.map((startup) => (
        <p>{startup.id}</p>
      ))}
    </>
  );
}

Search.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
