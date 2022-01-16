const router = require("express").Router()
const User = require("../controller/app.controller")

router.get("/", User.showAll)

router.get("/addCustomer", User.addCustomer)
router.post("/addCustomer", User.addCustomerLogic);
router.get('/addBalance/:id',User.addBalance);
router.post('/addBalance/:id',User.addBalanceLogic);
///
router.get('/withdraw/:id',User.withdraw);
router.post('/withdraw/:id',User.withdrawLogic);
///////show customer////////////
router.get("/single/:id", User.singleUser)
//////////////////////////////////////


router.get("/edit/:id", User.editUser)
router.post('/edit/:id',User.editUserLogic)






module.exports = router
