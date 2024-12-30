import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Post } from "./PostTypes";
import {
    Box,
    Card,
    CardContent,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AccountPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const {
        loginWithRedirect,
        user,
        isAuthenticated,
        isLoading,
    } = useAuth0();

    const fetchuserposts = async (username: string) => {
        try {
            const response = await fetch(`http://localhost:5800/userposts/${username}`);
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

    useEffect(() => {
        if (isAuthenticated && user?.nickname) {
            fetchuserposts(user.nickname);
        } else {
            setPosts([]);
            setLoading(false);
        }
    }, [isAuthenticated, user]);

    const deletePost = async (ID: number) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5800/postdelete/${ID}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            setPosts(prevPosts => prevPosts.filter(post => post.ID !== ID));
        } catch (error) {
            console.error('Error deleting post:', error);
            setError('Failed to delete post. Please try again.');
        }
    };

    // Handle loading and error states
    if (isLoading) return <p>Loading...</p>;
    if (!isAuthenticated) {
        return <button onClick={() => loginWithRedirect()}>Log in</button>;
    }
    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {posts.map((post) => (
                <Grid item xs={12} key={post.ID}>
                    <Card sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                            <Typography variant="body2">
                                {post.comname}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h6">
                                    {post.title}
                                </Typography>
                                <IconButton
                                    onClick={() => deletePost(post.ID)}
                                    aria-label="delete post"
                                >
                                    <DeleteIcon sx={{ color: 'red' }} />
                                </IconButton>
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Posted by {post.username}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Time Posted: {new Date(post.time_posted).toLocaleString()}
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {post.post_text}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    {post.upvotes} Upvotes
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {/*post.comments ?? 0*/} Comments
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default AccountPage;