const router = require("express").Router()
const User = require("../controller/app.controller")

router.get("/", User.showAll)

router.get("/addCustomer", User.addCustomer)
router.post("/addCustomer", User.addCustomerLogic);
/////////////////////
router.get('/addBalance/:_id',User.addBalance);
router.post('/addBalance/:_id',User.addBalanceLogic);
////////////////////////////////////
router.get('/withdraw/:_id',User.withdraw);
router.post('/withdraw/:_id',User.withdrawLogic);
///////show customer////////////
router.get("/single/:_id", User.singleUser)
//////////////////////////////////////
router.get("/edit/:_id", User.editUser)
router.post('/edit/:_id',User.editUserLogic)

//////////////////////////////////////////////////////////
module.exports = router
