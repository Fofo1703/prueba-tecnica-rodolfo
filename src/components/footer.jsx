import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { id: 1, src: "https://picsum.photos/800/400?random=1" },
  { id: 2, src: "https://picsum.photos/800/400?random=2" },
  { id: 3, src: "https://picsum.photos/800/400?random=3" },
  { id: 4, src: "https://picsum.photos/800/400?random=4" },
  { id: 5, src: "https://picsum.photos/800/400?random=5" }
];

const FooterGallery = () => {
  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    arrows: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <footer className="bg-black py-8 mt-20">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={img.id} className="px-2 relative">
              <div
                className={`overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
                  index === 1 ? "h-64" : "h-32"
                } flex items-end justify-center`}
              >
                <img
                  src={img.src}
                  alt={`Footer ${img.id}`}
                  className={`w-full object-cover ${
                    index === 1 ? "h-64" : "h-64 translate-y-1/2 opacity-70"
                  }`}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </footer>
  );
};

export default FooterGallery;
