import React from "react";
import "./SearchBar.css";
import backImg from "../../img/homeBack.jpg";

function SearchBar() {
  return (
    <div
      className="searchBarArea"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <span>Testo testo testo</span>
      <div className="InputArea">
        <input type="text" placeholder="Cerca il tuo articolo" />
        <button>Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
