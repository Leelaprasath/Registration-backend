const Router=require("express").Router();
const Controller=require('./controller/controller')
Router.post("/newuser",Controller.adduser)
Router.post("/login",Controller.login)
Router.post("/showuser",Controller.showuser)
Router.put("/updateuser",Controller.updateuser)


module.exports = Router
