import React from 'react';
import { FaHome } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaCat } from "react-icons/fa";




const Adoption = () => {
    return (
        <section className="dark:bg-medium dark:text-white py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-5xl text-orange-600 dark:text-white font-bold text-center mb-8">---PLANNING TO ADOPT A PETS?----</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Checklist for New Adopters */}
                    <div className=" p-6 rounded-lg   dark:border-2 dark:border-fuchsia-500 mb-8">
                        <FaHome className="text-7xl text-fuchsia-500 mb-8 text-center flex mx-auto" />
                        <h3 className="text-2xl font-semibold mb-4 text-center text-fuchsia-600">CHECKLIST FOR NEW ADOPTERS</h3>
                        <p className="text-gray-700 mb-8 text-center dark:text-white">
                            Make the adoption transition as smooth as possible.
                        </p>
                        <button className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex mx-auto'>
                            Learn More
                        </button>
                    </div>

                    {/* Dog Age Calculator */}
                    <div className=" p-6 rounded-lg  mb-8 dark:border-2 dark:border-fuchsia-500 mb-8">
                        <BiSolidDonateBlood className="text-7xl text-fuchsia-500 mb-8 text-center flex mx-auto" />
                        <h3 className="text-2xl font-semibold mb-4 text-center text-fuchsia-600">HOW OLD IS A DOG IN HUMAN YEARS?</h3>
                        <p className="text-gray-700 mb-4 text-center dark:text-white">
                            Learn to translate dog years to human years just for fun, and vice versa. Finally answer
                            how old your dog is!
                        </p>
                        <button className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex mx-auto'>
                            Learn More
                        </button>
                    </div>

                    {/* Pet Adoption FAQs */}
                    <div className=" p-6 rounded-lg dark:border-2 dark:border-fuchsia-500 mb-8">
                        <FaCat className="text-7xl text-fuchsia-500 mb-8 text-center flex mx-auto" />
                        <h3 className="text-2xl font-semibold mb-4 text-center text-fuchsia-600">PET ADOPTION FAQS</h3>
                        <p className="text-gray-700 mb-12 text-center dark:text-white">
                            Get answers to all the questions you haven’t thought of for your adoption.
                        </p>
                        <button className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex mx-auto '>
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Adoption;