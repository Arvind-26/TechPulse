import Link from 'next/link'
import up from '../models/up'
import mongoose from "mongoose"
import { withRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import AppContext from '../context/AppContext';


const signup = ({ users, router }) => {
  const { setSharedValues } = useContext(AppContext);
  async function get({ users, router }) {
    let fname = document.getElementById("fname").value
    let lname = document.getElementById("lname").value
    let user = document.getElementById("user").value
    let add = document.getElementById("add").value
    let pass = document.getElementById("pass").value
    let cpass = document.getElementById("cpass").value
    let email = document.getElementById("email").value


    if (fname == "") document.getElementById("warning").classList.remove("hidden")
    else if (lname == "") document.getElementById("warning").classList.remove("hidden")
    else if (add == "") document.getElementById("warning").classList.remove("hidden")
    else if (pass == "") document.getElementById("warning").classList.remove("hidden")
    else if (cpass == "") document.getElementById("warning").classList.remove("hidden")
    else if (email == "") document.getElementById("warning").classList.remove("hidden")
    else if (user == "") document.getElementById("warning").classList.remove("hidden")
    else if (pass != cpass) document.getElementById("warningpass").classList.remove("hidden")
    else {
      if (users.includes(user)) document.getElementById("exists").classList.remove("hidden")
      else {
        document.getElementById("warningpass").classList.add("hidden")
        document.getElementById("exists").classList.add("hidden")
        document.getElementById("warning").classList.add("hidden")

        var j = [{
          "firstname": fname,
          "lastname": lname,
          "username": user,
          "email": email,
          "password": pass,
          "address": add
        }];

        const res = await fetch('http://localhost:3000/api/addup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(j),
        })
        const data = true
        
        setSharedValues({ value1: data, value2: user });
        router.push({
          pathname: '/',
        });
      }

    }
  }

  return (
    <main className="flex flex-col md:py-16 px-10 md:px-24 items-start w-auto m-8 md:my-14 md:mx-60 rounded-xl border-2 border-[#d30a03] gap-6">
      <label className=" text-[#d30a03] text-4xl font-bold m-5">Signup</label>
      <div className='md:px-8 flex flex-col w-full gap-6'>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>First Name:</label>
          <input id="fname" className='md:text-xl p-1 border-2 border-[#d30a03]' type="text" name="firstname" />
        </span>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>Last Name:</label>
          <input id="lname" className='md:text-xl p-1 border-2 border-[#d30a03]' type="text" name="lastname" />
        </span>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>Username:</label>
          <input id="user" className='md:text-xl p-1 border-2 border-[#d30a03]' type="text" name="lastname" />
        </span>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>Address:</label>
          <input id="add" className='md:text-xl p-1 border-2 border-[#d30a03]' type="text" name="address" />
        </span>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>Email:</label>
          <input id="email" className='md:text-xl p-1 border-2 border-[#d30a03]' type="email" name="email" />
        </span>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>Password:</label>
          <input id="pass" className='md:text-xl p-1 border-2 border-[#d30a03]' type="password" name="pass" />
        </span>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>Confirm Password:</label>
          <input id="cpass" className='md:text-xl p-1 border-2 border-[#d30a03]' type="password" name="repass" />
        </span>
      </div>
      <label htmlFor="" id='warning' className=' hidden text-red-900 text-xl'>! Fill all Fields</label>
      <label htmlFor="" id='warningpass' className=' hidden text-red-900 text-xl'>! Passwords do not match</label>
      <label htmlFor="" id='exists' className=' hidden text-red-900 text-xl'>! This username already exists</label>
      <button className=" text-white font-bold bg-[#d30a03] rounded-2xl py-1 px-5 text-xl m-4" onClick={() => get({ users, router })}>Signup</button>
      <label className='text-xl my-4 mx-auto'>Already have an account? <Link className='text-[#d30a03]' href={"/login"}>Login</Link></label>
    </main>
  )
}

export default withRouter(signup)

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.Monogodb_uri)
  }
  let users = await up.distinct("username")
  return {
    props: { users: JSON.parse(JSON.stringify(users)) }
  }
}