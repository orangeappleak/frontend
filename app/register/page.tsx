'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';

const Register = () => {

    return <section id="register-page-wrapper" className="relative box-border w-screen h-screen">
        <div id="register-page" className="relative bg-slate-900 box-border p-2  w-full h-full">
            <div id="register-page-inner" className="flex flex-row overflow-hidden w-full h-full">

                <div id="regsiter-image" className='flex-1 relative rounded-xl overflow-hidden'>
                    <div id="register-image-wrapper" className='box-border'>
                        <div id="register-image-content" className='absolute flex items-center h-full z-10 py-20 px-10 box-border'>
                            <h1 className='text-6xl font-extralight text-center text-white z-10'>Paving way for your business to grow.</h1>
                        </div>
                        <Image className='absolute top-0 left-0 h-full contrast-125 brightness-75' src="https://images.unsplash.com/photo-1516472096803-187d3339b36f?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={10000} height={10000} alt='no image' />
                    </div>
                </div>
                <div id="register-form-wrapper" className='flex-[2]'>
                    <RegisterPopUp />
                </div>
            </div>

        </div>
    </section>
}

const RegisterPopUp = () => {

    enum userType {
        finExpert = 'financial-expert',
        businessUser = 'business-user'
    }

    const [user, setUserType] = useState(userType.finExpert);

    useEffect(() => {
        console.log("show register pop up to", user);
    }, [user])

    const handleUserChange = (user: userType, e: any) => {
        setUserType(user);
    }

    return (
        <div id="register-wrapper" className="top-0 text-white box-border py-20 px-40 left-0 w-full h-full relative flex">
            <div className="h-auto w-full flex flex-col items-center" id="register-pop-up">
                <div id="close-button"><h1>Close</h1></div>
                <div id="register-heading">
                    <h1 className="font-extralight text-4xl pointer-events-none">Create an Account</h1>
                </div>
                <div id="user-type-wrapper" className="w-3/4 flex flex-row justify-center h-auto">
                    <div onClick={(e) => handleUserChange(userType.finExpert, e)} style={{ backgroundColor: user === userType.finExpert ? 'white' : 'transparent', color: user === userType.finExpert ? 'black' : 'white' }} className="border-2 transition-all duration-500 ease-in-out border-white px-5 py-3 rounded-xl m-2" id="financial-expert">
                        <h1 className="pointer-events-none">Financial Expert</h1>
                    </div>
                    <div onClick={(e) => handleUserChange(userType.businessUser, e)} style={{ backgroundColor: user === userType.businessUser ? 'white' : 'transparent', color: user === userType.businessUser ? 'black' : 'white' }} className="border-2 transition-all duration-500 ease-in-out border-white px-5 py-3 rounded-xl m-2" id="business-user">
                        <h1 className="pointer-events-none">Business User</h1>
                    </div>
                </div>

                {user == userType.businessUser ? <RegisterBusinessUser /> : <RegisterFinancialUser />}
            </div>
        </div >
    )
}

const RegisterBusinessUser = () => {
    return <div id="register-options">

    </div>
}

const RegisterFinancialUser = () => {

    const [expertData, setExpertData] = useState({
        name: '',
        expertise: '',
        location: '',
        hourlyRate: '',
        description: '',
        availability: 'Available now',
        rating: 0,
        password: '',
        reviews: 0
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setExpertData(prev => ({
            ...prev,
            [name]: value
        }));

        console.log(expertData);
    };

    const filterOptions = {
        expertise: ['all', 'Tax Accounting', 'CFO Services', 'Revenue Operations'],
        location: ['all', 'New York', 'Chicago', 'San Francisco'],
        rating: ['all', '4.5+', '4.0+', '3.5+']
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/experts/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expertData),
            });

            if (response.ok) {
                setExpertData({
                    name: '',
                    expertise: '',
                    location: '',
                    hourlyRate: '',
                    description: '',
                    availability: 'Available now',
                    rating: 0,
                    password: '',
                    reviews: 0
                });
            }
        } catch (error) {
            console.error('Error registering expert:', error);
        }
    };

    return <div id="register-options" className="w-full flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
                <label className="block text-white/40 text-sm font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={expertData.name}
                    onChange={handleInputChange}
                    className="w-full opacity-25 focus:opacity-100 transition-all duration-500 p-2 border-b-2 border-white outline-none bg-transparent"
                    required
                    autoComplete='off'
                />
            </div>
            <div>
                <label className="block text-white/40 text-sm font-medium">Expertise</label>
                <select
                    name="expertise"
                    value={expertData.expertise}
                    onChange={handleInputChange}
                    className="w-full opacity-25 focus:opacity-100 transition-all duration-500 p-2 border-b-2 border-white outline-none bg-transparent"
                    required
                >
                    <option value="">Select expertise</option>
                    {filterOptions.expertise.filter(e => e !== 'all').map(expertise => (
                        <option className='text-black' key={expertise} value={expertise}>{expertise}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-white/40 text-sm font-medium">Location</label>
                <select
                    name="location"
                    value={expertData.location}
                    onChange={handleInputChange}
                    className="w-full opacity-25 focus:opacity-100 transition-all duration-500 p-2 border-b-2 border-white outline-none bg-transparent"
                    required
                >
                    <option value="">Select location</option>
                    {filterOptions.location.filter(l => l !== 'all').map(location => (
                        <option className='text-black' key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-white/40 text-sm font-medium">Hourly Rate</label>
                <input
                    type="text"
                    name="hourlyRate"
                    value={expertData.hourlyRate}
                    onChange={handleInputChange}
                    placeholder="e.g. $150-200"
                    className="w-full opacity-25 focus:opacity-100 transition-all duration-500 p-2 border-b-2 border-white outline-none bg-transparent"
                    required
                    autoComplete='off'
                />
            </div>
            <div>
                <label className="block text-white/40 text-sm font-medium">Description</label>
                <input
                    name="description"
                    value={expertData.description}
                    onChange={handleInputChange}
                    className="w-full opacity-25 focus:opacity-100 transition-all duration-500 p-2 border-b-2 border-white outline-none bg-transparent"
                    required
                    autoComplete='off'
                />
            </div>
            <div>
                <label className="block text-white/40 text-sm font-medium">Availability</label>
                <select
                    name="availability"
                    value={expertData.availability}
                    onChange={handleInputChange}
                    className="w-full opacity-25 focus:opacity-100 transition-all duration-500 p-2 border-b-2 border-white outline-none bg-transparent"
                    required
                >
                    <option className='text-black' value="Available now">Available now</option>
                    <option className='text-black' value="Available next week">Available next week</option>
                    <option className='text-black' value="Available in 2 weeks">Available in 2 weeks</option>
                </select>
            </div>
            <div >
                <label className="block text-white/40 text-sm font-medium">Password</label>
                <input
                    type="password"
                    name="password"
                    value={expertData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className="w-full opacity-50 focus:opacity-100 transition-all duration-500 p-2 border-b-2 border-white outline-none bg-transparent"
                    required
                    autoComplete='off'
                />
            </div>
            <div id="submit-buttom" className='w-full flex items-center justify-center'>
                <button
                    type="submit"
                    className="w-1/2 bg-blue-700/20 hover:w-3/4 text-white px-4 py-5 rounded-lg hover:bg-blue-700 transition-all duration-500"
                >
                    Register
                </button>
            </div>
        </form>
    </div>
}


export default Register;