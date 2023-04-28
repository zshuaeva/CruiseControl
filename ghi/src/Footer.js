import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col className="text-center ">
                        <h5>Cruise Control</h5>
                        Lee Seaver<br />
                        Joshua Evangelista<br />
                        Nicholas Trevino<br />
                        Ken Wilson
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
