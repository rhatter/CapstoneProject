import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./IndirizziForm.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CoordUpdate } from "../../reducers/generalCoord";
import useGeoloc from "../../hooks/Geoloc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Col } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import Select from "react-select";

const IndirizziForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const coordthis = useGeoloc();
  const Selected = async () => {
    dispatch(CoordUpdate(coordthis));
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);
  };

  const topicsOptions = [
    { value: "topic1", label: "Topic 1" },
    { value: "topic2", label: "Topic 2" },
    { value: "topic3", label: "Topic 3" },
  ];

  return (
    <Col sm={12} className="FormSpace">
      <Col sm={12} md={10} lg={8} xl={6}>
        <Form className="FormArea">
          <Form.Group className="mb-3 campiForm" controlId="formBasicEmail">
            <Button variant="primary" onClick={Selected} className="Geoloc">
              <FontAwesomeIcon icon={faLocationDot} />
            </Button>
            <div className="InputArea">
              <div className="Paese">
                <input type="text" placeholder="Scegli il Paese" name="Paese" />
              </div>
              <div className="Citta">
                <input type="text" placeholder="Scegli la Città" name="Citta" />
              </div>
              <div className="Topics">
                <Select
                  className="Topics"
                  isMulti
                  options={topicsOptions}
                  placeholder="Seleziona..."
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Col>
  );
};

export default IndirizziForm;
