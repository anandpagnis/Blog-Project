import express from 'express';
import mysql from 'mysql2/promise';  // Assuming you're using MySQL for the database
import dotenv from 'dotenv';
import cors from 'cors';
import {
    createPost,
    createUser,
    deletePost,
    updatePost,
    changeUsername,
    getPostsByUsername,
    getPostsByComname,
    getPostsByuser,
    displayallposts,
    getAllCommunities
} from "./src/backend/database.js";

dotenv.config();  // Load environment variables from .env file

const app = express();
app.use(express.json())
app.use(cors()); // This will allow all origins by default

// Define the port
const PORT = process.env.PORT || 5800;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.get("/allposts",async(req,res)=>{
    const all_posts = await displayallposts()
    res.send(all_posts)
})

app.get("/allcomms",async(req,res)=>{
    const all_comms = await getAllCommunities()
    res.send(all_comms)
})

app.get("/communityposts/:comname", async (req,res)=>{
    const comname = req.params.comname;
    try {
        // Your database query here
        const posts = await getPostsByComname(comname);
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
})

app.get("/userposts/:username", async (req,res)=>{
    const username = req.params.username;
    try {
        const uploaded_posts = await getPostsByuser(username)
        res.json(uploaded_posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
})

app.post("/hello", async (req,res)=>{
    const {email,username} = req.body
    const newuser = await createUser(email,username)
    res.status(201).send(newuser)
})

app.post("/postcreate", async (req,res)=>{
    const { username, comname } = req.query;
    const {post_text,title} = req.body
    const newpost = await createPost(username, comname, post_text,title)
    res.status(201).send(newpost)
})

app.delete('/postdelete/:id', async (req, res) => {
    const ID = req.params.id;
    try {
        const result = await deletePost(ID);

        if (!result) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// Middleware to parse JSON bodies
app.use(express.json());


// Create a connection pool to your MySQL database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});
