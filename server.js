const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get('/',(req,res)=>{
    res.send("Hello Word");
})
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("port is running on ", PORT);
});
