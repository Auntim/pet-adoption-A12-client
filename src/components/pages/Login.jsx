import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import loginLotti from '../../assets/lotti/login.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../provider/AuthProvider';


function Login() {
    const { googleSignIn, signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const result = await signInUser(email, password);
            // console.log('Email Login Successful:', result.user);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: `Welcome back, ${result.user.email}!`,
            });
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Email Login Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password. Please try again.',
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await googleSignIn();
            console.log('Google Sign-In Successful:', result.user);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: `Welcome back, ${result.user.displayName}!`,
            });
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Google Sign-In Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Google sign-in was unsuccessful. Please try again.',
            });
        }
    };

    return (
        <div className="flex justify-center dark:bg-medium dark:text-white  items-center min-h-screen gap-4  bg-base-100">
            <Helmet>
                <title>Pet | Login</title>
            </Helmet>
            <div className='w-2/5  bg-base-100 rounded-lg p-6'>
                <Lottie className='' animationData={loginLotti}></Lottie>
            </div>
            <div className="card p-6 w-3/5 dark:bg-medium dark:text-white max-w-sm shadow-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 card-body">
                    <h2 className="text-3xl font-bold mb-4">Login</h2>
                    <div>
                        <label className="block text-xl font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className={`input input-bordered w-full ${errors.email ? 'border-red-500' : ''}`}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xl font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className={`input input-bordered w-full ${errors.password ? 'border-red-500' : ''}`}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">Login</button>
                    <p className='text-center'>
                        Don't have an account? <Link to="/register" className="text-xl font-semibold text-black-700 hover:underline">Register</Link>
                    </p>
                </form>

                {/* Divider */}
                <div className="divider">OR</div>

                {/* Google Sign-In Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="btn btn-outline w-full flex items-center justify-center gap-2 text-xl"
                >
                    <FaGoogle className="w-5 h-5" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

export default Login;