import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "../context/user-hook";

export default function AuthAdminLayout({ children }) {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user && !user.isInvestor()) {
      router.push("/");
    }
  }, [user]);

  return { children };
}
