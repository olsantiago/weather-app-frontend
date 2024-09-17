'use client';

import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import cityNames from "../../utilities/cities";
import { getCurrentWeather } from "../../api/weather";
import { useWeatherInformation } from "../WeatherInformation/weatherInformationContext";
import styles from "./index.module.scss";
import { setSearchHistory, getSearchHistory } from "../../utilities/searchHistory";
import { makeUnique } from "../../utilities/unique";

function AutoCompleteInput() {
  // prevent re-rendering large values
  const cities = React.useMemo(() => cityNames, []);

  const { setCurrentData } = useWeatherInformation();
  const [currentInput, setCurrentInput] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const [recentSearch, setRecentSearch] = React.useState<string[]>([]);
  const [showRecentSearch, setShowRecentSearch] = React.useState(false);

  // initial location of user
  const currentLocationWeather = React.useCallback(() => {
    navigator.geolocation.watchPosition( async (position) => {
      const lat = position?.coords?.latitude;
      const lon = position?.coords?.longitude;

      if(!lat && !lon) {
        return
      }
      const data = await getCurrentWeather(null, lon, lat);
      setCurrentData(data);
    });
  }, [setCurrentData]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    // simple prevention of special characters
    const value = event.target.value.replace(/[^\w\s]/gi, "");
    setCurrentInput(value);
    setShowSuggestions(true);
    if(currentInput.length === 0) {
      setShowRecentSearch(true);
    } else {
      setShowRecentSearch(false);
    }
  }

  function handleSelectionClicked(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const target = event.target as HTMLButtonElement;
    setCurrentInput(target?.getAttribute("data-value") || '');
    setShowSuggestions(false);
  }

  function handleShowRecentSearch() {
    if(currentInput.length === 0) {
      if(recentSearch.length > 0 ) {
        setShowSuggestions(true);
        setShowRecentSearch(true);
      }
    }
  }

  async function handleSubmit() {
    const data = await getCurrentWeather(currentInput);
    setCurrentData(data);
    setShowSuggestions(false);
    setRecentSearch(prev => ([currentInput, ...makeUnique(prev)]))
  }

  // simple filtering of search items, autocomplete function can be improved
  const filterCityList = React.useCallback(() => {
    const maxResult: number = 10;
    let result: string[] = [];
    if (currentInput.length > 0) {
        const reg: RegExp = new RegExp(currentInput.toLowerCase());
        result = cities.filter((city: string) => {
            return city.toLowerCase().match(reg);
        });
    }
    setSuggestions(result?.slice(0, maxResult));
  }, [currentInput, cities]);

  // intial location
  React.useEffect(() => {
    currentLocationWeather();
  }, [currentLocationWeather])

  //refresh suggestions
  React.useEffect(() => {
    filterCityList();
  }, [currentInput, filterCityList]);

  // set history and make sure they are unique values
  React.useEffect(() => {
    if(recentSearch.length > 0) {
      setSearchHistory(makeUnique(recentSearch));
    }
  }, [recentSearch]);

  // get history
  React.useEffect(() => {
    const history = getSearchHistory();
    if (!history) return;
    if(history?.length > 0) {
      setRecentSearch(history);
    }
  }, []);

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="US City"
          aria-label="US City"
          onChange={handleInputChange}
          onClick={handleShowRecentSearch}
          value={currentInput}
        />
        <Button variant="dark" onClick={handleSubmit} disabled={currentInput.length === 0}>
          search
        </Button>
      </InputGroup>
      {showSuggestions &&
        <ListGroup className={styles.suggestions}>
          {showRecentSearch &&
            <>
              <ListGroup.Item disabled className="text-center">Recent searches</ListGroup.Item>
              {recentSearch.slice(0, 5).map((city, index) =>
                <ListGroup.Item
                  key={`${city}-${index}-history`}
                  action
                  onClick={handleSelectionClicked}
                  data-value={city}
                  className={styles.recent}
                >
                  {city}
                </ListGroup.Item>
              )}
            </>
          }
          {suggestions.length > 0 &&
            <>
              {suggestions.map((city, index) =>
                <ListGroup.Item
                  key={`${city}-${index}`}
                  action
                  onClick={handleSelectionClicked}
                  data-value={city}
                >
                  {city}
                </ListGroup.Item>
              )}
            </>
          }

        </ListGroup>
      }
    </>
  )
}

export default AutoCompleteInput;
