import React, { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaGithub, FaGoogle } from 'react-icons/fa';

function SocialLogin() {
    const { googleSignIn, githubSignIn } = useContext(AuthContext);
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

    const handleGithubLogin = async () => {
        try {
            const result = await githubSignIn();
            console.log('Github Sign-In Successful:', result.user);
            toast.success('Successfully Logged In')
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Github Sign-In Error:', error.message);
            toast.error(error.message);
        }
    };

    return (
        <div>
            {/* google sign in */}
            <button
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full flex items-center dark:text-white justify-center gap-2 text-xl"
            >
                <FaGoogle className="w-5 h-5 dark:text-white " />
                Sign in with Google
            </button>

            {/* github sign in */}
            <button
                onClick={handleGithubLogin}
                className="btn btn-outline w-full flex items-center justify-center gap-2 text-[14px] md:text-xl dark:text-white mt-1.5 text-white"
            >
                <FaGithub className="w-3 h-3 md:w-5 md:h-5 dark:text-white text-black" />
                Sign in with Github
            </button>


        </div>
    )
}

export default SocialLogin
