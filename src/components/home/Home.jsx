import React from 'react'
import { Helmet } from 'react-helmet-async'
import Carousel from '../pages/Carousel'
import CTASection from '../../Shared/CTASection'
import AboutUs from '../../Shared/AboutUs'
import PetsListing from '../pages/PetsListing'
import Reviews from '../pages/Reviews'
import ContactUs from '../pages/ContactUs'
import Accordian from '../pages/Accordian'

function Home() {
    return (
        <div>
            <Helmet>
                <title>Pet | Home</title>
            </Helmet>

            <section className=''>
                <Carousel></Carousel>
            </section>
            <section>
                <PetsListing limit={6}></PetsListing>
            </section>
            <section>
                <CTASection></CTASection>
            </section>
            <section className=''>
                <AboutUs></AboutUs>
            </section>
            <section>
                <Reviews />
            </section>
            <section>
                <ContactUs />
            </section>
            <section>
                <Accordian />
            </section>

        </div>
    )
}

export default Home
