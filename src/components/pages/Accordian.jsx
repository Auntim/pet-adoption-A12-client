import React from 'react'

const Accordian = () => {
    return (
        <div className='px-12 mx-auto dark:bg-medium mb-12'>
            <h2 className="text-2xl md:text-5xl text-orange-600 dark:text-white font-bold text-center mb-8 ">Pet Adoption FAQs</h2>

            <div className="collapse collapse-plus bg-base-200 dark:bg-medium border border-black dark:border-2 mb-2">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium dark:text-white">What are the requirements for adopting a pet?</div>
                <div className="collapse-content">
                    <p className='dark:text-white'> To adopt a pet, you must be at least 18 years old, provide a valid ID, and have a stable living situation. Some shelters may also require a home visit or reference checks.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 dark:bg-medium dark:border-2 mb-2">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium dark:text-white">How much does it cost to adopt a pet?</div>
                <div className="collapse-content">
                    <p className='dark:text-white'>Adoption fees vary depending on the shelter or organization. Typically, fees range from $50 to $300 and often include vaccinations, spaying/neutering, and microchipping.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 dark:bg-medium dark:border-2">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium dark:text-white">Can I adopt a pet if I live in an apartment?</div>
                <div className="collapse-content">
                    <p className='dark:text-white'>Yes, you can adopt a pet if you live in an apartment. However, some landlords have restrictions on pet ownership, so make sure to check your lease agreement first.</p>
                </div>
            </div>
        </div>
    )
}

export default Accordian
