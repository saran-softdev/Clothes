import React, { useState, useEffect } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import axios from "axios";
import MainFooter from "../Common_pages/Main_footer";

const Kids = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [index, setIndex] = useState(0);
  const [cardProductData, setCardProductData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/product-get`);
      setCardProductData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const WomenProduct = cardProductData.filter(
    (cardProduct) => cardProduct.category === "kids"
  );

  // Function to toggle description expansion
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to truncate description
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div>
      <Container>
        <Row className="p-3 p-md-5">
          {" "}
          {/* Adjust padding for smaller screens */}
          <Breadcrumb>
            <Breadcrumb.Item href="/">HOME</Breadcrumb.Item>
            <Breadcrumb.Item active>KID'S</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h1 className="text-center">KID'S COLLECTION</h1>
          <hr />
        </Row>
        <Row className="card_container">
          {WomenProduct.map((cardProduct) => (
            <Col xs={12} md={6} lg={4} key={cardProduct.id} className=" my-3">
              {/* Adjust column size for different screen sizes */}
              <div className="card___container">
                <button className="card__love-btn">
                  <AiOutlineHeart />
                </button>
                <img
                  className="card__img"
                  src={cardProduct.productImage}
                  alt="Classical Watch"
                />
                <div className="card__body">
                  <h3 className="card__title">{cardProduct.productName}</h3>
                  <p className="card__text">
                    {isExpanded
                      ? cardProduct.description
                      : truncateDescription(cardProduct.description, 150)}
                    {cardProduct.description.length > 150 && (
                      <span
                        onClick={toggleDescription}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {isExpanded ? " Read Less" : " Read More"}
                      </span>
                    )}
                  </p>
                  <div className="card__footer">
                    <button className="card_btn">
                      <AiOutlineShopping />
                      Add to cart
                    </button>
                    <h4 className="price">₹{cardProduct.productPrice}</h4>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <MainFooter />
    </div>
  );
};

export default Kids;