import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselCaption,
  CarouselIndicators,
  Container,
} from "reactstrap";
import axios from "axios";
import ExamplesNavbar from "../../components/Navbars/Navbar";
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";

const API_KEY = "ea9b0100a5d64861a831ad375858e3bf";

function LandingPage() {
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [featuredGames, setFeaturedGames] = useState([]);

  useEffect(() => {
    fetchFeaturedGames();
  }, []);

  const fetchFeaturedGames = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-added&page_size=5`
      );
      setFeaturedGames(response.data.results);
    } catch (error) {
      console.error("Error fetching featured games:", error);
    }
  };

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === featuredGames.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? featuredGames.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = featuredGames.map((game) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={game.id}
      >
        <img src={game.background_image} alt={game.name} />
        <CarouselCaption
          captionText={`Rating: ${game.rating}`}
          captionHeader={game.name}
        />
      </CarouselItem>
    );
  });

  return (
    <>
      <ExamplesNavbar />
      <LandingPageHeader />
      <div className="main">
        <div className="section section-dark text-center">
          <Container>
            <h2 className="title">Featured games</h2>
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
              <CarouselIndicators
                items={featuredGames}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
              />
              {slides}
              <a
                className="carousel-control-prev"
                data-slide="prev"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  previous();
                }}
                role="button"
              >
                <i className="now-ui-icons arrows-1_minimal-left" />
              </a>
              <a
                className="carousel-control-next"
                data-slide="next"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                role="button"
              >
                <i className="now-ui-icons arrows-1_minimal-right" />
              </a>
            </Carousel>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
