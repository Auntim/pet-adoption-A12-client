import React from "react";
import about from "../assets/images/cat1.jpeg";

const AboutUs = () => {
    return (
        <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
            <div className=" mx-auto text-center">
                {/* Heading */}
                <h2 className="text-5xl font-bold text-orange-600 mb-6 ">---About Us---</h2>
                {/* Content */}
                <div className="space-y-8  md:flex-row items-center gap-8">
                    {/* Text Section */}
                    <div className="flex-1">
                        <p className="text-xl font-semibold text-gray-600">
                            Welcome to Pet-Adoption, your trusted platform for giving pets a
                            loving home. This website was created to connect pets in need of
                            a family with compassionate individuals like you. We aim to make
                            adoption easy and rewarding for everyone involved.
                        </p>
                        <p className="mt-4 text-xl font-semibold text-gray-600">
                            Browse through our database of adorable pets, learn about their
                            stories, and take the first step toward giving them a better life.
                        </p>
                    </div>
                    {/* Image Section */}
                    <div className="flex">
                        <img
                            src={about} // Replace with your image path
                            alt="About Pet Adoption"
                            className="rounded-lg w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
