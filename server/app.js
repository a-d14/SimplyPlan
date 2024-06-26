const express = require('express'); 
const cors = require('cors');

const Project = require('./models/projectModel');

const app = express(); 

app.use(express.json());
app.use(cors());

app.get("/api/v1", (req, res) => {
    res.json({message : "WELCOME TO SimplyPlan"});
});

const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const adminRouter = require('./routes/adminRoutes');
const ticketRouter = require('./routes/ticketRoutes');

// ADD AND GET USER DETAILS
app.use('/api/v1/admin', adminRouter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/tickets', ticketRouter);
// app.post('/api/users', async (req, res) => {

// });

// // GET AND POST PROJECTS
// app.get("/api/projects", async (req, res) => {
//     const data = await Project.find({});
//     res.status(200).json({
//         status: 'success',
//         data: data
//     });
// });

// app.get("/api/projects/:id", async (req, res) => {
//     const data = await Project.findById(req.params.id);
//     res.status(200).json({
//         status: 'success',
//         data: data
//     });
// });

// app.post("/api/projects", async (req, res) => {
//     const title = req.body.title;
//     const description = req.body.description;

//     try {
//         await Project.create({title : title, description : description});
//         res.json({
//             status: 'successfully added project'
//         });
//     } catch(error) {
//         res.status(500).json({
//             status: 'There was an error!',
//             message: error
//         });
//     }
// });

module.exports = app;
