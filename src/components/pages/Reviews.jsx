// src/components/Reviews.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper styles
import 'swiper/css/navigation'; // Optional navigation styles
import { Navigation } from 'swiper/modules'; // Import navigation module

const reviews = [
    {
        id: 1,
        name: 'John Doe',
        image: 'https://i.ibb.co.com/rmMy6Pg/Screenshot-21.png', // Placeholder image URL
        rating: 3,
        text: 'Amazing service! The team was very professional and delivered beyond my expectations.',
    },
    {
        id: 2,
        name: 'Jane Smith',
        image: 'https://i.ibb.co.com/T8jJ6S8/Screenshot-24.png', // Placeholder image URL
        rating: 4,
        text: 'I highly recommend this company. They are reliable, efficient, and friendly.',
    },
    {
        id: 3,
        name: 'Alice Johnson',
        image: 'https://i.ibb.co.com/CwDJb7s/Screenshot-22.png', // Placeholder image URL
        rating: 5,
        text: 'Fantastic experience! Everything was handled smoothly and on time.',
    },
    {
        id: 4,
        name: 'Bob Brown',
        image: 'https://i.ibb.co.com/Wsg4Qkc/Screenshot-23.png',
        rating: 5,
        text: 'Great work! I will definitely use their services again.',
    },
    {
        id: 5,
        name: 'Md Rahim',
        image: 'https://i.ibb.co.com/Wsg4Qkc/Screenshot-23.png',
        rating: 4,
        text: 'Great work! I will definitely use their services again.',
    },
    {
        id: 6,
        name: 'Shahidul Islam',
        image: 'https://i.ibb.co.com/rmMy6Pg/Screenshot-21.png',
        rating: 5,
        text: 'Great work! I will definitely use their services again.',
    },
];

const Reviews = () => {
    return (
        <section className=" py-12 dark:bg-medium">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center text-orange-700 mb-4 dark:text-white">What Our Customers Are Saying</h2>
                <p className='text-center text-[16px] text-gray-700 mb-6 dark:text-white'>Holisticly facilitate bricks-and-clicks alignments vis-a-vis mission-critical innovation. Progressively morph transparent materials <br /> via robust technologies. Enthusiastically promote 24/7 catalysts for change before functionalized.</p>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation // Add navigation arrows
                    loop // Infinite loop
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <div className="flex flex-col items-center text-center dark:bg-medium dark:border-2 dark:text-white bg-white p-6 rounded-lg shadow-md h-full">
                                {/* Image */}
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-24 h-24 rounded-full mb-4"
                                />
                                {/* Name */}
                                <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
                                {/* Rating */}
                                <div className="flex space-x-1 mb-2">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-500">★</span>
                                    ))}
                                </div>
                                {/* Text */}
                                <p className="text-gray-600 dark:text-white">{review.text}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Reviews;