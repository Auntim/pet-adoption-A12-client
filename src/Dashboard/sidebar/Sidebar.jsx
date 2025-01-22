import { useContext, useState } from 'react'
// import { GrLogout } from 'react-icons/gr'
// import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
// import { BsGraphUp } from 'react-icons/bs'
// import MenuItem from './Menu/MenuItem'

// import useAuth from '../../../hooks/useAuth'

// import AdminMenu from './Menu/AdminMenu'
import { Link } from 'react-router-dom'
// import SellerMenu from './Menu/SellerMenu'
// import CustomerMenu from './Menu/CustomerMenu'
import logo from '../../assets/images/logo.png'
import { AuthContext } from '../../components/provider/AuthProvider'
const Sidebar = () => {
    const { logOut } = useContext(AuthContext)
    const [isActive, setActive] = useState(false)

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <img
                                // className='hidden md:block'
                                src='https://i.ibb.co/4ZXzmq5/logo.png'
                                alt='logo'
                                width='100'
                                height='100'
                            />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto'>
                            <Link to='/'>
                                <img
                                    // className='hidden md:block'
                                    src={logo}
                                    alt='logo'
                                    width='100'
                                    height='100'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            {/*  Menu Items */}
                            {/* <CustomerMenu /> */}
                            {/* <SellerMenu /> */}

                            {/* <MenuItem
                                icon={BsGraphUp}
                                label='Statistics'
                                address='/dashboard'
                            /> */}
                            {/* <AdminMenu /> */}
                        </nav>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Sidebar