import Link from "next/link";
import { Button } from "react-bootstrap";
import CipherTable from "../../../components/ciphers/table";
import AuthLayout from "../../../components/layout-auth";

export default function Streets() {
  return (
    <>
      <h1>Streets</h1>
      <hr />

      <Link href="/ciphers/streets/create">
        <Button variant="primary" type="submit">
          Create street
        </Button>
      </Link>

      <CipherTable fetchUrlPath="streets" deleteUrlPath="streets" />
    </>
  );
}

Streets.getLayout = function getLayout(page) {
  return (
    <AuthLayout isProtected={true} isAdmin={true}>
      {page}
    </AuthLayout>
  );
};
