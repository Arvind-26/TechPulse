import React from 'react'
import mongoose from "mongoose"
import up from "../models/up"
import { useContext } from 'react';
import AppContext from '../context/AppContext';


function logout(){
    localStorage.removeItem("sharedValues")
    window.location.replace('/')
}

const profile = ({ users }) => {
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
  return (
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
    </main>
  )
}

export default profile

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.Monogodb_uri)
  }
  let users = await up.find()
  return {
    props: { users: JSON.parse(JSON.stringify(users)) }
  }
}