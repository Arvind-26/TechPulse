import React from 'react'
import mongoose from "mongoose"
import up from "../models/up"
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import Head from 'next/head';


function logout() {
  localStorage.removeItem("sharedValues")
  window.location.replace('/')
}


const Profile = ({ users }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { sharedValues } = useContext(AppContext);
  var fname;
  var lname;
  var email;
  var add;
  users.forEach(element => {
    if (element.username == sharedValues.value2) {
      fname = element.firstname
      lname = element.lastname
      email = element.email
      add = element.address
    }
  });


  async function delete_acc() {
    await fetch(`${API_URL}/api/addup`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "user": sharedValues.value2 })
    })
    localStorage.removeItem("sharedValues")
    window.location.replace('/signup')
  }

  return (<>
    <Head>
      <title>Profile</title>
    </Head>
    <main className="flex flex-col md:py-16 px-10 md:px-24 items-start w-auto m-8 md:my-14 md:mx-60 rounded-xl border-2 border-[#d30a03] gap-6">
      <label className=" text-[#d30a03] text-4xl font-bold m-5">Profile</label>
      <div className='md:px-8 flex flex-col w-full gap-6'>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>Name:</label>
          <label className='md:text-xl text-[#d30a03]'>{fname} {lname}</label>
        </span>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>Username:</label>
          <label className='md:text-xl text-[#d30a03]'>{sharedValues.value2}</label>
        </span>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>Address:</label>
          <label className='md:text-xl text-[#d30a03]'>{add}</label>
        </span>
        <span className='flex flex-col md:flex-row justify-between w-full'>
          <label className='md:text-xl'>Email:</label>
          <label className='md:text-xl text-[#d30a03]'>{email}</label>
        </span>
      </div>
      <button className=" text-white md:font-bold bg-[#d30a03] rounded-2xl py-1 px-5 text-xl md:mt-4" onClick={logout}>Log Out</button>
      <button className=" text-white md:font-bold bg-[#d30a03] rounded-2xl py-1 px-5 text-xl mb-2 md:mt-2" onClick={delete_acc}>Delete Account</button>
    </main></>
  )
}

export default Profile

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.Monogodb_uri)
  }
  let users = await up.find()
  return {
    props: { users: JSON.parse(JSON.stringify(users)) }
  }
}