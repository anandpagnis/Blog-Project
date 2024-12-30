import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios'; // Import Axios
import { useAuth0 } from '@auth0/auth0-react';
import SimpleListMenuProps from "./Components/selectedMenu.tsx";


interface PostData {
    username: string;
    comname: string;
    post_text: string;
    title: string;
}

const CreatePost: React.FC = () => {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);

    const handleOptionSelect = (selectedOption: string) => {
        setSelectedCommunity(selectedOption);  // Simply set the selected community
    };

    const [postData, setPostData] = useState<PostData>({
        username: '',
        comname: '',
        post_text: '',
        title: '',
    });

    const {
        loginWithRedirect,
        user,
        isAuthenticated,
        isLoading,
    } = useAuth0();

    if (isLoading) return <p>Loading...</p>;

    if (!isAuthenticated) {
        return (
            <>
            <h1>YOU NEED TO LOGIN TO POST</h1>
            <button onClick={() => loginWithRedirect()}>Log in</button>
            </>
        );
    }

    const username = user?.nickname;


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);


        console.log('Posting data:', postData);

        try {
            const response = await axios.post(`http://localhost:5800/postcreate?username=${username}&comname=${selectedCommunity}`, postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (response.status === 201) {
                setSuccess('Post created successfully!');
                setPostData({
                    username: '',
                    comname: '',
                    post_text: '',
                    title: '',
                });
            } else {
                setError('Failed to create post');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        }
    };




    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
            // Otherwise, handle the change for other fields
            setPostData({ ...postData, [name]: value });
        };



    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Create a New Post
            </Typography>
            <form onSubmit={handleSubmit}>
                <SimpleListMenuProps onOptionSelect={handleOptionSelect} />
                <TextField
                    label="Title"
                    name="title"
                    value={postData.title}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Post Text"
                    name="post_text"
                    value={postData.post_text}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create Post
                </Button>
            </form>

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
            {success && (
                <Typography color="success" sx={{ mt: 2 }}>
                    {success}
                </Typography>
            )}
        </Box>
    );
};

export default CreatePost;
