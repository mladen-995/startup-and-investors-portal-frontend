import Link from "next/link";
import { Button } from "react-bootstrap";
import CipherTable from "../../../components/ciphers/table";
import AuthLayout from "../../../components/layout-auth";

export default function Municipalities() {
  return (
    <>
      <h1>Municipalities</h1>
      <hr />

      <Link href="/ciphers/municipalities/create">
        <Button variant="primary" type="submit">
          Create municipality
        </Button>
      </Link>

      <CipherTable
        fetchUrlPath="municipalities"
        deleteUrlPath="municipalities"
      />
    </>
  );
}

Municipalities.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
