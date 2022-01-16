const ValiadtorController = require("./validator.controller");
const fs=require('fs');
const { is } = require("express/lib/request");
const readFromJSON = () =>{
    let data
    try{
        data = JSON.parse(fs.readFileSync('./models/customers.json'))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        data = []
    }
    return data
}
const writeDataToJSON = (data) =>{
    try{
        fs.writeFileSync("./models/customers.json", JSON.stringify(data))
    }
    catch(e){
        console.log(e.message);
    }
}
class User {
    static showAll = (req, res) => {
        let isEmpty=false;
       let data=readFromJSON();
        if(data.length==0)isEmpty=true
       res.render('all',{data,isEmpty})       
    }
    //post method
    static addCustomer = (req, res) => {
        const user = { name: "", address: "", phone: "", accountNumber: "" ,initialBalance:''}
        res.render("add", { pageTitle: "add new customer", user, errors: {} })
    }
    static addCustomerLogic = (req, res) => {
        let user = req.body
        let errors = {}
        //"" 0 +> false     12+=> true
        if (!ValiadtorController.isAlpha(user.name))
            errors.name = "name is should be characters only in en"
        if (!ValiadtorController.isMobilePhone(user.phone))
            errors.phone = "enter a valid phone" 
            if (!ValiadtorController.isEmptyString(user.accountNumber))
            errors.accountNumber = "accountNumber is required" 
            if (!ValiadtorController.isEmptyString(user.initialBalance))
            errors.initialBalance = "initialBalance is required" 
        if (Object.keys(errors).length > 0)
            return res.render('add', {
                pageTitle: "add new customer",
                errors,
                user
            })
            let data=readFromJSON();
            data.length==0? user.id=5000:user.id=data[data.length-1].id +1;
            user.transactions=[];
            data.push(user);
            writeDataToJSON(data);
            res.redirect('/');
    }
    static searchUserByID = (id, data) => {
        let userIndex = data.findIndex(el => el.id == id)
        return userIndex
    }
    static singleUser = (req, res) => {
        let isNotFound,isEmptyTrans = false
        const id = req.params.id
        const data = readFromJSON();
     let  userIndex= this.searchUserByID(id,data);
     if(userIndex==-1){isNotFound=true;isEmptyTrans=true;}
     if(data[userIndex].transactions.length==0)isEmptyTrans=true;
     //console.log(isEmptyTrans);
     res.render("single", {
        pageTitle: "User Details",
        user: data[userIndex],
        isNotFound,
        isEmptyTrans
    })
   
      
    }
    static addBalance=(req,res)=>{
        const transaction = { type: "", amount: ""}
         res.render("addbalance", { pageTitle: "add new transaction", transaction, errors: {} })
    }

    static addBalanceLogic=(req,res)=>{
        let errors={};
        if (!ValiadtorController.isNumber(req.body.amount))
        errors.amount = "amount is should be numbers only "

        if (Object.keys(errors).length > 0)
            return res.render('addbalance', {
                pageTitle: "add new customer transaction",
                errors,
                transaction:req.body,
                
            })
            let data=readFromJSON();
            let  userIndex= this.searchUserByID(req.params.id,data);
            if(userIndex==-1)
            {
               // errors.message = "User Not Found"
                res.redirect('/err404')
            }
            data[userIndex].transactions.push({id:new Date(),type:"add",val:req.body.amount}) ;
            writeDataToJSON(data);
            res.redirect('/');


    }
    static withdraw=(req,res)=>{
        const transaction = { type: "", amount: ""}
        res.render("withdraw", { pageTitle: "add new transaction", transaction, errors: {} })
    }
    static withdrawLogic=(req,res)=>{
        let errors={};
        if (!ValiadtorController.isNumber(req.body.amount))
        errors.amount = "amount is should be numbers only "

        if (Object.keys(errors).length > 0)
            return res.render('withdraw', {
                pageTitle: "add new customer transaction",
                errors,
                transaction:req.body,
                
            })
            let data=readFromJSON();
            let  userIndex= this.searchUserByID(req.params.id,data);        
            data[userIndex].transactions.push({id:new Date(),type:"withdraw",val:req.body.amount}) ;
            writeDataToJSON(data);
            res.redirect('/');

    }
/////////////////////////////////////////////////////////////////////////////////
    static editUser = (req, res) => {
        let isNotFound = false
        const id = req.params.id ;
        let data=readFromJSON();
        let  userIndex= this.searchUserByID(req.params.id,data); 
        if(userIndex==-1) res.redirect('/err404')
          res.render("edit", {
            pageTitle: "Edit User Details",
            user: data[userIndex],
            isNotFound
        })
    
    }

static editUserLogic=(req,res)=>{
    let errors = {};
    let user=req.body;
  if(!ValiadtorController.isAlpha(user.name))
    errors.name = "name is should be characters only in en"
if (!ValiadtorController.isMobilePhone(user.phone))
    errors.phone = "enter a valid phone" 
    if (!ValiadtorController.isEmptyString(user.accountNumber))
    errors.accountNumber = "accountNumber is required" 
    if (!ValiadtorController.isEmptyString(user.initialBalance))
    errors.initialBalance = "initialBalance is required" 
        if(Object.keys(errors).length > 0){   
             res.render("edit", {
            pageTitle: "Edit User Details",
            user: req.body,
            errors           
        })
        }else{
    /////edit data

            let data=readFromJSON();
            let  userIndex= this.searchUserByID(req.params.id,data);
            if(userIndex==-1)
            {
               // errors.message = "User Not Found"
                res.redirect('/err404')
            }
            data[userIndex].name=user.name;
            data[userIndex].address=user.address;
            data[userIndex].phone=user.phone;
            data[userIndex].accountNumber=user.accountNumber;
            data[userIndex].initialBalance=user.initialBalance;
            writeDataToJSON(data);
            res.redirect('/');
    
}
}


}
module.exports = User