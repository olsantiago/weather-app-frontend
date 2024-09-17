import React from "react";
import AutoCompleteInput from "../src/components/AutoCompleteInput";
import styles from "./index.module.scss";
import { WeatherInformationProvider } from "../src/components/WeatherInformation/weatherInformationContext";
import WeatherInformation from "../src/components/WeatherInformation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
  return (
    <>
      <WeatherInformationProvider>
        <Row className={styles.row}>
          <Col xs={12}>
            <div className={styles.searchContainer}>
              <AutoCompleteInput />
            </div>
            <WeatherInformation />
          </Col>
        </Row>
      </WeatherInformationProvider>
    </>
  );
}
