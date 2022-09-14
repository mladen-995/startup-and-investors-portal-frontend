import AuthLayout from "../components/layout-auth";
import Router, { useRouter } from "next/router";

export default function Dashboard() {
  Router.push("/news");
  // return (
  //   <>
  //     <h1>Welcome to Portal!</h1>
  //     <hr />
  //   </>
  // );
}

Dashboard.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
