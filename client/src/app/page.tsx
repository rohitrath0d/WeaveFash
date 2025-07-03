"use client";

import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store/useSettingStore";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import homepagebanner from "../../public/images/homepagebanner.jpg"
import Image from "next/image";

// lucide react social media icons
{/* <Instagram /> */ }
import { Instagram, Facebook, Phone, Headset, House, Info, Twitter, MapPinHouse } from 'lucide-react'
import { useAuthStore } from "@/store/useAuthStore";

const gridItems = [
  {
    title: "WOMEN",
    subtitle: "From world's top designer",
    image:
      // "https://images.unsplash.com/photo-1614251056216-f748f76cd228?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    title: "FALL LEGENDS",
    subtitle: "Timeless cool weather",
    image:
      // "https://avon-demo.myshopify.com/cdn/shop/files/demo1-winter1_600x.png?v=1733380268",
      "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhc2hpb258ZW58MHx8MHx8fDA%3D"
  },
  {
    title: "ACCESSORIES",
    subtitle: "Everything you need",
    image:
      // "https://avon-demo.myshopify.com/cdn/shop/files/demo1-winter4_600x.png?v=1733380275",
      "https://images.unsplash.com/photo-1485518882345-15568b007407?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D"
  },
  {
    title: "HOLIDAY SPARKLE EDIT",
    subtitle: "Party season ready",
    image:
      // "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D"
  },
];

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { banners, featuredProducts, fetchFeaturedProducts, fetchBanners } =
    useSettingsStore();

  const { isAuthenticated } = useAuthStore();


  const router = useRouter();

  useEffect(() => {
    fetchBanners();
    fetchFeaturedProducts();
  }, [fetchBanners, fetchFeaturedProducts, fetchBanners]);    // Refetch when auth changes

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(bannerTimer);
  }, [banners.length]);

  console.log(banners, featuredProducts);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[600px] overflow-hidden">
        {banners.map((bannerItem, index) => (
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            key={bannerItem.id}
          >
            <div className="absolute inset-0">
              <img
                src={bannerItem.imageUrl}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="text-white space-y-6">
                <span className="text-sm uppercase tracking-wider">
                  {/* I AM JOHN */}
                </span>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  WeaveFash
                  <br />
                  Best Trending Fashion
                </h1>
                <span className="text-lg">
                  SHOP. CLICK. ENJOY

                  <br />

                </span>
                <Button
                  // onClick={() => router.push("/api/products")}
                  onClick={() => router.push("/listing")}
                  className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg"
                >
                  SHOP NOW
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === index
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
                }`}
            />
          ))}
        </div>
      </section>


      {/* Description section */}
      <section className="py-12">
        <div className="container mx-auto px-4 relative ">

          <div className="items-center p-6">
            <h1 className="text-3xl text-center font-semibold mb-2 "> Discover our offerings</h1>
            <p className="text-center text-gray-500 mb-8 ">Elevate your shopping experience</p>

            {/* paragraph description section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

              {/* Grid layout for paragraphs */}
              {/* Column1 */}

              <div>
                <h3 className="text-lg font-semibold p-2">
                  Elevate Your Everyday Look
                </h3>
                <p className="text-gray-600">
                  Who says everyday style can’t be extraordinary?
                  Step up your fashion game.
                  From casual wear to work essentials, and everything in between, our pieces are made to blend seamlessly into your life.            </p>
              </div>

              {/* Column2 */}
              <div>
                <h3 className="text-lg font-semibold p-2 ">
                  Fashion for Every Mood
                </h3>
                <p className="text-gray-600">
                  Life is full of moods, and so is your wardrobe. Whether you’re feeling bold, serene, or simply casual, we have a style for every vibe.
                </p>
              </div>

              {/* Column 3 */}
              <div>
                <h3 className="text-lg font-semibold">
                  Your Style, Your Story
                </h3>
                <p className="text-gray-600 p-2">
                  Fashion is an extension of who you are — it tells your story without saying a word.
                  Each item is a reflection of your individuality, empowering you to own your narrative in the world of fashion.
                </p>
              </div>
            </div>
          </div>

          {/* Image Wrapper */}
          <div className="container relative w-full h-[600px] mt-10">

            <Image
              src={homepagebanner}
              alt="homepagebanner"
              // height={700}
              // width={800}
              // className=" items-center flex flex-col"
              className="w-full h-[600px] object-cover"
            />

            {/* overlay text */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-white text-center space-y-4">
                <h1 className="text-5xl font-semibold uppercase tracking-wider">
                  SHOP. CLICK. ENJOY.
                </h1>
                <p className="text-lg">Your one-stop destination for fashion and style.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* grid section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-semibold mb-2">
            AUTUMN IS HERE
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Designed to keep your satisfaction and warmth
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gridItems.map((gridItem, index) => (
              <div key={index} className="relative group overflow-hidden">
                <div className="aspect-[3/4]">
                  <img
                    src={gridItem.image}
                    alt={gridItem.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {gridItem.title}
                    </h3>
                    <p className="text-sm">{gridItem.subtitle}</p>
                    <Button className="mt-4 bg-white text-black hover:bg-gray-100">
                      SHOP NOW
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature products section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-semibold mb-2">
            NEW ARRIVALS
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Shop our new arrivals from established brands
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((productItem, index) => (
              <div key={index} className="relative group overflow-hidden">
                <div className="aspect-[3/4]">
                  <img
                    src={productItem.images[0]}
                    alt={productItem.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {productItem.name}
                    </h3>
                    <p className="text-sm">{productItem.price}</p>
                    <Button className="mt-4 bg-white text-black hover:bg-gray-100">
                      QUICK ViEW
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* contact and info section */}

      <section>

        <div className="container mx-auto object-cover bg-gray-300 mt-6 p-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-black text-center p-6">

            <div>
              {/* Flexbox for icon and title */}
              <div className="flex items-center justify-center gap-2">
                <Info className="w-6 h-6 text-black" />

                <h1 className="text-2xl font-bold">
                  About us
                </h1>
              </div>

              <p className=" text-black mt-4 p-3">
                At <span className="font-semibold text-black">WeaveFash</span>, we believe that shopping should be effortless, exciting, and tailored to you.
                Whether you're searching for the latest fashion trends, exclusive deals, or a seamless shopping experience, we've got you covered.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-6 h-6 text-black" />

                <h1 className="text-2xl font-bold">
                  Contact
                </h1>
              </div>

              <p className="flex flex-row gap-6 items-center justify-center mt-8  ">
                <Instagram /> <Headset /> <Twitter />
                <Facebook />

              </p>
            </div>

            <div>

              <div className="flex items-center justify-center gap-2">
                <MapPinHouse className="w-6 h-6 text-black" />
                <h1 className="text-2xl font-bold">
                  Location
                </h1>
              </div>

              {/* <p className="text-black mt-4 p-3 text-center justify-center">
                <h1>WeaveFash HQ </h1>
                <h1> 789 Maplewood Avenue Suite 405</h1>
                <h1> Rivertown, CA 92834 </h1>
                <h1> United States </h1>
              </p> */}

              <div className="text-black mt-4 p-3 text-center justify-center space-y-2">
                <h1 className="text-xl font-bold">WeaveFash HQ</h1>
                <p className="text-base">789 Maplewood Avenue Suite 405</p>
                <p className="text-base">Rivertown, CA 92834</p>
                <p className="text-base">United States</p>
              </div>
            </div>


          </div>

        </div>



      </section>






    </div>
  );
}

export default HomePage;
