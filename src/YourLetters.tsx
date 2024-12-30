import * as React from 'react';
import {
    Grid,
    Typography,
    Container,
    Card,
    CardContent,
    Box,
} from '@mui/material';
import { useEffect, useState } from "react";
import { Post } from "./PostTypes.ts";
import SimpleListMenu from "./Components/selectedMenu.tsx";
import Posts from "./PostDisp.tsx";

const YourLetters: React.FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);

    const fetchcommPosts = async (comname: string) => {
        try {
            const response = await fetch(`http://localhost:5800/communityposts/${comname}`);
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
        if (selectedCommunity) {
            fetchcommPosts(selectedCommunity); // Fetch posts only when community is selected
        } else {
            setPosts([]); // Reset posts when no community is selected
            setLoading(false); // Stop loading when no community is selected
        }
    }, [selectedCommunity]); // This effect will run only when selectedCommunity changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleOptionSelect = (selectedOption: string) => {
        setSelectedCommunity(selectedOption);  // Simply set the selected community
    };

    const renderPosts = () => {
        if (!selectedCommunity) {
            return <Posts />; // Shows a default set of posts if no community is selected
        }

        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    {posts.map((post) => (
                        <Grid item xs={12} key={post.ID}>
                            <Card sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="h6">{post.title}</Typography>
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
                                            {/* {post.comments} */} Comments
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    };

    return (
        <>
            <SimpleListMenu onOptionSelect={handleOptionSelect} />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {renderPosts()}
            </Container>
        </>
    );
};

export default YourLetters;
