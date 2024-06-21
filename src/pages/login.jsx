import Image from 'next/image'
import Link from 'next/link'
import mongoose from "mongoose"
import up from '../models/up'
import { withRouter } from 'next/router';
import { useContext } from 'react';
import React from 'react';
import AppContext from '../context/AppContext';
import Head from 'next/head';


const Login = ({ users, passwords, router }) => {
  const { setSharedValues } = useContext(AppContext);
  function get({ users, passwords, router }) {
    let user = document.getElementById("user").value
    let pass = document.getElementById("pass").value
    if (!users.includes(user)) document.getElementById("warning").classList.remove("hidden")
    else if (!passwords.includes(pass)) document.getElementById("warning").classList.remove("hidden")
    else {
      var digi = users.indexOf(user)
      if (passwords[digi] != pass) document.getElementById("warning").classList.remove("hidden");
      else {
        document.getElementById("warning").classList.add("hidden")
        const data = true
        setSharedValues({ value1: data, value2: user });
        router.push({
          pathname: '/',
        });
      }
    }
  }
  return (<>
    <Head>
      <title>login</title>
    </Head>
    <main className="flex flex-col md:flex-row w-auto justify-center m-8 md:m-14">
      <div className="  text-[#d30a03] flex flex-col items-center border-2 border-[#d30a03] py-16 px-24 rounded-t-xl md:rounded-t-none md:rounded-l-xl">
        <label className=" text-4xl font-bold m-10">Login</label>
        <label id='warning' className="hidden text-lg m-2">! username or password is inncorrect</label>
        <div className='flex m-4 justify-center'>
          <Image alt='username' src={"/profile-icon.png"} width={30} height={10} className=' rounded-l-lg h-10 w-10 bg-[#d30a03]' />
          <input id='user' className=" md:text-xl p-1 border-2 border-[#d30a03]" type="text" placeholder="Username" />
        </div>
        <div className='flex justify-center'>
          <Image alt='password' src={"/pass.png"} width={30} height={10} className=' rounded-l-lg h-10 w-10 bg-[#d30a03]' />
          <input id='pass' className=" md:text-xl p-1 border-2 border-[#d30a03]" type="password" name="" placeholder="Password" />
        </div>
        <button className=" text-white font-bold bg-[#d30a03] rounded-2xl self-end py-1 px-5 text-xl m-4" onClick={() => get({ users, passwords, router })}>Login</button>
      </div>
      <div className="  flex h-auto flex-col items-center bg-[#d30a03] md:p-14 rounded-b-xl  md:rounded-r-xl md:rounded-b-none">
        <label className=" text-white text-4xl font-bold m-10">Sign Up</label>
        <h4 className=" text-white md:mt-8 text-lg">Create your account here!</h4>
        <Link href={"/signup"}>
          <button className=" text-white font-bold border-2 border-white rounded-2xl py-1 px-5 text-xl m-4">Register</button>
        </Link>
      </div>
    </main></>
  )
}

export default withRouter(Login)

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.Monogodb_uri)
  }
  let users = await up.distinct("username")
  let passwords = await up.distinct("password")
  return {
    props: { users: JSON.parse(JSON.stringify(users)), passwords: JSON.parse(JSON.stringify(passwords)) }

  }
}