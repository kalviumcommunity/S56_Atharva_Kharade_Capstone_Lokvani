import React from "react";
import "./MainPage.css";
import { useState } from "react";
import PuneAreaSelect from "../Components/AreaSelect";
import SortBySelect from "../Components/SortBy";
import SearchInput from "../Components/Search";

import { IconContext } from "react-icons";
import { BsArrowDownSquare } from "react-icons/bs";
import { BsArrowUpSquare } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";


const MainPage = () => {

  const [imgSlide, setImgSlide] = useState(0);

  const slides = [
    {
      "src": "https://picsum.photos/seed/img1/400/300",
    },
    {
      "src": "https://picsum.photos/seed/img2/300/200",
    },
    {
      "src": "https://picsum.photos/seed/img3/400/300",
    }
  ]

  const nextSlide = () => {
    if (imgSlide < slides.length - 1) {
      setImgSlide(imgSlide + 1);
    } else {
      setImgSlide(0);
    }
  }

  const prevSlide = () => {
    if (imgSlide > 0) {
      setImgSlide(imgSlide - 1);
    } else {
      setImgSlide(slides.length - 1);
    }
  }

  return (
    <div className="MainPage-body">
      <div className="MainPage-middle">
        <div className="middle-SearchBar">
          <div className="SearchBar-left">
            <div className="SearchBar-sort">
              <SortBySelect />
            </div>
            <div className="SearchBar-areaSelect">
              <PuneAreaSelect />
            </div>
          </div>
          <div className="SeachBar-searchInput">
            <SearchInput />
          </div>
        </div>
        <div className="middle-Complaints">
          <div className="Complaint-Box">
            <div className="Complaint-data">
              <div className="Complaint-title">
                <h1>Water Wastage</h1>
              </div>
              <div className="Complaint-descp">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil incidunt excepturi eos sed, atque nostrum corporis veniam ratione ex, ducimus, totam impedit animi. Dolores necessitatibus id minima a quisquam cumque?</p>
              </div>
              <div className="Comaplaint-functionalities">
                <div className="function-vote">
                  <div className="upvote">
                    <IconContext.Provider
                      value={{ color: 'black', size: '30px' }}
                    >
                      <BsArrowUpSquare />
                    </IconContext.Provider>
                  </div>
                  <h1>4</h1>
                  <div className="downvote">
                    <IconContext.Provider
                      value={{ color: 'black', size: '30px' }}
                    >
                      <BsArrowDownSquare />
                    </IconContext.Provider>
                  </div>
                </div>
                <div className="function-comment">
                  <IconContext.Provider
                    value={{ color: 'black', size: '32px' }}
                  >
                    <FaRegComment />
                  </IconContext.Provider>
                </div>
                <div className="function-reviewTag">
                  <h1>Verified</h1>
                </div>
                <div className="function-Type">
                  <h1>Water Pollution</h1>
                </div>
              </div>
            </div>
            <div className="complaint-img">
              <BsArrowLeftCircleFill className="arrow arrowleft" onClick={prevSlide} />
              {slides.map((slide, index) => (
                <img key={index} src={slide.src} alt={`Slide ${index}`} className={imgSlide === index ? "slide" : "slide slideHidden"} />
              ))}
              <BsArrowRightCircleFill className="arrow arrowright" onClick={nextSlide} />
              <span className="indicators">
                {slides.map((slide, index) => (
                  <button key={index} onClick={null} className={imgSlide === index ? "dot" : "dot dot-inactive"}></button>
                ))}
              </span>
            </div>
          </div>
          <div className="Complaint-Box">
            <div className="Complaint-data">
              <div className="Complaint-title">
                <h1>Water Wastage</h1>
              </div>
              <div className="Complaint-descp">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil incidunt excepturi eos sed, atque nostrum corporis veniam ratione ex, ducimus, totam impedit animi. Dolores necessitatibus id minima a quisquam cumque?</p>
              </div>
              <div className="Comaplaint-functionalities">
                <div className="function-vote">
                  <div className="upvote">
                    <IconContext.Provider
                      value={{ color: 'black', size: '30px' }}
                    >
                      <BsArrowUpSquare />
                    </IconContext.Provider>
                  </div>
                  <h1>4</h1>
                  <div className="downvote">
                    <IconContext.Provider
                      value={{ color: 'black', size: '30px' }}
                    >
                      <BsArrowDownSquare />
                    </IconContext.Provider>
                  </div>
                </div>
                <div className="function-comment">
                  <IconContext.Provider
                    value={{ color: 'black', size: '32px' }}
                  >
                    <FaRegComment />
                  </IconContext.Provider>
                </div>
                <div className="function-reviewTag">
                  <h1>Verified</h1>
                </div>
                <div className="function-Type">
                  <h1>Water Pollution</h1>
                </div>
              </div>
            </div>
            <div className="complaint-img">
              <BsArrowLeftCircleFill className="arrow arrowleft" onClick={prevSlide} />
              {slides.map((slide, index) => (
                <img key={index} src={slide.src} alt={`Slide ${index}`} className={imgSlide === index ? "slide" : "slide slideHidden"} />
              ))}
              <BsArrowRightCircleFill className="arrow arrowright" onClick={nextSlide} />
              <span className="indicators">
                {slides.map((slide, index) => (
                  <button key={index} onClick={null} className={imgSlide === index ? "dot" : "dot dot-inactive"}></button>
                ))}
              </span>
            </div>
          </div>
          <div className="Complaint-Box">
            <div className="Complaint-data">
              <div className="Complaint-title">
                <h1>Water Wastage</h1>
              </div>
              <div className="Complaint-descp">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil incidunt excepturi eos sed, atque nostrum corporis veniam ratione ex, ducimus, totam impedit animi. Dolores necessitatibus id minima a quisquam cumque?</p>
              </div>
              <div className="Comaplaint-functionalities">
                <div className="function-vote">
                  <div className="upvote">
                    <IconContext.Provider
                      value={{ color: 'black', size: '30px' }}
                    >
                      <BsArrowUpSquare />
                    </IconContext.Provider>
                  </div>
                  <h1>4</h1>
                  <div className="downvote">
                    <IconContext.Provider
                      value={{ color: 'black', size: '30px' }}
                    >
                      <BsArrowDownSquare />
                    </IconContext.Provider>
                  </div>
                </div>
                <div className="function-comment">
                  <IconContext.Provider
                    value={{ color: 'black', size: '32px' }}
                  >
                    <FaRegComment />
                  </IconContext.Provider>
                </div>
                <div className="function-reviewTag">
                  <h1>Verified</h1>
                </div>
                <div className="function-Type">
                  <h1>Water Pollution</h1>
                </div>
              </div>
            </div>
            <div className="complaint-img">
              <BsArrowLeftCircleFill className="arrow arrowleft" onClick={prevSlide} />
              {slides.map((slide, index) => (
                <img key={index} src={slide.src} alt={`Slide ${index}`} className={imgSlide === index ? "slide" : "slide slideHidden"} />
              ))}
              <BsArrowRightCircleFill className="arrow arrowright" onClick={nextSlide} />
              <span className="indicators">
                {slides.map((slide, index) => (
                  <button key={index} onClick={null} className={imgSlide === index ? "dot" : "dot dot-inactive"}></button>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="MainPage-side">
        <div className="MainPage-side-Navbar">
        </div>
      </div>
    </div>
  );
};

export default MainPage;
