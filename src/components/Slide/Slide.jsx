import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const Slide = ({ image, text }) => {
    return (
        <div
            className='w-full bg-center bg-cover h-[38rem]'
            style={{
                backgroundImage: `url(${image})`,
            }}
        >
            <motion.div
                initial={{ rotate: 0, color: '#fff' }}
                animate={{ rotate: [0, 10, -10, 0], color: ['#fff', '#00f', '#f00', '#0f0'] }}
                transition={{ duration: 10, repeat: Infinity }}
                className='flex items-center justify-center w-full h-full bg-gray-900/70'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                        {text}
                    </h1>
                    <br />
                    <Link
                        to='/services'
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
                        >Explore more
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default Slide