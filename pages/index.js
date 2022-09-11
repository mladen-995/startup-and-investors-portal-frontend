import AuthLayout from "../components/layout-auth";

export default function Dashboard() {
  return (
    <>
      <h1>Welcome to Portal!</h1>
      <hr />
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
