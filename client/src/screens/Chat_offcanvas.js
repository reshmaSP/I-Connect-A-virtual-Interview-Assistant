import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Chat from "./Chat";

function Chat_offcanvas({ handleClose, handleShow, show, messages, handleSendMessage }) {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ paddingLeft: "40%", color: "black" }}>Chat</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {messages.map((message, idx) =>
          idx % 2 == 0 ? (
            <div style={{ background: "#dcdcdc", color: "black" }} key={idx}>
              <p style={{ paddingLeft: "2%", paddingRight: "2%" }}>
                <b>{message.from}</b>
                <br></br>
                {message.msg}
              </p>
            </div>
          ) : (
            <div style={{ background: "#f8f8f8", color: "black" }} key={idx}>
              <p style={{ paddingLeft: "2%", paddingRight: "2%" }}>
                <b>{message.from}</b>
                <br></br>
                {message.msg}
              </p>
            </div>
          )
        )}
        <Chat handleSendMessage={handleSendMessage}/>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Chat_offcanvas;
