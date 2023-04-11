import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
  UncontrolledPopover,
  PopoverBody,
} from "reactstrap";
import axios from "axios";
import ExamplesNavbar from "../../components/Navbars/Navbar";

const API_KEY = "ea9b0100a5d64861a831ad375858e3bf";

function LibraryPage() {
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, []);

  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [games, setGames] = useState([]);
  const [hoveredGame, setHoveredGame] = useState(null);

  useEffect(() => {
    fetchPlatforms();
    fetchGenres();
  }, []);

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/platforms?key=${API_KEY}`
      );
      setPlatforms(response.data.results);
    } catch (error) {
      console.error("Error fetching platforms:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      setGenres(response.data.results);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchGames = async (platformId = "", genreId = "", page = 1) => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&platforms=${
          platformId ? platformId : ""
        }&genres=${genreId}&page=${page}&page_size=42`
      );
      setGames(response.data.results);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const handlePlatformChange = (e) => {
    fetchGames(e.target.value, selectedGenre);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    fetchGames("", e.target.value);
  };

  const handleMouseEnter = (game) => {
    setHoveredGame(game);
  };

  const handleMouseLeave = () => {
    setHoveredGame(null);
  };

  const addToLibrary = async (gameId) => {
    try {
      const url = `/api/users/1/library`;
      const userId = "1";
      await axios.post(url, { userId, gameId });
      console.log("Game added to library");
    } catch (error) {
      console.error("Error adding game to library:", error);
    }
  };

  return (
    <>
      <ExamplesNavbar />
      <div className="main">
        <div className="section section-dark text-center">
          <Container>
            <h2 className="title">Library</h2>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="platform"></Label>
                  <Input
                    type="select"
                    name="platform"
                    id="platform"
                    onChange={handlePlatformChange}
                  >
                    <option value="">All Platforms</option>
                    {platforms.map((platform) => (
                      <option key={platform.id} value={platform.id}>
                        {platform.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="genre"></Label>
                  <Input
                    type="select"
                    name="genre"
                    id="genre"
                    onChange={handleGenreChange}
                  >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              {games.map((game) => (
                <Col key={game.id} md="4">
                  <Card
                    onMouseEnter={() => handleMouseEnter(game)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Card image and other elements */}
                    <img
                      alt={game.name}
                      className="card-img-top"
                      src={
                        hoveredGame &&
                        hoveredGame.id === game.id &&
                        game.short_screenshots[1]
                          ? game.short_screenshots[1].image
                          : game.background_image
                      }
                    />
                    <CardBody>
                      <CardTitle tag="h4">{game.name}</CardTitle>
                      <p>
                        Genres:{" "}
                        {game.genres.map((genre) => genre.name).join(", ")}
                      </p>
                      <Button
                        color="primary"
                        id={`add-to-library-${game.id}`}
                        onClick={() => addToLibrary(game.id)}
                      >
                        Add to Library
                      </Button>
                      <UncontrolledPopover
                        placement="top"
                        target={`add-to-library-${game.id}`}
                        trigger="focus"
                      >
                        <PopoverBody>
                          {game.name} has been added to your library.
                        </PopoverBody>
                      </UncontrolledPopover>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LibraryPage;
