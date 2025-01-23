import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../provider/AuthProvider'
import useAxiosSecure from './useAxiosSecure'
import { useContext } from "react";

function useAdmin() {

    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            // console.log('asking for is admin', user)
            // const res = await axiosSecure.get(`user/isAdmin/${user?.email}`);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]


}

export default useAdmin
