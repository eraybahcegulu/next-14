'use client';
import { Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Title {
    name: string;
}

export default function Product({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState<Title | null>(null);

    const fetchTitle = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/titles/get/${params.id}`);
            setTitle(res.data.title);
        } catch (error) {
            console.error("Error loading titles: ", error);
        }
    };

    useEffect(() => {
        fetchTitle();
    }, []);

    return (
        <>
            <h1> Title ID: {params.id}</h1>
            {title ? (
                <h1> Title Name: {title.name}</h1>
            ) : (
                <h1> Title Name: <Spin /></h1>
            )}
        </>
    );
}
