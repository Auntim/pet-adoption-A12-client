import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import registrationLotti from '../../assets/lotti/logout.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../provider/AuthProvider';
// import axios from 'axios';
import toast from 'react-hot-toast';
import { imageUpload } from '../hooks/utils';
import useAxiosPublic from '../hooks/useAxiosPublic';
import SocialLogin from '../SocialLogin/SocialLogin';

function Register() {
    const axiosPublic = useAxiosPublic();
    const { createUser, setUser, updateuser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const lengthRegex = /.{6,}/;

        if (!uppercaseRegex.test(password)) {
            return 'Password must have at least one uppercase letter.';
        }
        if (!lowercaseRegex.test(password)) {
            return 'Password must have at least one lowercase letter.';
        }
        if (!lengthRegex.test(password)) {
            return 'Password must be at least 6 characters long.';
        }
        return null;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        const form = new FormData(e.target);
        const name = form.get('name')
        const image = e.target.image.files[0];
        const email = form.get('email');
        const password = form.get('password');

        const imageUrl = await imageUpload(image);

        // form.append('image', image);

        // const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbApiKey}`, form);

        // const imageUrl = data.data.display_url;

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                updateuser(name, imageUrl)
                const userInfo = {
                    name,
                    email,
                    imageUrl
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast.success('Registration successful. Please login.');
                            navigate('/');
                        }
                    })

            })
            .catch((error) => {
                setError(error.message || 'Registration failed. Please try again.');
                console.error(error);
            });

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Helmet>
                <title>Pet | Registrar</title>
            </Helmet>
            <div className=' rounded-lg p-6'>
                <Lottie className='h-30 w-30 w-full' animationData={registrationLotti}></Lottie>
            </div>
            <div className="card bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full text-white max-w-sm my-5 shadow-2xl">
                <form onSubmit={handleSignUp} className="card-body ">
                    <h2 className="text-2xl font-bold text-slate-800">Register</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo Url</span>
                        </label>
                        <input
                            type="file"
                            // placeholder="Photo url"
                            name="image"
                            className="rounded-md "
                            required
                            accept='image/*'
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            className="input input-bordered"
                            required
                        />
                        <label className="flex justify-center items-center">
                            <p className="text-center my-1 label-text-alt text-[14px]">
                                Already have an Account?{' '}
                                <span>
                                    <Link to="/login" className="text-xl font-semibold text-slate-700 hover:underline">
                                        Login
                                    </Link>
                                </span>
                            </p>
                        </label>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="form-control mt-2">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                    <div className="divider">OR</div>
                    <div>
                        <SocialLogin></SocialLogin>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;