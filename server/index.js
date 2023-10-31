import express from 'express'
import connectDB from './connection/db.js';
import Task from './model/notes.js';
import cors from 'cors'
connectDB();
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/get-task', async (req, res) => {
    try {
        const Tasks = await Task.find().sort({createdAt:-1});
        res.send(Tasks)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({msg:"Something went wrong"})
    }
});

app.post('/save-task',async (req,res)=>{
    try{
        const task= new Task(req.body);
        await task.save()
        res.send({"msg":"Task Added"})
    }
    catch(error){
        console.error(error)
        res.status(500).send({msg:"Something went wrong"})
    }
   

})


app.delete('/remove-task', async (req, res) => {
    try {
       const result= await Task.findByIdAndDelete({_id:req.query.id})
       res.send({"msg":"Task Removed"})
       
    }
    catch (error) {
        console.log(error)
        res.status(500).send({msg:"Something went wrong"})

    }
})



app.listen(4000, (err) => {
    if (err)
        console.log("something went wrong", err)
    else
        console.log("server is listening at 4000")
})
