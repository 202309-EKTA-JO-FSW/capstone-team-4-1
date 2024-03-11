"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";

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
            <div>Loading...</div>
        )
    } else {
        console.log(customer);
    }

    return ( 
        <div> 
            {/* <Navbar /> */}
            <div>
                <h1>Hi Customer, {customer.firstName}</h1>
            </div>
            {/* <Footer /> */}
        </div> 
    ); 
}

export default CusotmerProfile;