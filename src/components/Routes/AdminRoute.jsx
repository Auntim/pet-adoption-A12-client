import { Navigate, useLocation } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin'
import { AuthContext } from '../provider/AuthProvider'
import LoadingSpinner from '../../Shared/LoadingSpinner'
import { useContext } from 'react'

function AdminRoute(children) {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()


    if (loading || isAdminLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace='true' />
}

export default AdminRoute
