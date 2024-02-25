"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");
        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });
        if (res.status === 200) {
            router.push("/");
        } else if (res.status === 401) {
            alert("Invalid username or password. Please try again.");
        }
        else {
            alert("Login failed. Please try again.");
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
            <button type="submit">Login</button>
        </form>
    );
}