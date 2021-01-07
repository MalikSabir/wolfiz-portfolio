
// its controlar class
const path = require('path');
const multer = require("multer");
const debug = require('debug')('node-angular');
var express = require('express');
var app =express();
var bodyparser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyparser.json());
var accountData = require('./controller/accountsData');
var dashboardData = require('./controller/dashboardData');
const checkAuth = require("./controller/middleware/check-auth");
const { hostname } = require('os');
const { domain } = require('process');
const { Host } = require('@angular/core');
///////////////////// Upload image multer function implements here //////////////
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
  };
  const storage = multer.diskStorage({
  destination: (req, file, cb) => {       //cb is call back
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid Mime Type');
    if(isValid){
      error = null;
    }
    cb(error, "controller/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
  });

const Port = 3000;
var conn=app.listen(Port,function(){
    console.log('server is runing on port = '+Port)
    // console.log(window.location.pathname);
});
app.use("/images", express.static(path.join("controller/images")));

// Accounts APIs
app.post('/api/signin',accountData.signin);
app.post('/api/signup',accountData.signup);
app.post('/api/changePassword',checkAuth,accountData.changePassword);
// Dashboard APIs
app.get('/api/getCountAndroid',checkAuth,dashboardData.getCountAndroid);
app.get('/api/getCatagory',dashboardData.getCatagory);
app.get('/api/getCountWeb',checkAuth,dashboardData.getCountWeb);
app.get('/api/getCountGraphic',checkAuth,dashboardData.getCountGraphic);
app.get('/api/getListProjects',checkAuth,dashboardData.getListProjects);
app.get('/api/getTopProject',checkAuth,dashboardData.getTopProject);

app.post('/api/addProject',checkAuth,multer({storage: storage}).single("image"), dashboardData.addProjectForm);
app.get('/api/getSearchedProject',dashboardData.getSearchedProject);
app.post('/api/search',dashboardData.search);
app.post('/api/viewProject',checkAuth,dashboardData.getViewProject);
app.post('/api/addProjectCategry',checkAuth,dashboardData.addProjectCategory);
app.post('/api/deleteProjectCategry',checkAuth,dashboardData.deleteProjectCategory);
app.post('/api/deleteProject',checkAuth,dashboardData.deleteProject);
app.post('/api/getUser',checkAuth,dashboardData.getUser);

module.exports=app;
