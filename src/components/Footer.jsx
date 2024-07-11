import Link from 'next/link'
import React from 'react';
import Image from 'next/image'
import { useContext } from 'react';
import AppContext from '../context/AppContext';

const Footer = () => {
    const { sharedValues } = useContext(AppContext);
    return (
        <footer className="p-4 grid grid-rows-auto md:grid-rows-1 grid-cols-1 md:grid-cols-3 bottom-0 bg-slate-950 text-white">
            <div className="md:border-r-2 md:border-b-0 border-b-2 p-4 border-white w-fill">
                <label htmlFor="" className="text-[#d30a03] text-2xl font-bold">Visit</label>
                <div className="md:flex grid grid-cols-2 gap-6 p-2">
                    <Link href={"mailto:arvind1.test@gmail.com"}>
                        <Image className="h-10 w-10" src={"/gmail.webp"} alt="logo" width={30} height={30} />
                    </Link>
                    <Link href={"https://github.com/Arvind-26"}>
                        <Image className="h-10 w-10" src={"/git.webp"} alt="logo" width={30} height={30} />
                    </Link>
                    <Link href={"https://www.linkedin.com/in/arvind-singh-26as"}>
                        <Image className="h-10 w-10" src={"/in.webp"} alt="logo" width={30} height={30} />
                    </Link>
                    <Link href={"https://x.com/Arvind_0026"}>
                        <Image className="h-10 w-10" src={"/x.png"} alt="logo" width={30} height={30} />
                    </Link>
                </div>
            </div>
            <div className="w-fill p-4 text-lg">
                <label htmlFor="" className="text-[#d30a03] text-2xl font-bold">Direct Links</label>
                <ul className="p-2">
                    <Link href={"/"}><li className='hover:text-[#d30a03]'>Home</li></Link>
                    {sharedValues.value1 ?
                        <><Link href={"/profile"}><li className='hover:text-[#d30a03]'>Profile</li></Link>
                            <Link href={"/addtocart"}><li className='hover:text-[#d30a03]'>Cart</li></Link></> :
                        <><Link href={"/login"}><li className='hover:text-[#d30a03]'>Login</li></Link>
                            <Link href={"/signup"}><li className='hover:text-[#d30a03]'>Signup</li></Link></>}
                </ul>
            </div>
            <div className="md:border-l-2 md:border-t-0 border-t-2 border-white w-fill p-4">
                <label id='about' className="text-[#d30a03] text-2xl font-bold">About</label><br />
                <label>Welcome to TechPulse, your premier destination for cutting-edge tech products. We pride ourselves on offering the latest innovations in technology, serving customers worldwide. With a commitment to quality and excellence, TechPulse ensures you stay ahead in the fast-paced tech world. Discover the future with us today!</label>
            </div>
        </footer>
    )
}

export default Footer
