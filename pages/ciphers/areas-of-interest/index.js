import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CipherTable from "../../../components/ciphers/table";
import AuthLayout from "../../../components/layout-auth";
import { Cipher } from "../../../enums/cipher";
import { axiosInstance } from "../../../lib/axios";

export default function AreasOfInterest() {
  return (
    <>
      <h1>Areas of interest</h1>
      <hr />

      <Link href="/ciphers/areas-of-interest/create">
        <Button variant="primary" type="submit">
          Create area of interest
        </Button>
      </Link>

      <CipherTable
        fetchUrlPath={`ciphers/${Cipher.AREAS_OF_INTEREST}`}
        deleteUrlPath="ciphers"
      />
    </>
  );
}

AreasOfInterest.getLayout = function getLayout(page) {
  return (
    <AuthLayout isProtected={true} isAdmin={true}>
      {page}
    </AuthLayout>
  );
};
