import Link from "next/link";
import { Button } from "react-bootstrap";
import CipherTable from "../../../components/ciphers/table";
import AuthLayout from "../../../components/layout-auth";
import { CategoryType } from "../../../enums/category";

export default function DiscussionCategories() {
  return (
    <>
      <h1>Discussion categories</h1>
      <hr />

      <Link href="/ciphers/discussion-categories/create">
        <Button variant="primary" type="submit">
          Create dicsussion category
        </Button>
      </Link>

      <CipherTable
        fetchUrlPath={`categories/?entityName=${CategoryType.DISCUSSION}`}
        deleteUrlPath="categories"
      />
    </>
  );
}

DiscussionCategories.getLayout = function getLayout(page) {
  return (
    <AuthLayout isProtected={true} isAdmin={true}>
      {page}
    </AuthLayout>
  );
};
