import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

/* eslint react/prop-types: 0 */
function App({ Component, pageProps }) {
  return (
    <Container fluid>
      <Component {...pageProps} />
    </Container>
  );
}
export default App;
