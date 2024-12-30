import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()


export async function displayallposts() {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM uploaded_posts ',
        );
        if (rows.length > 0) {
            console.log('Posts in community:');
            return rows;
        } else {
            console.log('No posts found in community:');
            return [];
        }
    } catch (error) {
        console.error('Error getting posts', error);
    }
}


export async function createUser(email, username) {
    const query = 'INSERT INTO Users (email, username) VALUES (?, ?)';
    const values = [email, username];

    try {
        // Execute the query to insert the user data
        await pool.execute(query, values);
        console.log('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;  // Rethrow the error to be handled in the route
    }
}

export async function createPost(username, comname, post_text,title) {
    try {
        const [result] = await pool.execute(
            `INSERT INTO uploaded_posts (username, comname, post_text,title) 
            VALUES (?, ?, ?, ?)`,
            [username, comname, post_text,title]
        );
        if (result.length>0){
            console.log('Post created');
        }
        else {
            console.log('Post not created')
        }

    } catch (error) {
        console.error('Error creating post:', error);
    }
}

export async function deletePost(ID) {
    try {
        const [result] = await pool.execute(
            'DELETE FROM uploaded_posts WHERE ID = ?',
            [ID]
        );

        // Check affectedRows instead of length
        if (result.affectedRows > 0) {
            console.log('Post deleted successfully');
            return result;
        } else {
            console.log('No post found with ID:', ID);
            return null;
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error; // Rethrow the error so the API can handle it
    }
}
export async function updatePost(postId, newPostText, newTitle) {
    try {
        const [result] = await pool.execute(
            `UPDATE uploaded_posts 
            SET post_text = ?, title = ? 
            WHERE ID = ?`,
            [newPostText, newTitle, postId]
        );
        if (result.length > 0) {
            console.log('Post updated successfully');
        } else {
            console.log('No post found with ID:', postId);
        }
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

export async function changeUsername(oldUsername, newUsername) {
    try {
        const [result] = await pool.execute(
            `UPDATE uploaded_posts 
            SET username = ? 
            WHERE username = ?`,
            [newUsername, oldUsername]
        );
        if (result.length > 0) {
            console.log('Username updated successfully');
        } else {
            console.log('No posts found for username:', oldUsername);
        }
    } catch (error) {
        console.error('Error changing username:', error);
    }
}

export async function getPostsByUsername(username) {
    try {
        const [rows] = await pool.execute(
            `SELECT * FROM uploaded_posts WHERE username = ?`,
            [username]
        );
        if (rows.length > 0) {
            console.log('Posts by username:', username);
            return rows;
        } else {
            console.log('No posts found for username:', username);
            return [];
        }
    } catch (error) {
        console.error('Error getting posts by username:', error);
    }
}

// Function to get posts by community name
export async function getPostsByComname(comname) {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM uploaded_posts WHERE comname=?',[comname]
        );
        if (rows.length > 0) {
            console.log('Posts in community:',comname);
            return rows;
        } else {
            console.log('No posts found in community:', comname);
            return [];
        }
    } catch (error) {
        console.error('Error getting posts by community name:', error);
    }
}

export async function getPostsByuser(username) {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM uploaded_posts WHERE username=?',[username]
        );
        if (rows.length > 0) {
            console.log('User Posts:',username);
            return rows;
        } else {
            console.log('No posts found for user:', username);
            return [];
        }
    } catch (error) {
        console.error('Error getting posts by community name:', error);
    }
}

export async function getAllCommunities() {
    try {
        const [rows] = await pool.execute(
            'SELECT DISTINCT comname FROM uploaded_posts'
        );
        return rows; // This returns the distinct community names
    } catch (error) {
        console.error('Error fetching communities:', error);
        throw error; // Handle the error appropriately
    }
}



