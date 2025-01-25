import { FaBook, FaCalendar, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
// import useCart from "../hooks/useCart";
import { MdOutlinePets } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { MdBloodtype } from "react-icons/md";
import useAdmin from "../components/hooks/useAdmin";





const Dashboard = () => {
    // const [cart] = useCart();

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    // const isAdmin = true;

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allpets">
                                    <MdOutlinePets />
                                    All Pets</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/donate">
                                    <BiSolidDonateBlood />
                                    All Donations</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/history">
                                        <FaCalendar></FaCalendar>
                                        Adoption Request</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allAddedpets">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Added Pets </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addpets">
                                        <IoAddSharp className="h-5 w-5"></IoAddSharp>
                                        Add Pets</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/donationCampaigns">
                                        <FaList></FaList>
                                        Create Donation Campaign</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myDonationCampaigns">
                                        <IoMdPersonAdd className="h-5 w-5" />
                                        My Donation Campaign</NavLink>
                                </li>
                                <li>
                                    <NavLink to="ffd">
                                        <MdBloodtype className="h-5 w-5"></MdBloodtype>
                                        My Donation </NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/allpets">
                            <MdOutlinePets />
                            Allpets</NavLink>
                    </li>
                    <li>
                        <NavLink to="/alldonationCampaigns">
                            <BiSolidDonateBlood />
                            Donation</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;