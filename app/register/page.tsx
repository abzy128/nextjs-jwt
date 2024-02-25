"use client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");
        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });
        if (res.status === 201) {
            router.push("/login");
        } else if (res.status === 409) {
            alert("User already exists. Please try again.");
        }
        else {
            alert("Registration failed. Please try again.");
        }
        router.refresh();

    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" />
            </label>
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <label>
                Retype password:
                <input type="password" name="password" />
            </label>
            <button type="submit">Register</button>
        </form>
    );
}