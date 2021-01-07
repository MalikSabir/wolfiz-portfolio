var mysql = require('mysql');
var bcrypt = require("bcrypt");
var Crypter = require("cryptr");
var connection = require('./connection');
cryptr = new Crypter('its encription key');
const jwt = require("jsonwebtoken");
var sleep = require("system-sleep");

module.exports.signup = function (req,res) {
  
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      connection.query("insert into accounts (firstName,lastName,email,password) VALUES ('"+req.body.firstName+"','"+req.body.lastName+"' ,'"+req.body.email+"','"+hash+"') ") ,function(error,results){
        if (error){
        res.json({
            status:false,
            message:'Your account can not be create due to some invalid data'
          })
        }
        else{
          res.json({
            status:true,
            message: 'Your account has been created succussfully',
          });

        }
      }
    });
}

//signing in query
module.exports.signin = function (req,res) {
try{
  console.log("email and password = "+req.body.email, req.body.password);
  connection.query('SELECT Pk_account,firstName,lastName,email,image,Password FROM accounts WHERE Email='+ mysql.escape(req.body.email),function(error,results){
      if (error){
        console.log("here is error "+error)
        return res.status(401).json({
          status:false,
          message:'Account not exist'
        });
      }
      else{
        bcrypt.compare(req.body.password, results[0].Password, function(err, isMatch) {
          if (err) {
            throw err
          } else if (!isMatch) {
            console.log("Password doesn't match!")
          } else {
            console.log("Password matches!")
            const token = jwt.sign({email: results[0].email, userId: results[0].Pk_account},
              "secret_this_should_be_longer", 
            { expiresIn: "1h"});
            console.log("its my token "+token);
            res.status(200).json({
              token: token,
              expiresIn: 36000,
              userId: results[0].Pk_account,
              firstName: results[0].firstName,
              lastName: results[0].lastName,
              email: results[0].email,
              image:results[0].image
            });
          }
        })
        console.log("No Error");
      }          
    });

}catch(err){
  console.log(err);
}
}

module.exports.changePassword = function (req,res) {
  try{
    console.log("email and password = "+req.body.currentPassowrd, req.body.newPassword);
    connection.query('SELECT pk_account,Password FROM accounts WHERE Pk_account='+ mysql.escape(req.body.userId),function(error,results){
        if (error){
          console.log("here is error "+error)
          return res.status(401).json({
            status:false,
            message:'Account not exist'
          });
        }
        else{
          bcrypt.compare(req.body.currentPassowrd, results[0].Password, function(err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
              console.log("Password doesn't match!")
            } else {
              console.log("Password matches!")
              
              bcrypt.hash(req.body.newPassword, 10)
              .then(hash => {
                  connection.query("UPDATE accounts SET password="+mysql.escape(hash)+" WHERE pk_account = "+mysql.escape(req.body.userId)) ,function(error,results){
                  if (error){
                  res.json({
                      status:false,
                      message:'Your account can not be create due to some invalid data'
                    })
                  }
                  else{
                    // here i will send email 
                      console.log("password has been changed");
                    res.json({
                      status:true,
                      message: 'Your account has been created succussfully',
                    });
                  }
                }
              });








            }
          })
          console.log("No Error");
        }          
      });
  
  }catch(err){
    console.log(err);
  }
  
  }