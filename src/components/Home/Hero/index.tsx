import { useState, useRef, FC } from "react";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import { CarouselRef } from "antd/es/carousel";
import { Slides } from "../../../../types/HomeTypes";


const HeroCarousel:FC = () => {
    const navigate = useNavigate();
    const slides : Slides[] = [
        {
            id: 1,
            suptitle: "Welcome to GreenShop",
            title: "LET'S MAKE A BETTER PLANET",
            description: "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
            btn: "Shop now",
            img: "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d",
        },
        {
            id: 3,
            suptitle: "Welcome to GreenShop",
            title: "LET'S LIVE IN A BETTER PLANET",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni eos aut vitae, exercitationem voluptatum porro veniam animir alias?",
            btn: "Let's Start",
            img: "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-1.png?alt=media&token=74ea8d3d-06b5-41e7-bb12-7caaf3035a6d",
        },
        {
            id: 3,
            suptitle: "Welcome to GreenShop",
            title: "LET'S OBSERVE A BETTER PLANET",
            description: "Nmadur Nmadur Lalala Balo battar auo io maooo gul! Atirgul lolagul kokgul qoragul jigarrang gul naushnik  ",
            btn: "Get Credits",
            img: "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-2.png?alt=media&token=5b5addec-d344-4897-a983-95c9b10a1662",
        },
    ];
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const carouselRef = useRef<CarouselRef | null>(null);

    return (
        <div className="relative max-w-[1240px] m-auto mt-4 transi">
            <Carousel ref={carouselRef} autoplay autoplaySpeed={4000} dots={false} beforeChange={(from, to) => setCurrentSlide(to)}>
                {slides.map((slide, index) => (
                    <div key={index} className="flex transi items-center justify-center bg-[#F5F5F5] rounded-xl max-sm:h-[180px] max-sm:pl-3 max-md:h-[250px] h-[400px] pl-10">
                        <div className="max-co w-full flex items-center justify-between h-full">
                            <div className="flex-1 flex flex-col justify-center">
                                <h3 className="uppercase text-lg max-sm:text-sm font-medium text-[#3D3D3D]">{slide.suptitle}</h3>
                                <h2 className="font-[900] max-lg:text-4xl max-md:text-2xl max-sm:text-lg max-sm:pr-2  text-[#3D3D3D] text-6xl pr-10">
                                    {slide.title.split(" ").slice(0, -1).join(" ")}{" "}
                                    <span className="text-[#46A358] uppercase">
                                        {slide.title.split(" ").slice(-1)}
                                    </span>
                                </h2>
                                <p className="mt-6 max-md:mt-2 max-sm:mt-0 max-md:pr-3 max-lg:pr-5 font-bold max-lg:text-sm max-md:font-light  max-sm:text-[10px] max-md:leading-4 leading-5 text-[#727272] max-md:w-full xl:max-w-[60%]">{slide.description}</p>
                                <button onClick={()=>navigate('/shop')} className="transi mt-6 px-6 py-2 max-sm:py-0.5 max-sm:text-[8px] max-md:mt-2 max-w-40 max-md:max-w-32 max-md:px-2 max-sm:max-w-20 cursor-pointer max-md:text-sm text-base font-semibold uppercase bg-[#46A358] hover:bg-[#46A358]/70 text-white rounded-md transition">
                                    {slide.btn}
                                </button>
                            </div>

                            <div className="flex justify-end items-end max-lg:max-w-[30%] max-sm:hidden relative">
                                <img src={slide?.img} alt={slide.suptitle || "Carousel img"} className="max-w-[390px] max-h-[390px] max-lg:max-w-[300px] max-md:max-w-[160px]" width={390} height={390}/>
                                <img src={slide?.img} alt={slide.suptitle || "Carousel img"} className="max-w-[130px] max-h-[130px] absolute bottom-3 left-0 -translate-x-10 max-md:max-w-[0px]" />

                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            <div className="justify-center items-center flex gap-2 absolute bottom-4 left-1/2 max-sm:right-0">
                {slides.map((_, index) => (
                    <button key={index}
                        className={`relative cursor-pointer transition-all duration-300 bg-[#46A358] !h-[3px] ${currentSlide === index ? "!w-6" : "!w-4 hover:bg-[#46A358]/70 bg-[#46A358]/40"}`}
                        onClick={() => carouselRef.current?.goTo(index)}>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;