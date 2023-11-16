import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./IndirizziForm.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CoordUpdate } from "../../reducers/generalCoord";
import { getArticles } from "../../reducers/filteredArticle";
import useGeoloc from "../../hooks/Geoloc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Col } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { nanoid } from "nanoid";
import useFromTextToCoord from "../../hooks/FromTextToCoord";

const IndirizziForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);
  const [formData, setFormData] = useState({});
  const [dataToCoord, setDataToCoord] = useState(null);

  const formDataImport = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const coord = useFromTextToCoord(dataToCoord);

  const countryData = () => {
    const countries = Country.getAllCountries().filter(
      (e) =>
        e.currency === "EUR" ||
        e.currency === "USD" ||
        e.currency === "HRK" ||
        e.currency === "GBP"
    );
    return countries;
  };
  const cityData = () => {
    const cities = City.getCitiesOfState(
      Country.getAllCountries().filter((e) => e.name === formData.country)[0]
        .isoCode,
      State.getStatesOfCountry(
        Country.getAllCountries().filter((e) => e.name === formData.country)[0]
          .isoCode
      ).filter((st) => st.name === formData.region)[0].isoCode
    );
    return cities;
  };

  const regionData = () => {
    const regions = State.getStatesOfCountry(
      Country.getAllCountries().filter((e) => e.name === formData.country)[0]
        .isoCode
    );
    //console.log(regions);
    return regions;
  };

  const dispatch = useDispatch();
  const coordthis = useGeoloc(true);
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
  const searchLocations = (e) => {
    e.preventDefault();
    dispatch(
      getArticles({
        topics: selectedOption,
        paese: formData.country,
        citta: formData.city,
      })
    );
    console.log("clicked");
  };

  const dataToGet = () => {};

  return (
    <Col sm={12} className="FormSpace">
      <Col sm={12} md={10} lg={8} xl={6}>
        <Form className="FormArea" onSubmit={searchLocations}>
          <Form.Group className="mb-3 campiForm" controlId="formBasicEmail">
            <Button variant="primary" onClick={Selected} className="Geoloc">
              <FontAwesomeIcon icon={faLocationDot} />
            </Button>
            <div className="InputArea">
              <div className="Paese">
                <select
                  value={formData.country}
                  type="text"
                  placeholder="Paese"
                  name="country"
                  onChange={(e) => {
                    formDataImport(e);
                    setCountry(e.target.value);
                    setDataToCoord(`${e.target.value}`);
                  }}
                >
                  {countryData() &&
                    countryData().map((country) => (
                      <option key={nanoid()}>{country.name}</option>
                    ))}
                </select>
              </div>
              <div className="Paese">
                <select
                  value={formData.region}
                  id="countryInput"
                  type="text"
                  placeholder="Regione"
                  name="region"
                  onChange={(e) => {
                    formDataImport(e);
                    setDataToCoord(`${country}, ${e.target.value}`);
                  }}
                >
                  {formData.country &&
                    regionData().map((country) => (
                      <option key={nanoid()}>{country.name}</option>
                    ))}
                </select>
              </div>
              <div className="Paese">
                <select
                  value={formData.city}
                  id="countryInput"
                  type="text"
                  placeholder="Paese"
                  name="city"
                  onChange={(e) => {
                    formDataImport(e);
                    setDataToCoord(`${country}, ${e.target.value}`);
                  }}
                >
                  {formData.region &&
                    cityData().map((country) => (
                      <option key={nanoid()}>{country.name}</option>
                    ))}
                </select>
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
