import Link from "next/link";
import { Button } from "react-bootstrap";
import CipherTable from "../../../components/ciphers/table";
import AuthLayout from "../../../components/layout-auth";
import { Category } from "../../../enums/category";

export default function NewsCategories() {
  return (
    <>
      <h1>News categories</h1>
      <hr />

      <Link href="/ciphers/news-categories/create">
        <Button variant="primary" type="submit">
          Create news category
        </Button>
      </Link>

      <CipherTable
        fetchUrlPath={`categories/?entityName=${Category.NEWS}`}
        deleteUrlPath="categories"
      />
    </>
  );
}

NewsCategories.getLayout = function getLayout(page) {
  return <AuthLayout isProtected={true}>{page}</AuthLayout>;
};
