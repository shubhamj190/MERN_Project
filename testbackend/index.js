const express = require('express')
const app = express()

const port =8000

app.get('/',(req, res)=>{
    return res.send("Hello world")
})

isLoggedin=(req, res, next)=>{
    console.log("user is logged in")
    next()
}
isAdmin=(req, res, next)=>{
    console.log("user have admin privilages")
    next()
}
admin=(req, res, next)=>{
    res.send("this is a admin dashboard")
    next()
}

app.get("/admin",isLoggedin,isAdmin,admin)

app.get('/login',(req, res)=>{
    return res.send("we are in login route")
})
app.get('/signout',(req, res)=>{
    return res.send("we are in signout route")
})
app.get('/shubham',(req, res)=>{
    return res.send("we are in shubham route")
})

app.listen(port,()=>{
    console.log(`the the server is running on ${port}`)
})