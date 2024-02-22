'use client';
import { useSearchParams } from "next/navigation";
import { NextRequest,NextResponse } from "next/server";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginPage(request:NextRequest) {
    const { push } = useRouter();
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

        if (password !== ensurePassword) {
            alert("Password and Ensure Password do not match");
            // const redirectUrl = `/login/?display_name=${display_name}&discord_id=${discord_id}&email=${email}`;
		    // return NextResponse.redirect(new URL(redirectUrl, request.url));
            return;
        }else{
            const body = {
                email: email,
                password: password,
                display_name:display_name,
                discord_id:discord_id,
                coin:0,
            }
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            // console.log(response)
            let redirectUrl:string;
            if (response.status === 200) {
                console.log("am here in 200")
                redirectUrl = '/';
            }
            else{
                redirectUrl = `/login/?display_name=${display_name}&discord_id=${discord_id}&email=${email}`;
            }
            console.log(response.status)
            console.log("Redirect URL:", redirectUrl);
            push(redirectUrl);
        }
        
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