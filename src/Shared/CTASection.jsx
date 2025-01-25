import React from "react";
import cta from '../assets/images/carousel2.jpeg'
import { Link } from "react-router-dom";

const CTASection = () => {
    return (
        <section className="relative  py-16 px-6 md:px-12 lg:px-20">
            <h2 className="text-5xl text-center font-bold text-orange-600 mb-8 ">---Adopt a Pets---</h2>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                        Adopt a Pet, Change a Life!
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Give these adorable pets a loving home and make a difference in their lives.
                        Your care can provide them with the happiness they deserve.
                    </p>
                    <div className="mt-6 flex justify-center lg:justify-start gap-4">
                        <Link to="/allpets">
                            <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition">
                                Explore Pets
                            </button>
                        </Link>
                        <Link>
                            <button className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-900 transition">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Right Image */}
                <div className="flex-1">
                    <img
                        src={cta} // Replace with your image path
                        alt="Adoptable Pets"
                        className="rounded-lg shadow-lg w-full object-cover max-h-[400px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default CTASection;
