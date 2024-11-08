// Sidebar.js
import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';

const SidebarDeleteIt = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
|||      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="/">Home</a></li>
              <li><a href="/Statistics">Statistics</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SidebarDeleteIt;
