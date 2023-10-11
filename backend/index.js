const express = require('express');
const connectToMongo = require('./db');
connectToMongo();
var cors = require('cors')




const app = express();
const PORT = 5000;
app.use(cors())




app.use(express.json()) //  takay program json format main send kiya data parh sakay 

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.get("/", (req, res) => {
res.status(200).json("Welcome to learning MongoDB Working");
});


app.listen(PORT, () => console.log(`Running on port ${PORT}`));