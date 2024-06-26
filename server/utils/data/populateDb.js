const mongoose = require('mongoose');
const users = require('./users');
const {User} = require('../../models/userModel');
const {Project} = require('../../models/projectModel');
const projects = require('./projects');

const uri = "mongodb+srv://dasguptaaakash:ERhncSCSHHvGw4tF@cluster0.5xd1pxw.mongodb.net/projectmngr?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
    try{
        await mongoose.connect(uri).then(con => {
            console.log("Connection Successful!");
        });
    } catch(err) {
        console.log(err);
    }
}

main();

const insertData = async () => {
    try {
        await Project.insertMany(projects);
    } catch(err) {
        console.log(err);
    }
    process.exit();
}

insertData();
