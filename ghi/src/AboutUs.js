import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function AboutUs() {
  return (
    <Container>
      <h1 className="text-center my-5">About Us</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        <Col>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" />
            <Card.Body>
              <Card.Title>Joshua Evangelista</Card.Title>
              <Card.Text>
                "My tea's gone cold..."
              </Card.Text>
              <Button variant="primary" href="https://gitlab.com">
                GitLab
              </Button>{" "}
              <Button variant="primary" href="https://linkedin.com">
                LinkedIn
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" />
            <Card.Body>
              <Card.Title>Lee Seaver</Card.Title>
              <Card.Text>
                "I'm wondering why
I got out of bed at all"
              </Card.Text>
              <Button variant="primary" href="https://gitlab.com">
                GitLab
              </Button>{" "}
              <Button variant="primary" href="https://linkedin.com">
                LinkedIn
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" />
            <Card.Body>
              <Card.Title>Nicholas Trevino</Card.Title>
              <Card.Text>
                <p>"The morning rain clouds up my window
And I can't see at all"
.
.


</p>
              </Card.Text>
              <Button variant="primary" href="https://gitlab.com">
                GitLab
              </Button>{" "}
              <Button variant="primary" href="https://linkedin.com">
                LinkedIn
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" />
            <Card.Body>
              <Card.Title>Ken Wilson</Card.Title>
              <Card.Text>
                "even if I could, it'd all be gray
But your picture on my wall
It reminds me that it's not so bad"
              </Card.Text>
              <Button variant="primary" href="https://gitlab.com">
                GitLab
              </Button>{" "}
              <Button variant="primary" href="https://linkedin.com">
                LinkedIn
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
          <div>
            <h1 className="text-center my-5">
            <p>Our Passion</p>
            </h1>

            <p className="text-center">Our mission is to help vehicle service businesses of all sizes and types succeed in an increasingly competitive industry. With our cutting-edge software solution, you can take your business to the next level by automating tedious tasks, improving efficiency, and delivering exceptional customer service with cruise control capabilities. Our vision, over the course of the last 6 weeks, has come to fruition with the dedication and hardwork of our team.</p>
          </div>
    </Container>

  );
}

export default AboutUs;
