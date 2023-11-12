import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./IndirizziForm.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CoordUpdate } from "../../reducers/generalCoord";
import useGeoloc from "../../hooks/Geoloc";

const IndirizziForm = () => {
  const coord = useSelector((select) => select);
  const dispatch = useDispatch();
  const coordthis = useGeoloc();
  const Select = async () => {
    dispatch(CoordUpdate(coordthis));
  };

  return (
    <Form>
      <Form.Group className="mb-3 campiForm" controlId="formBasicEmail">
        <Button variant="primary" onClick={Select}>
          Submit
        </Button>
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
