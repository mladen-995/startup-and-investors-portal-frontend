import { useEffect } from "react";
import useSWR from "swr";

export function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
  const { data, error } = useSWR("/api/user", (url) => {
    fetch(url).then((res) => res.json());
  });

  console.log(data, error);

  //   useEffect(() => {
  //     // if no redirect needed, just return (example: already on /dashboard)
  //     // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
  //     if (!redirectTo || !user) return;

  //     if (
  //       // If redirectTo is set, redirect if the user was not found.
  //       (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
  //       // If redirectIfFound is also set, redirect if the user was found
  //       (redirectIfFound && user?.isLoggedIn)
  //     ) {
  //       Router.push(redirectTo);
  //     }
  //   }, [user, redirectIfFound, redirectTo]);

  return { data };
}
