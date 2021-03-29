import React, { useState, useEffect } from 'react'
import axios from 'axios'


const PrintCountry = (props) => {
    return (
  <div>
      <h2>{props.countries[props.id].name}</h2>
      <p>Capital city: {props.countries[props.id].capital}</p>
      <p>Population: {props.countries[props.id].population}</p>
      <h2>Languages:</h2>
          <ul>
                  {props.countries[props.id].languages.map((language, index) => (
                  <li key={index}> {language.name}</li>))
                  }
          </ul>
          <img
              src={props.countries[props.id].flag}
              
              width="170"
              height="100"
              alt=""

          ></img>
  </div>
    )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(-1);
  const [filter, setFilter] = useState("");
  


  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
        setCountries(response.data);
    });
}, []);

const handleFilterChange = (event) => {
  setFilter(event.target.value);
};

const filterNames = (event) => {
  event.preventDefault();

  const countryNames = countries.filter(
      (country) => country.name.toLowerCase().search(filter) > -1
  );
  setShowCountry(-1); 
  setSearchedCountries(countryNames);
};

const handleSearches = () => {
  if (searchedCountries.length >= 10) {
      return <div>
          Too many countires, specify another filter
          </div>;
  }

  if (showCountry >= 0) {
    const temp = showCountry;

    return (
      <PrintCountry countries={searchedCountries} id={temp} />               
    );
}

  if (searchedCountries.length === 1) {
      console.log(searchedCountries[0].name);
      return (
        <PrintCountry countries={searchedCountries} id={0} />          
      );
  }

 

  return (
      <div>
          <ul>
              {searchedCountries.map((country, index) => [
                  <li 
                  key={country.name}>{country.name}
                  </li>,
                  <button
                      key={country.name + index}
                      onClick={() => 
                      setShowCountry(index)} >
                      show
                  </button>,
              ])}
          </ul>
      </div>
  );
};
  
  return (
    <div>
    <h2>find Countries:</h2>
    <form onChange={filterNames}>
        <input value={filter} onChange={handleFilterChange}></input>
    </form>
        <div>
            {handleSearches()}
        </div>
    </div>
  );
}

export default App
