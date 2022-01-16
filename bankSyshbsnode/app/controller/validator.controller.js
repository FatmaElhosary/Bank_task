const validator = require("validator")
class ValiadtorController{
    static isEmptyString = (val)=>{
         return val.trim().length //0=false >0 =true
        
     }
    static isAlpha = (val)=>{
       // return val.length //0=false >0 =true
       return validator.isAlpha(val,'en-US');
    }
    static isValidEmail = (val) => {
        return validator.isEmail(val)  //true false
    }

    static isNumber=(val)=>{
        return validator.isDecimal(val);
    }
    static isMobilePhone=(val)=>{
        return validator.isMobilePhone(val,'ar-EG')
    }
}
module.exports = ValiadtorController