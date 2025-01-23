import React from 'react'
import { Helmet } from 'react-helmet-async'
import Carousel from '../pages/Carousel'
import CTASection from '../../Shared/CTASection'
import AboutUs from '../../Shared/AboutUs'
import PetsListing from '../pages/PetsListing'

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
                <PetsListing></PetsListing>
            </section>
            <section>
                <CTASection></CTASection>
            </section>
            <section className='mt-6'>
                <AboutUs></AboutUs>
            </section>

        </div>
    )
}

export default Home
