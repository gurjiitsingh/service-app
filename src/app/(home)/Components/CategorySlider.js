"use client";
// import Link from "next/link";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/app/action/category/dbOperations";
// import Image from "next/image";
// import { categoryType } from "@/lib/types/categoryType";
import { UseSiteContext } from "@/SiteContext/SiteContext";

export default function CategorySlider() {
  let w = 300;
  if (typeof window !== "undefined") {
    w = window.innerWidth;
  }
  const [width, setWidth] = useState(w);
  let STS = 1;

  STS = 2;

  if (width > 400) {
    STS = 3;
  }
  if (width > 500) {
    STS = 4;
  }
  if (width > 600) {
    STS = 5;
  }
  if (width > 700) {
    STS = 6;
  }
  if (width > 800) {
    STS = 7;
  }
  if (width > 900) {
    STS = 8;
  }

  if (width > 1000) {
    STS = 9;
  }
  if (width > 1100) {
    STS = 10;
  }
  if (width > 1200) {
    STS = 11;
  }
  if (width > 1300) {
    STS = 12;
  }
  if (width > 1400) {
    STS = 13;
  }
  if (width > 1500) {
    STS = 14;
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: STS,
    slidesToScroll: 2,
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  <style></style>;

  const { setProductCategoryIdG } = UseSiteContext();

  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    async function fetchcate() {
      try {
        const categories = await fetchCategories();
        categories.sort((a, b) => a.sortOrder - b.sortOrder);
        console.log("------------", categories);
        setCategoryData(categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchcate();
  }, []);

  return (
    <div className="m-2 h-full w-[98%] px-2 gap-1 ">
      <Slider {...settings}>
        {categoryData?.map((category, i) => {
          return (
            <div key={i} className="mx-2">
              <button
                onClick={() => {
                  setProductCategoryIdG(category.id);
                }}
              >
                <div className="w-[100px]">
                  <div className="flex flex-col  gap-1 ">
                    <div className="h-fit w-fit rounded-lg  pl-5 ">
                      <img
                        className="w-[70px] rounded-lg"
                        src={category.image}
                      />
                    </div>
                    <div className="flex flex-col justify-center w-[110px]  items-center">
                      <h3 className="text-[.8rem] text-slate-600 px-0">
                       
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
