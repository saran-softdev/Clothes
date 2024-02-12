import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaShippingFast } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { BiCartAlt } from "react-icons/bi";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Css_pages/MainNavbar.css"; // Import your custom CSS file for styling
import { Avatar, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const MainNavbar = () => {
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/signin">
          Sign In
        </a>
      )
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/signup">
          Sign Up
        </a>
      )
    }
  ];
  return (
    <div className="main-navbar p-0">
      <Container fluid>
        <Row className="bg-black py-2">
          <Col
            xs={12}
            sm={6}
            className="text-white d-flex align-items-center justify-content-center justify-content-md-start"
          >
            <FaShippingFast />
            <span className="mx-2">|</span>
            <span className="ms-2">Free Shipping</span>
          </Col>
          <Col
            xs={12}
            sm={6}
            className="text-white d-flex justify-content-center justify-content-md-end align-items-center"
          >
            <FiDownload />
            <span className="ms-2">Download Our App</span>
            <span className="mx-2">|</span>
            <span>Help</span>
          </Col>
        </Row>
        <Row>
          <Navbar collapseOnSelect expand="sm" className="">
            <Container fluid>
              <Navbar.Brand href="#home">
                <img src="../Designer.png" alt="" srcset="" width={70} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/women">Women</Nav.Link>
                  <Nav.Link href="/men">Men</Nav.Link>
                  <Nav.Link href="/kids">Kids</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/favrite">
                    <AiOutlineHeart className="fs-4" />
                  </Nav.Link>
                  <Nav.Link href="/cart">
                    <BiCartAlt className="fs-4" />
                  </Nav.Link>
                  <Nav.Link href="/cart">
                    <AiOutlineShopping className="fs-4" />
                  </Nav.Link>
                  <Nav.Link href="/cart">
                    <Dropdown
                      menu={{
                        items
                      }}
                      placement="topRight"
                      arrow={{
                        pointAtCenter: true
                      }}
                    >
                      <Avatar icon={<UserOutlined />} className=" fs-4" />
                    </Dropdown>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <h6 className="Adds py-2 text-center">
            Buy 3 at 30% off / Buy 2 at 20% off + Extra 400 off on 1999.
            Code:SD400 | Free shipping on ALL orders!
          </h6>
        </Row>
      </Container>
    </div>
  );
};

export default MainNavbar;
