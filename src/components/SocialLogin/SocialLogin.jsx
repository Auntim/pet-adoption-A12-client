import React, { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

function SocialLogin() {
    const { googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        toast.success('Registration successful. Welcome to the Home!');
                        navigate(from, { replace: true });
                    })
            })
    };

    return (
        <div>
            <button
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full flex items-center justify-center gap-2 text-xl"
            >
                <FaGoogle className="w-5 h-5" />
                Sign in with Google
            </button>

        </div>
    )
}

export default SocialLogin
