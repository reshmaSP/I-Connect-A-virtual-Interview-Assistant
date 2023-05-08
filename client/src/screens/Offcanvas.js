import React from "react";
import Container from "react-bootstrap/esm/Container";

const Offcanvas = ({handleShow, show, handleClose}) => {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Offcanvas
