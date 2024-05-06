import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


const app = express();


app.use(express.json());

//user
app.post('/user', async (req,res) =>{
    const createdUser = await prisma.user.create({
        data: req.body
    })
    res.send(createdUser);
})

app.get('/user', async (req, res) => {
    const users = await prisma.user.findMany();
    res.send(users);
})

app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id) 
        },
    })
    res.send(user);
})

app.get('/usersnames', async (req, res) => {
    const users = await prisma.user.findMany({
        
        select: {
            id: true,
            name: true
        }
    })

    res.send(users);

})

app.get('/getUsersPosts', async (req, res) => {
    const usersPosts = await prisma.user.findMany({
        include: {
            Post: true
        }
    })
    res.send(usersPosts)
})

app.post('/createUsersWithPosts', async (req, res) => {
    const  {name ,email, Post } = req.body 
    //const  {user: {name: string , email: string} , post: {title: string ,content: string}}
    const createdUsersWithPosts = await prisma.user.create({
        data : {
            name: name ,
            email , 
            Post: {
               create: {
                title: Post.title ,
                content: Post.content
               } 
            }
        } ,
        include: {
            Post : true
        }
    })
    res.send(createdUsersWithPosts);
})

//post 

app.post('/post', async (req,res) => {
    const createdPost = await prisma.post.create({
        data:req.body
    })
    res.send(createdPost);
})

app.get('/post', async (req, res) => {
    const posts = await prisma.post.findMany();
    res.send(posts);
})

app.listen(5000);