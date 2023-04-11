import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import axios from "axios";
import ExamplesNavbar from "../../components/Navbars/Navbar.js";

const API_KEY = "ea9b0100a5d64861a831ad375858e3bf";

function MarketPage() {
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, []);

  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGames(currentPage, searchTerm);
  }, [currentPage]);

  const fetchGames = async (page, searchTerm = "") => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-added&page_size=21&page=${page}&search=${searchTerm}`
      );
      setGames(response.data.results);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    fetchGames(1, searchTerm);
  };

  return (
    <>
      <ExamplesNavbar />
      <div className="main">
        <div className="section section-dark text-center">
          <Container>
            <h2 className="title">Market</h2>
            <Row>
              <Col md="8" className="offset-md-2">
                <FormGroup>
                  <Label for="search"></Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search for games by title"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="info" onClick={handleSearchClick}>
                        Search
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </Row>
            <div>
              <Button color="info" onClick={prevPage}>
                Previous
              </Button>
              <Button color="info" onClick={nextPage}>
                Next
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

function GameCard({ game }) {
  const [screenshots, setScreenshots] = useState([]);
  const [coverImage, setCoverImage] = useState(game.background_image);
  const [price] = useState((Math.random() * (60 - 1) + 1).toFixed(2));

  useEffect(() => {
    fetchScreenshots(game.id);
  }, [game.id]);

  const fetchScreenshots = async (id) => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`
      );
      setScreenshots(response.data.results);
    } catch (error) {
      console.error("Error fetching screenshots:", error);
    }
  };

  const handleAddToCart = () => {
    console.log(`Game ${game.name} with price $${price} added to cart.`);
  };

  const handleMouseEnter = () => {
    if (screenshots.length > 0) {
      setCoverImage(screenshots[0].image);
    }
  };

  const handleMouseLeave = () => {
    setCoverImage(game.background_image);
  };

  return (
    <Col md="4">
      <Card
        id={`game-card-${game.id}`}
        className="card-profile card-plain"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-avatar">
          <img
            alt={game.name}
            src={coverImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>
        <CardBody>
          <CardTitle tag="h4" className="text-white">
            {game.name}
          </CardTitle>
          <p className="text-white">Price: ${price}</p>
          <Button color="info" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardBody>
      </Card>
      <UncontrolledPopover
        trigger="hover"
        placement="top"
        target={`game-card-${game.id}`}
      >
        <PopoverHeader>{game.name}</PopoverHeader>
        <PopoverBody>
          <p>
            Platforms:{" "}
            {game.platforms
              .map((platform) => platform.platform.name)
              .join(", ")}
          </p>
          <p>Genres: {game.genres.map((genre) => genre.name).join(", ")}</p>
          <p>Metacritic: {game.metacritic}</p>
          <p>Released: {game.released}</p>
        </PopoverBody>
      </UncontrolledPopover>
    </Col>
  );
}

export default MarketPage;
