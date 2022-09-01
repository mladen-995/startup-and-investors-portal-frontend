import AuthLayout from "./../components/layout-auth";
import { getUser } from "./../services/user.service";
import { useEffect, useState } from "react";
import Router from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
},
sessionOptions);

export default function MyProfile({ user }) {
  console.log(user);
  return <h1>{user.firstName}</h1>;
}

MyProfile.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
