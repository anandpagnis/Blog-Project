import * as React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography, Box,
    IconButton,
} from '@mui/material';
import {useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {Post} from "./PostTypes.ts";

export default function Posts() {


    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getallposts = async () => {
            try {
                const response = await fetch('http://localhost:5800/allposts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (err: unknown) {
                console.error('Error fetching posts:', err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        getallposts();
    }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    const deletePost = async (ID: number) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5800/postdelete/${ID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            // Assuming you have a state update function like setPosts
            setPosts(prevPosts => prevPosts.filter(post => post.ID !== ID));

        } catch (error) {
            console.error('Error deleting post:', error);
            // You might want to show an error message to the user
        }
    };


    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {posts.map((post) => (
                <Grid item xs={12} key={post.ID}>
                    <Card sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                            {/* Header with Title and Delete Icon */}
                            <Typography variant="body2">
                                {post.comname}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h6">
                                    {post.title}
                                </Typography>
                                <IconButton onClick={() => deletePost(post.ID)}>
                                    <DeleteIcon sx={{ color: 'red' }} />
                                </IconButton>
                            </Box>

                            {/* Post Details */}
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Posted by {post.username}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Time Posted: {new Date(post.time_posted).toLocaleString()}
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {post.post_text}
                            </Typography>

                            {/* Footer with Upvotes and Comments */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    {post.upvotes} Upvotes
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {/* {post.comments} */} Comments
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>

    );
    };
