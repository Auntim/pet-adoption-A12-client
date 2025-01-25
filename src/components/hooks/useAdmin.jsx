import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';

function useAdmin() {

    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            // console.log('asking for is admin', user)
            const res = await axiosSecure.get(`users/admin/${user?.email}`);
            console.log('admin is', res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]


}

export default useAdmin
