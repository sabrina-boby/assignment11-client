import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your images
import img1 from "../../assets/photo_10361.jpg";
import img2 from "../../assets/John-Hurlock-556x450.jpg";
import img3 from "../../assets/Aisha-Abdallah-Web.jpg";
import img4 from "../../assets/c02c8dd8596e03c2b080deb096d331af.jpg";

const successStories = [
  {
    image: img1,
    story: `Maria, a full-time working professional, always dreamed of learning Spanish but struggled to find time and the right guidance. After joining our platform, she connected with a native Spanish tutor who personalized her learning journey. With dedication and consistent support, Maria became fluent in just six months. Today, she teaches others online, sharing her learning journey and helping people who once stood where she stood.`,
  },
  {
    image: img2,
    story: `John's love for the French language began as a hobby in college. However, he never imagined it could become his career. Through our platform, John found students from across the globe who admired his passion and teaching style. His unique lessons, filled with humor and cultural insights, helped his students not only learn the language but love it. Today, John is a full-time online French tutor, living his dream.`,
  },
  {
    image: img3,
    story: `Aisha, a native Arabic speaker, wanted to break language barriers and share her culture with the world. She started teaching beginners, creating simple yet powerful lessons based on real-life conversations. Slowly, her online classroom grew, connecting people from different continents. Today, Aisha runs a successful tutoring service, where she fosters confidence and cultural understanding among hundreds of learners worldwide.`,
  },
  {
    image: img4,
    story: `Carlos, originally a German language enthusiast, began his journey by creating simple tutorial sessions for his friends. Encouraged by their feedback, he expanded his teaching online through our platform. His clear explanations and practical exercises quickly gained popularity. Now, Carlos inspires others to learn German confidently, making language learning accessible, fun, and practical for everyone.`,
  },
];

const SuccessStory = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className=" py-5">
    <div className="max-w-3xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Success Stories</h2>
      <Slider {...settings}>
        {successStories.map((item, index) => (
          <div key={index} className="p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
              <img
                src={item.image}
                alt="Success Story"
                className="w-64 h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-700">{item.story}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default SuccessStory;
