import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

function logoutRoute(req, res) {
  req.session.destroy();
  res.json({ isLoggedIn: false });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
