import { withIronSessionApiRoute } from "iron-session/next";
import axios from "axios";
import { sessionOptions } from "../../lib/session";

async function loginRoute(req, res) {
  const { username, password } = req.body;

  try {
    const response = await axios.post("http://localhost:3001/api/login", {
      username,
      password,
    });

    req.session.user = response.data.data.user;
    req.session.token = response.data.data.token;
    await req.session.save();

    res.json(response.data);
  } catch (error) {
    res.status(422).json({ message: error.response.data });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
