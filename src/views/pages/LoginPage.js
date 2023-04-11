import React, { useState } from "react";

import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import ExamplesNavbar from "../../components/Navbars/Navbar.js";

function LoginPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      console.log(response.data);
      setShowAlert(false);
      history.push("/index");
    } catch (error) {
      console.error("Error logging in user:", error);
      setShowAlert(true);
    }
  };

  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("../../assets/img/7th.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome!</h3>
                {showAlert && (
                  <Alert className="alert-with-icon" color="danger">
                    <div className="alert-wrapper">
                      <div className="message">
                        <i className="nc-icon nc-bell-55" /> Error logging in
                        user.
                      </div>
                    </div>
                  </Alert>
                )}
                <Form className="register-form" onSubmit={onSubmit}>
                  <label>Email</label>
                  <Input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    block
                    className="btn-round"
                    color="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Create an account here!
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center"></div>
      </div>
    </>
  );
}

export default LoginPage;
