"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from "axios";



const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const res = await axios.post("/api/auth/register", { email, password });
            if(res.status === 201){
                router.push("/login");
            }
            setError("Failed to register");
        }
        catch (error) {
            console.log(error);
            setError("Failed to register");
        }
    }
    return (
        <div>RegisterPage</div>
    )
}

export default Register