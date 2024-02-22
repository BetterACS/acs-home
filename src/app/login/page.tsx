'use client';
import { useSearchParams } from "next/navigation";
import { useState } from "react";


export default function LoginPage() {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const discord_id = searchParams.get('discord_id')
    const display_name = searchParams.get('display_name')
    
    const [password, setPassword] = useState("");
    const [ensurePassword, setEnsurePassword] = useState("");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleEnsurePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnsurePassword(e.target.value);
    };
    
  

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("Ensure Password: ", ensurePassword);
        if (password !== ensurePassword) {
            alert("Password and Ensure Password do not match");
        }
        
       
        const body = {
            email: email,
            password: password,
            display_name:display_name,
            discord_id:discord_id,
            coin:0,
        }
        const response = await fetch('/api/login', {
		    method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

    };

    return (
        <div>
            <h1>login Test</h1>
            <form onSubmit={handleFormSubmit}>
                <p>{email}</p><br />
                <label>Password:</label><br />
                <input type="password" value={password} onChange={handlePasswordChange} /><br />

                <label>Ensure Password:</label><br />
                <input type="password" value={ensurePassword} onChange={handleEnsurePasswordChange} /><br />

                <button type="submit">Submit</button><br />
            </form>
        </div>
    );
}