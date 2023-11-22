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
import { topicOptions } from "../../data/topicOption";
import axios from "axios";

const IndirizziForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [country, setCountry] = useState(null);
  const [formData, setFormData] = useState({});
  const [filteredCountry, setcountryFromServer] = useState(null);
  const [serverData, setServerData] = useState(null);
  const [filteredRegion, setFilteredRegion] = useState(null);
  const [filteredCity, setFilteredCity] = useState(null);

  // chiamata per capire come popolare le proposte
  const getDataToOption = async () => {
    const data = await axios.get(`${process.env.REACT_APP_URL}/region`);
    setServerData(data);
  };

  const countryFromServer = (posts, objName) => {
    const dest = [];
    for (const item of posts) {
      // Verifica se l'elemento esiste già nell'array di destinazione
      const exists = dest.some((el) => el === item[objName]);

      // Se non esiste, esegui il push nell'array di destinazione
      if (!exists) {
        dest.push(item[objName]);
      }
    }
    return dest;
  };
  useEffect(() => {
    getDataToOption();
  }, []);
  useEffect(() => {
    // console.log(serverData);
    if (serverData) {
      setcountryFromServer(countryFromServer(serverData.data.dest, "country"));
    }
  }, [serverData]);

  //
  const [dataToCoord, setDataToCoord] = useState(
    `${formData.country},${formData.region}, ${formData.city}`
  );
  const [selectGeoloc, setSelectGeoloc] = useState(false);
  const [changeMe, setChangeMe] = useState(1);
  const [errorSearch, setErrorSearch] = useState(false);
  const formDataImport = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const coord = useFromTextToCoord(dataToCoord);
  // console.log(coord);
  const renderErrorSeach = () => (
    <div className="errorSearch">
      <span className="Error">Errore seleziona un paese valido</span>
    </div>
  );
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
  const coordthis = useGeoloc(selectGeoloc);
  useEffect(() => {
    dispatch(CoordUpdate(coordthis));
  }, [changeMe, selectGeoloc, coordthis]);

  const Selected = (e) => {
    setSelectGeoloc((prev) => {
      return !prev ? true : true;
    });
    setChangeMe((prev) => {
      return prev + 1;
    });
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);
  };

  const searchLocations = (e) => {
    e.preventDefault();
    if (formData.country && formData.city && formData.region) {
      dispatch(
        getArticles({
          topics: selectedOption,
          country: formData.country,
          city: formData.city,
          region: formData.region,
        })
      );
      if (coord) {
        setErrorSearch(false);
        dispatch(
          CoordUpdate({ latitude: coord[0].lat, longitude: coord[0].lon })
        );
      } else {
        setErrorSearch(true);
      }
    }
  };

  const filterRegion = (country, thisCountry, controller) => {
    const startedArr = serverData.data.dest.filter(
      (e) => e[controller] === country
    );
    const dest = countryFromServer(startedArr, thisCountry);
    console.log("dest", dest);
    if (controller === "country") {
      setFilteredRegion(dest);
    }
    if (controller === "region") {
      setFilteredCity(dest);
    }
  };

  return (
    <Col sm={12} className="FormSpace">
      <Col xs={12} sm={12} md={10} lg={8} xl={6}>
        <Form className="FormArea" onSubmit={searchLocations}>
          <Form.Group className="mb-3 campiForm" controlId="formBasicEmail">
            <Button
              variant="primary"
              onClick={() => Selected(coordthis)}
              onBlur={() => Selected(coordthis)}
              className="Geoloc"
            >
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
                    setFormData((prev) => {
                      return { ...prev, region: null, city: null };
                    });
                    filterRegion(e.target.value, "region", "country");
                  }}
                >
                  <option value=" "> </option>
                  {filteredCountry &&
                    filteredCountry.map((country) => (
                      <option key={nanoid()}>{country}</option>
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
                    setDataToCoord(`${formData.country}, ${e.target.value}`);
                    filterRegion(e.target.value, "city", "region");
                  }}
                >
                  <option value=" "> </option>
                  {filteredRegion &&
                    filteredRegion.map((region) => (
                      <option key={nanoid()}>{region}</option>
                    ))}
                </select>
              </div>
              <div className="Paese">
                <select
                  aria-controls=""
                  value={formData.city}
                  id="countryInput"
                  type="text"
                  placeholder="Paese"
                  name="city"
                  onChange={(e) => {
                    formDataImport(e);
                    setDataToCoord(
                      `${formData.country},${formData.region}, ${e.target.value}`
                    );
                  }}
                >
                  <option value=" "> </option>
                  {filteredCity &&
                    filteredCity.map((country) => (
                      <option key={nanoid()}>{country}</option>
                    ))}
                </select>
              </div>
              <div className="Topics">
                <Select
                  className="Topics"
                  isMulti
                  options={topicOptions}
                  placeholder="Seleziona..."
                  onChange={handleChange}
                />
              </div>
              {errorSearch && renderErrorSeach()}
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
