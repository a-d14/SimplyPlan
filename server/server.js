const mongoose = require('mongoose');

const uri = "mongodb+srv://dasguptaaakash:ERhncSCSHHvGw4tF@cluster0.5xd1pxw.mongodb.net/projectmngr?retryWrites=true&w=majority&appName=Cluster0";

const app = require('./app');

async function main() {
    try{
        await mongoose.connect(uri).then(_ => {
            console.log("Connection Successful!");
        });
    } catch(err) {
        console.log(err);
    }
}

const PORT = 3001;

main();

app.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}`);
});