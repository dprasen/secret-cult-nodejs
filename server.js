/* Secret Cult Problem */
/* SOLUTION USING ZKP */

/*nodejs server setup */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
app.use(cors());
app.use(bodyParser.json());

/* CULT MEMBERS have  pattern {salt} + left hand signal {password} */

const cultMembers = [
    { name:"tron",password:"$2b$10$t8X.P.pPPVjsS5uUWG/GmutVzpD8kFOiP4cP3pW8Y6iSCxp6AB66O" },//pass:tron;
    { name:"zelda", password:"$2b$10$LMqiNBrgByQAMJM6T.W5eeKGyyJd3cS8qQHZLspRBwPyxAO5w0g7u" },//pass:zelda;
    { name:"waldo",password:"$2b$10$eu.3WbtBZuRTO.XAq/IT/uJ2dPzvJY2J.BmKv/la37PoMusOI3JUK"  } //pass:waldo;
]

app.post('/cult/signal', async (req,res)=>{
    const sender = cultMembers.find(name=> name.name = req.body.name);
    if(sender===null){
        console.log("Member not found");
        res.status(400).send('INVALID MESSAGE');
    }
    try{
        if(await bcrypt.compare(req.body.password,sender.password)){
            //console.log('MEMBER VERIFIED'); //DO SACRIFICE
            res.send();
           
        }else{
            //console.log('MEMBER VERIFIED');
            res.send();
        }
        
    }
    catch(e){
        res.status(500).send();
    }
});


/*generate hashed password : test */
app.post('/cult/genpass', async (req,res)=>{
    try{  
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        console.log(salt);
        console.log(hashedPassword);            
        res.status(200).send(hashedPassword);        

    }
    catch(e){
        res.status(500).send();
    } 
});

app.listen(3000);