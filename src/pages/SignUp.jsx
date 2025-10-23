import axios from '../api/backendAPI';
import React, { useState } from 'react'
import Navbar from '../components/Navbar';

function SignUp(){
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        contactNo: "",
        emailId: "",
        password: "",
        gender: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: ""
    })
    const handelSub = (event) => {
        event.preventDefault();
        console.log(values)
        axios.post("/customer/signup",values )
        .then((res) => {
            console.log(res)
            if(res.data.message != null){
                alert(res.data.message)
            }else{
                alert("error")
            }
        })
    }

    return(
        <>
        <Navbar/>
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form  onSubmit={handelSub}>
                    <div className="mb-5">
                        <label htmlFor="firstName" className="mb-3 block text-base font-medium text-[#07074D]">
                            First Name
                        </label>
                        <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={(e) => setValues({...values, firstName : e.target.value})}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="lastName" className="mb-3 block text-base font-medium text-[#07074D]">
                            Last Name
                        </label>
                        <input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={(e) => setValues({...values, lastName : e.target.value})}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                            Phone Number
                        </label>
                        <input type="text" name="phone" id="phone" placeholder="Enter your phone number" onChange={(e) => setValues({...values, contactNo : e.target.value})}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                            Email Address
                        </label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" onChange={(e) => setValues({...values, emailId : e.target.value})}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                            Password
                        </label>
                        <input type="password" name="password" id="password" placeholder="Enter your password" onChange={(e) => setValues({...values, password : e.target.value})}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="gender" className='mb-3 block text-base font-medium text-[#07074D]'>
                            Gender
                        </label>
                        <input type="confirmPassword" name="Gender" id="Gender" placeholder="Gender" onChange={(e) => setValues({...values, gender : e.target.value})}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-5 pt-3">
                        <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                            Address Details
                        </label>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <input type="text" name="Street1" id="Street1" placeholder="Enter Street 1" onChange={(e) => setValues({...values, addressLine1 : e.target.value})}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <input type="text" name="Street2" id="Street2" placeholder="Enter Street 2" onChange={(e) => setValues({...values, addressLine2 : e.target.value})}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <input type="text" name="city" id="city" placeholder="Enter city" onChange={(e) => setValues({...values, city : e.target.value})}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <input type="text" name="state" id="state" placeholder="Enter state" onChange={(e) => setValues({...values, state : e.target.value})}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <input type="text" name="post-code" id="post-code" placeholder="Post Code" onChange={(e) => setValues({...values, pincode : e.target.value})}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type='submit'
                            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default SignUp