import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CipherTable from "../../../components/ciphers/table";
import AuthLayout from "../../../components/layout-auth";
import { Cipher } from "../../../enums/cipher";
import { axiosInstance } from "../../../lib/axios";

export default function BusinessTypes() {
  return (
    <>
      <h1>Business types</h1>
      <hr />

      <Link href="/ciphers/business-types/create">
        <Button variant="primary" type="submit">
          Create business type
        </Button>
      </Link>

      <CipherTable
        fetchUrlPath={`ciphers/${Cipher.BUSINESS_TYPES}`}
        deleteUrlPath="ciphers"
      />
    </>
  );
}

BusinessTypes.getLayout = function getLayout(page) {
  return (
    <AuthLayout isProtected={true} isAdmin={true}>
      {page}
    </AuthLayout>
  );
};
