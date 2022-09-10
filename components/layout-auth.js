import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Router, { useRouter } from "next/router";
import { logoutUser } from "./../services/user.service";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useUser } from "../context/user-hook";
import { setToken } from "../lib/axios";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user && !user.isLoggedIn) {
      router.push("/login");
    }
  }, [user]);

  function logout(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/logout")
      .then(() => {
        Cookies.remove("token");
        Router.push("/login");
      })
      .catch((error) => {
        alert("error");
      });
  }

  if (user?.isLoggedIn) {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Portal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link href="/surveys">
                  <Nav.Link href="#home">Surveys</Nav.Link>
                </Link>
                <Link href="/news">
                  <Nav.Link href="#home">News</Nav.Link>
                </Link>
                <Link href="/discussions">
                  <Nav.Link href="#home">Discussions</Nav.Link>
                </Link>
                <Link href="/groups">
                  <Nav.Link href="#home">Groups</Nav.Link>
                </Link>
                <Link href="/ads">
                  <Nav.Link href="#home">Ads</Nav.Link>
                </Link>
                <Link href="/notifications">
                  <Nav.Link href="#home">Notifications</Nav.Link>
                </Link>
                <NavDropdown title="Ciphers" id="basic-nav-dropdown">
                  <Link href="/ciphers/countries">
                    <NavDropdown.Item href="#action/3.1">
                      Countries
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/ciphers/cities">
                    <NavDropdown.Item href="#action/3.2">
                      Cities
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/ciphers/municipalities">
                    <NavDropdown.Item href="#action/3.2">
                      Municipalities
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/ciphers/streets">
                    <NavDropdown.Item href="#action/3.2">
                      Streets
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/ciphers/street-numbers">
                    <NavDropdown.Item href="#action/3.2">
                      Street numbers
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/ciphers/business-types">
                    <NavDropdown.Item href="#action/3.2">
                      Business types
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/ciphers/areas-of-interest">
                    <NavDropdown.Item href="#action/3.2">
                      Areas of interest
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/ciphers/professional-skills">
                    <NavDropdown.Item href="#action/3.2">
                      Professional skills
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="navbar-nav justify-content-end">
              <NavDropdown title={user?.fullName()} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container">{children}</div>
      </>
    );
  }
}
