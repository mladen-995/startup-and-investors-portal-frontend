import Link from "next/link";
import { Button } from "react-bootstrap";
import CipherTable from "../../../components/ciphers/table";
import AuthLayout from "../../../components/layout-auth";

export default function Cities() {
  return (
    <>
      <h1>Cities</h1>
      <hr />

      <Link href="/ciphers/cities/create">
        <Button variant="primary" type="submit">
          Create city
        </Button>
      </Link>

      <CipherTable fetchUrlPath="cities" deleteUrlPath="cities" />
    </>
  );
}

Cities.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
