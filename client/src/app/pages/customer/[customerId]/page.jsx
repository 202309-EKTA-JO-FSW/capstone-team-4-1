"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";
import LoadingAnimation from "../../../components/loadingAnimation"; 

const CusotmerProfile = () => { 
    const params = useParams();
    const customerId = params.customerId;
    const [customer, setCustomer] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        fetch(`http://localhost:3001/customer/profile/${customerId}`, {
      headers: headers
    })
        .then(res => res.json())
        .then(data => setCustomer(data))
    }, [customerId]);

    if (!customer) {
        return (
            LoadingAnimation
        )
    } else {
        console.log(customer);
    }

    return ( 
        <div> 
            <Navbar />
            <div className='max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-32 bg-white shadow-xl rounded-lg text-gray-900'>
                <div className='rounded-t-lg h-32 overflow-hidden'>
                    <img src="/blur-restaurant.jpg" alt="background" className='object-cover object-top w-full' />
                </div>
                <div className='mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden'>
                    <img src="https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png" alt="profile picture" className='object-cover object-center h-32' />
                </div>
                <div className='text-center mt-2'>
                    <h2 className="font-semibold">{customer.firstName} {customer.lastName}</h2>
                    <p className="text-gray-500">{customer.email}</p>
                    <p className="text-gray-500">0{customer.phone}</p>
                    <p className="text-gray-500">Balance: {customer.balance}</p>
                    <p className="text-gray-500">Street: {customer.street}</p>
                    <p className="text-gray-500">Building Number: {customer.buildingNo}</p>
                </div>
            </div>
            <Footer />
        </div> 
    ); 
}

export default CusotmerProfile;