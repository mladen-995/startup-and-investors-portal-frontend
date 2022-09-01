import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "", // Hex color code
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = req.body;
        
        try {
          const response = await axios.post("http://localhost:3001/api/login", {
            email: username,
            password,
          });

          req.session.user = response.data.data.user;
          req.session.jwt = response.data.data.token;
          await req.session.save();

          res.json(response.data);
        } catch (error) {
          res.status(422).json({ message: error.response.data });
        }
      }
    }),
    // ...add more providers here
  ],
});
