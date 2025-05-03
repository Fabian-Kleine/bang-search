"use client";

import { useState } from "react";

interface SearchFormProps {
    className?: string;
    children: (value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void) => React.ReactNode;
}

export default function SearchForm({ className, children }: SearchFormProps) {
    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const query = value;

        console.log("Search query:", query);
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            {children(value, handleChange)}
        </form>
    )
}