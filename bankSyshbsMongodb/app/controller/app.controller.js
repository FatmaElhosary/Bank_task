const ValiadtorController = require("./validator.controller");
const dbConnection = require('../../models/dbcon')
const  ObjectId = require("mongodb").ObjectId

class User {
    //show all
    static showAll = (req, res) => {
    
       dbConnection((err, client, db) => {
            db.collection('customers').find().toArray((error, result) => {
                if (error) return redirect('/err')
                const data = result
                const isEmpty = data.length == 0
                client.close()
                res.render("all", { pageTitle: "All Users", data, isEmpty })
            })
        })
       // if(data.length==0)isEmpty=true
      // res.render('all',{data,isEmpty})       
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
            dbConnection((err, client, db) => {
                user.transactions=[];
                db.collection('customers').insertOne(user,(error, result)=>{
                if(err) return res.redirect("/err")
                client.close();
                res.redirect("/")
            })
        })
         
    }
 
    static singleUser = (req, res) => {
              const id = req.params._id   
        dbConnection((err, client, db) => {
            db.collection('customers').findOne({_id:new ObjectId(id)},(error, result)=>{
                //no transactions
              let  isEmptyTrans=result.transactions.length==0?true:false;
            if(err){              
                client.close()
          return res.redirect("/err")
        
            }
          
           // console.log(result);
            res.render("single", {
                pageTitle: "Customer Details",
                user: result,
                isEmptyTrans
            })
        })
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
            dbConnection((err,client,db)=>{
                db.collection('customers').update({_id:new ObjectId(req.params._id)},{
                    $push: { transactions: {id:new Date(), type:'add',val:req.body.amount } }
                }
               ).then((response)=>{
                   console.log(response);
                   res.redirect('/');
               }).catch((err)=>{
                   res.redirect('/err')
               })
            });
   

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
            return res.render('addbalance', {
                pageTitle: "add new customer transaction",
                errors,
                transaction:req.body,
                
            })
            dbConnection((err,client,db)=>{
                db.collection('customers').update({_id:new ObjectId(req.params._id)},{
                    $push: { transactions: {id:new Date(), type:'withdraw',val:req.body.amount } }
                }
               ).then((response)=>{
                   console.log(response);
                   res.redirect('/');
               }).catch((err)=>{
                   res.redirect('/err')
               })
            });

    }
/////////////////////////////////////////////////////////////////////////////////
    static editUser = (req, res) => {    
        const id = req.params._id ;   
        dbConnection((err, client, db) => {
            //////////////////////////////////////////
            db.collection('customers').findOne({_id:new ObjectId(id)},(error, result)=>{
            console.log(result);
            if(err){
            client.close(); 
            return res.redirect("/err")     
            }
            console.log(result);
            res.render("edit", {
            pageTitle: "Edit User Details",
            user: result,
          
        })
        })
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
        }
    /////edit data///////////////////////////////////////////////////////////
    dbConnection((err, client, db) => {
        db.collection('customers').updateOne({_id:new ObjectId(req.params._id)},{
             $set:{
                name:req.body.name,
                address:req.body.address,
                email:req.body.email,
                phone:req.body.phone,
                accountNumber:req.body.accountNumber,
                initialBalance:req.body.initialBalance
            }
        })
        .then(response=>{
            console.log(response);
            res.redirect('/')
           // client.close();
        })
        .catch(err=>{console.log(err); res.redirect('/err')})
   
    
    })
          
    
    

}


}
module.exports = User