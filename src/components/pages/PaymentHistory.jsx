import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import LoadingSpinner from "../../Shared/LoadingSpinner";


const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = user?.email;

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/payment-history?email=${userEmail}`
                );
                const data = await response.json();
                setPaymentHistory(data);
            } catch (err) {
                console.error("Error fetching payment history:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, [userEmail]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Payment History</h2>
            {paymentHistory.length === 0 ? (
                <p className="text-center text-gray-500">No payment history found.</p>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">Date</th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">Pet Name</th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">Amount</th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">Payment ID</th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment) => (
                            <tr key={payment._id} className="border-t">
                                <td className="px-6 py-3">
                                    {new Date(payment.date).toLocaleDateString()}{" "}
                                    {new Date(payment.date).toLocaleTimeString()}
                                </td>
                                <td className="px-6 py-3">{payment.petName}</td>
                                <td className="px-6 py-3">${payment.amount}</td>
                                <td className="px-6 py-3">{payment.paymentId}</td>
                                <td className="px-6 py-3">
                                    <span
                                        className={`px-3 py-1 rounded ${payment.status === "Success"
                                            ? "bg-green-200 text-green-700"
                                            : payment.status === "Failed"
                                                ? "bg-red-200 text-red-700"
                                                : "bg-yellow-200 text-yellow-700"
                                            }`}
                                    >
                                        {payment.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentHistory;
