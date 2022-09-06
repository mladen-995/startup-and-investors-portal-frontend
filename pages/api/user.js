import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

function userRoute(req, res) {
  if (req.session.user) {
    res.json({
      user: req.session.user,
      token: req.session.token,
      isLoggedIn: true,
    });
  } else {
    res.json({
      user: null,
      token: null,
      isLoggedIn: false,
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
