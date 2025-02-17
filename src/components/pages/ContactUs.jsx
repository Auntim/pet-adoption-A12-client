import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ContactUs = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        toast.success('Thank you for contacting us!');
        // Reset form after submission
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
        });
    };

    return (
        <section className=" py-12 dark:bg-medium dark:text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-5xl font-bold text-orange-600 mb-2 text-center dark:text-white">Contact Us</h2>
                <p className='text-sm text-center opacity-70 mb-8 dark:text-white'>Here You are connect with out Team.Please fill free to contact me.</p>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-medium"
                >
                    {/* First Name and Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block text-xl font-medium text-gray-700 dark:text-white">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-medium"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-xl font-medium text-gray-700 dark:text-white">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-medium"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-xl font-medium text-gray-700 dark:text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-medium"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-xl font-medium text-gray-700 dark:text-white">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-medium"
                                required
                            />
                        </div>

                    </div>
                    {/* Message */}
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-xl font-medium text-gray-700 dark:text-white">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-medium"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full dark:btn-outline dark:text-white dark:btn dark:bg-black"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactUs;