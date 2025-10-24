import React, { useEffect, useState } from "react";
import img1 from "../../assets/video-course.2558d969.jpg";
import img2 from "../../assets/language-academy.jpg";
import img3 from "../../assets/maxresdefault.jpg";

const slides = [
  { id: "slide1", img: img1 },
  { id: "slide2", img: img2 },
  { id: "slide3", img: img3 },
  // { id: "slide4", img: img4 },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="carousel w-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`carousel-item relative w-full ${
              idx === currentSlide ? "block" : "hidden"
            }`}
          >
            <img
              src={slide.img}
              className="w-full h-[350px]"
              alt={`Slide ${idx + 1}`}
            />

            {/* Top Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {slides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentSlide(dotIdx)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === dotIdx ? "bg-white" : "bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>

            {/* Left/Right Arrows */}
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prev) => (prev - 1 + slides.length) % slides.length
                  )
                }
                className="btn btn-circle"
              >
                ❮
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % slides.length)
                }
                className="btn btn-circle"
              >
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
