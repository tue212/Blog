const express = require ('express');
const app = express();
const cors = require ('cors');
const User = require ('./models/User');
const Post = require ('./models/Post');
const { default: mongoose } = require('mongoose');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const cookieParser = require ('cookie-parser');
const multer = require ('multer');
const fs = require ('fs');

const salt = bcrypt.genSaltSync(10);
const secretKey = 'agkjsahdjfke23n23@#3#@3@#3hajluqtpouo54';
const uploadMiddleware = multer({dest: 'uploads/'});

app.use(cors({credentials:true, origin:'https://blog-client-92qe.onrender.com'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect('mongodb+srv://tuemgd:tuepxt01MD@cluster0.aoi7rct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc); 
    } catch(e) {
        res.status(400).json(e);
    }
    
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;   
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({username, id: userDoc._id}, secretKey, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({id: userDoc._id, username});
        })
    } else {
        res.status(400).json('wrong credentials');
    }

});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secretKey, {}, (err, info) => {
        if (err) throw err
        res.json(info)
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
        if (err) throw err
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc)
    })
})

app.get('/post', async (req, res) => {
    const postDoc = await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    res.json(postDoc)
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params
    const postDoc = await Post.findById(id).populate('author', ['username'])
    res.json(postDoc)
})

app.put('/post', uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if(req.file) {
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
        if (err) throw err
        const {id, title, summary, content} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if(!isAuthor) {
            return res.status(400).json('You are not author');
        }
        await Post.findByIdAndUpdate(id, {
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        })
        res.json(postDoc);
    });
})

app.delete('/post/:id', async (req, res) => {
    const {id} = req.params
    await Post.findByIdAndDelete(id)
    res.json({msg: 'This post is deleted'})
})

app.listen(4000);