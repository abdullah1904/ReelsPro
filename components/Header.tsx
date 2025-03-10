"use client";
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'



const Header = () => {
    const { data: session } = useSession();
    const handleSignOut = async ()=>{
        try{
            await signOut();
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <button onClick={handleSignOut}>Signout</button>
            <Link href='/Login'>Login</Link>
        </div>
    )
}

export default Header