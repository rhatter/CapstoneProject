import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./IndirizziForm.css";
const IndirizziForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3 campiForm" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Nazione" />
        <Form.Control type="text" placeholder="Città" />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default IndirizziForm;
