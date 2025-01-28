import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
// import LoadingSpinner from "../../Shared/LoadingSpinner";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";


const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    // const [paymentHistory, setPaymentHistory] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const userEmail = user?.email;
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments`)
            return res.data;

        }

    })


    return (
        <div>
            <Helmet>
                <title>Pet | My-Doantion</title>
            </Helmet>
            <h2 className='text-2xl text-semibold text-center'>payments History: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="dark:text-white text-xl">
                            <th>#</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-orange-600 text-[16px]">
                        {payments.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>{payment.donorEmail}</td>
                            <td>${payment.amount}</td>
                            <td>{payment.paymentIntentId}</td>
                            <td>{payment.status}</td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default PaymentHistory;
