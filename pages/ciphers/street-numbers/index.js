import Link from "next/link";
import { Button } from "react-bootstrap";
import CipherTable from "../../../components/ciphers/table";
import AuthLayout from "../../../components/layout-auth";

export default function StreetNumbers() {
  return (
    <>
      <h1>Street numbers</h1>
      <hr />

      <Link href="/ciphers/street-numbers/create">
        <Button variant="primary" type="submit">
          Create street number
        </Button>
      </Link>

      <CipherTable
        fetchUrlPath="street-numbers"
        deleteUrlPath="street-numbers"
      />
    </>
  );
}

StreetNumbers.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
