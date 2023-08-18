const model=require('../models/model')

const adduser=async(req,res)=>{

    const user = new model.SignupCollection(req.body);

    const output = [];

    try {
        await user.save();
        output.push({"message": "Added", "error": ""});
        res.json(output);
    }catch(err) {
        let errorList = [];
        if(err.errors) {
            for(let temp in err.errors) {
                errorList.push(err.errors[temp].message);
            }
        }
        output.push({"message": "", "error": errorList});
        res.json(output);
    }
}

const login=(req,res)=>{
    try {
       model.SignupCollection.find({
  "email": { $regex: new RegExp(req.body.email, "i") },
  "password": req.body.password
})
            .then((result) => {
                 (result.length>0)?res.send('true'):res.send("false")
            });
    } catch(err) {
        res.json(err.message);
    }
}

const updateuser = (req,res)=>{
    try {
        model.SignupCollection.updateOne({name: req.body.name}, {$set: req.body})
            .then((results) => {
                if(results.modifiedCount > 0) {
                    res.json("User Updated!");
                } else {
                    res.json("Unable to Update User! Please try again!"); 
                }
            });
    } catch(err) {
        res.json(err.message);
    }
}

const showuser = async (req, res) => {
    try {
        let results = await model.SignupCollection.find({email: req.body.email});
        (results.length > 0) ? res.json(results) : res.json("No User Found!");
    } catch(err) {
        res.json(err.message);
    }
}

module.exports = {adduser,login,showuser,updateuser};
