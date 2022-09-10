import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CipherTable from "../../../components/ciphers/table";
import AuthLayout from "../../../components/layout-auth";
import { axiosInstance } from "../../../lib/axios";

export default function Countries() {
  return (
    <>
      <h1>Countries</h1>
      <hr />

      <Link href="/ciphers/countries/create">
        <Button variant="primary" type="submit">
          Create country
        </Button>
      </Link>

      <CipherTable fetchUrlPath="countries" deleteUrlPath="countries" />
    </>
  );
}

Countries.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
