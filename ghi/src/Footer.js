import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center ">
            <h5>Cruise Control</h5>
            <Link
              className="btn btn-outline-info btn-sm"
              to="/aboutus"
              role="button"
            >
              About Us
            </Link>
            <br />
            Lee Seaver
            <br />
            Joshua Evangelista
            <br />
            Nicholas Trevino
            <br />
            Ken Wilson
            <br />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
