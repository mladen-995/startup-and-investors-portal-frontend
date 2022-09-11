import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CipherTable from "../../../components/ciphers/table";
import AuthLayout from "../../../components/layout-auth";
import { Cipher } from "../../../enums/cipher";
import { axiosInstance } from "../../../lib/axios";

export default function ProfessionalSkills() {
  return (
    <>
      <h1>Professional skills</h1>
      <hr />

      <Link href="/ciphers/professional-skills/create">
        <Button variant="primary" type="submit">
          Create professional skill
        </Button>
      </Link>

      <CipherTable
        fetchUrlPath={`ciphers/${Cipher.PROFESIONAL_SKILLS}`}
        deleteUrlPath="ciphers"
      />
    </>
  );
}

ProfessionalSkills.getLayout = function getLayout(page) {
  return (
    <AuthLayout isProtected={true} isAdmin={true}>
      {page}
    </AuthLayout>
  );
};
