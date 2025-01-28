import React, { useContext } from 'react'
import { AuthContext } from '../../components/provider/AuthProvider'
import { Helmet } from 'react-helmet-async';

function UserHome() {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <Helmet>
                <title>Pet | UserHome</title>
            </Helmet>
            <h2 className='text-3xl text-center text-orange-600 font-semibold'>
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
        </div>
    )
}

export default UserHome
