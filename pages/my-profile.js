import AuthLayout from "./../components/layout-auth";
import { getUser } from "./../services/user.service";
import { useEffect, useState } from "react";
import Router from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import { Field, Form, Formik } from "formik";
import { Col, FormGroup, FormLabel, Row, Tab, Tabs } from "react-bootstrap";
import CustomInput from "../components/inputs/custom-input";
import StreetNumberSelect from "../components/inputs/street-numbers-select";
import StreetSelect from "../components/inputs/streets-select";
import MunicipalitySelect from "../components/inputs/municipalities-select";
import CitySelect from "../components/inputs/cities-select";
import CountrySelect from "../components/inputs/countries-select";
import { useUser } from "../context/user-hook";
import ChangePassword from "../components/my-profile/change-password";
import PublicFields from "../components/my-profile/public-fields";
import MutedInvestors from "../components/my-profile/muted-investors";
import ProfileInfo from "../components/my-profile/profile-info";

export default function MyProfile() {
  const user = useUser();

  if (!user) {
    return;
  }

  return (
    <>
      <h1>My profile</h1>
      <hr />

      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
          <ProfileInfo />
        </Tab>
        <Tab eventKey="profile" title="Change password">
          <ChangePassword />
        </Tab>
        {user && user.isStartup() && (
          <Tab eventKey="publicFields" title="Public fields">
            <PublicFields />
          </Tab>
        )}
        {user && !user.isAdministrator() && (
          <Tab eventKey="mutedInvestors" title="Muted investors">
            <MutedInvestors />
          </Tab>
        )}
      </Tabs>
    </>
  );
}

MyProfile.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
