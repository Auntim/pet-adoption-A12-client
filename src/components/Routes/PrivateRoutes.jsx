import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()

    if (loading) return <LoadingSpinner />
    if (user) return children
    return <Navigate to='/login' state={{ from: location }} replace='true' />
}



export default PrivateRoutes