var mysql = require('mysql');
var bcrypt = require("bcrypt");
var fs = require('fs');
var connection = require('./connection');
var Crypter = require("cryptr");
cryptr = new Crypter('its encription key');
const jwt = require("jsonwebtoken");
var sleep = require("system-sleep");

module.exports.getCatagory = function (req, res) {
  connection.query('SELECT * FROM project_catagory', function (error, results) {
    if (error) {
      res.status(200).json({
        status: false,
        message: 'there are some error with query'
      })
      console.log("yes i have error = " + error);
    }
    else {
      res.status(200).json({
        status: true,
        res: results
      })
    }
  })
}

module.exports.getCountAndroid = function (req, res) {
  connection.query('SELECT COUNT(fk_category) as count FROM project WHERE fk_category=3', function (error, results) {
    if (error) {
      res.status(200).json({
        status: false,
        message: 'there are some error with query'
      })
      console.log("This is a error = " + error)
    }
    else {
      res.status(200).json({
        status: true,
        res: results
      });
    }
  })
}

module.exports.deleteProjectCategory = function (req, res) {
  connection.query('DELETE FROM project_catagory WHERE categoryName = ' + mysql.escape(req.body.categoryName), function (error, results) {
    if (error) {
      res.status(200).json({
        status: false,
        message: 'there are some error with query'
      })
      console.log("This is a error = " + error)
    }
    else {
      res.status(200).json({
        status: true,
        res: "Delecte Category successfully"
      });
    }
  })
}

module.exports.deleteProject = function (req, res) {
  try {
    fs.unlink(__dirname+'/images/'+req.body.imgPath, function (err) {
      if (err || !err){
        connection.query('DELETE FROM project WHERE pk_project = ' + mysql.escape(req.body.val), function (error, results) {
          if (error) {
            res.status(200).json({
              status: false,
              message: 'there are some error with query'
            })
          }
          else {
            res.status(200).json({
              status: true,
              res: results
            });
          }
        })
      }
  });   
    
  } catch (err) {
    res.status(200).json({
      status: false,
      message: 'its Query Error'
    })
  }
}

module.exports.getCountWeb = function (req, res) {
    connection.query('SELECT COUNT(fk_category) as count FROM project WHERE fk_category=1', function (error, results) {
    if (error) {
      res.status(200).json({
        status: false,
        message: 'there are some error with query'
      })
    }
    else {
      res.status(200).json({
        status: true,
        res: results
      });
    }
  })
}
module.exports.getCountGraphic = function (req, res) {
  connection.query('SELECT COUNT(fk_category) as count FROM project WHERE fk_category=2', function (error, results) {
    if (error) {
      res.status(200).json({
        status: false,
        message: 'there are some error with query'
      })
    }
    else {
      res.status(200).json({
        status: true,
        res: results
      });
    }
  })
}

module.exports.getTopProject = function (req, res) {
  connection.query('SELECT * FROM project LIMIT 5', function (error, results) {
    if (error) {
      res.status(200).json({
        status: false,
        message: 'there are some error with query'
      })
    }
    else {
      res.status(200).json({
        status: true,
        res: results
      });
    }
  });
}

module.exports.getListProjects = function (req, res) {
  connection.query('SELECT * FROM project', function (error, results) {
    if (error) {
      res.status(200).json({
        status: false,
        message: 'there are some error with query'
      })
    }
    else {
      res.status(200).json({
        status: true,
        res: results
      });
    }
  });
}

module.exports.getSearchedProject = function (req, res) {
  console.log("yes i am getting all project");
  connection.query('SELECT * FROM project', function (error, results) {
    if (error) {
      res.status(200).json({
        status: false,
        message: 'there are some error with query'
      });
    }
    else {
      res.status(200).json({
        status: true,
        res: results
      });
    }
  });
}

// Search query of accending order.
module.exports.search = function (req, res) {
  var toggle = req.body.toggleStatus;
  if (toggle) {
    console.log("its Decending true = " + toggle);
    var searchValue = '%' + req.body.search + '%';
    var searchValue1 = +req.body.search;
    var fk_value = req.body.categoryNumber;
    if ((fk_value != null && fk_value > 0) && (searchValue.length >= 5)) {
      var sql = 'SELECT * FROM project WHERE title like ? AND fk_category like ? ORDER BY createDate DESC';
    }
    else if ((searchValue1 != 0) && (fk_value == null || fk_value == 0)) {
      var sql = 'SELECT * FROM project WHERE title like ? ORDER BY createDate DESC';
    }
    if ((searchValue1 == 0 || searchValue == null) && (fk_value != null)) {
      if (fk_value == 0) {
        connection.query('SELECT * FROM project ORDER BY createDate DESC', function (error, results) {
          if (error) {
            res.status(200).json({
              status: false,
              message: 'Record Not Found!'
            });
          }
          else {
            res.status(200).json({
              status: true,
              res: results
            });
          }
        });
      } else {
        connection.query('SELECT * FROM project WHERE fk_category =' + mysql.escape(req.body.categoryNumber) + ' ORDER BY createDate DESC', function (error, results) {
          if (error) {
            res.status(200).json({
              status: false,
              message: 'Record Not Found!'
            });
          }
          else {
            res.status(200).json({
              status: true,
              res: results
            });
          }
        });
      }
    } else {
      connection.query(sql, [searchValue, fk_value], function (error, results) {
        if (error) {
          res.status(200).json({
            status: false,
            message: 'Record Not Found!'
          });
        }
        else {
          res.status(200).json({
            status: true,
            res: results
          });
        }
      });
    }

  } else {
    var searchValue = '%' + req.body.search + '%';
    var searchValue1 = +req.body.search;
    var fk_value = req.body.categoryNumber;
    if ((fk_value != null && fk_value > 0) && (searchValue.length >= 5)) {
      var sql = 'SELECT * FROM project WHERE title like ? AND fk_category like ?';
    }
    else if ((searchValue1 != 0) && (fk_value == null || fk_value == 0)) {
      var sql = 'SELECT * FROM project WHERE title like ?';
    }
    if ((searchValue1 == 0 || searchValue == null) && (fk_value != null)) {
      if (fk_value == 0) {
        connection.query('SELECT * FROM project', function (error, results) {
          if (error) {
            res.status(200).json({
              status: false,
              message: 'Record Not Found!'
            });
          }
          else {
            res.status(200).json({
              status: true,
              res: results
            });
          }
        });
      } else {
        connection.query('SELECT * FROM project WHERE fk_category =' + mysql.escape(req.body.categoryNumber), function (error, results) {
          if (error) {
            res.status(200).json({
              status: false,
              message: 'Record Not Found!'
            });
          }
          else {
            res.status(200).json({
              status: true,
              res: results
            });
          }
        });
      }
    } else {
      connection.query(sql, [searchValue, fk_value], function (error, results) {
        console.log("step 5");
        if (error) {
          res.status(200).json({
            status: false,
            message: 'Record Not Found!'
          });
        }
        else {
          res.status(200).json({
            status: true,
            res: results
          });
        }
      });
    }

  }

}
module.exports.searchDesc = function (req, res) {
}

module.exports.getViewProject = function (req, res) {
  console.log("Searching of " + req.body.projectId);
  connection.query('SELECT * FROM project WHERE pk_project =' + mysql.escape(req.body.projectId), function (error, results) {
    if (error) {
      res.status(200).json({
        status: false,
        message: 'there are some error with query'
      });
    }
    else {
      res.status(200).json({
        status: true,
        res: results
      });
    }
  });
}

module.exports.getUser = function (req, res) {
  console.log("Searching of " + req.body.userId);
  connection.query('SELECT pk_account,firstName,lastName,email,image FROM accounts WHERE pk_account =' + mysql.escape(req.body.userId), function (error, results) {
    if (error) {
      res.status(200).json({
        status: false,
        message: 'there are some error with query'
      });
    }
    else {
      res.status(200).json({
        status: true,
        res: results
      });
    }
  });
}


module.exports.addProjectForm = function (req, res) {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let creatDate = date + "-" + month + "-" + year;
  const url = req.protocol + '://' + req.get("host");
  const imageUrl = url + "/images/" + req.file.filename;
  // const imageUrl = req.file.filename; 
  try {
    var sql = "INSERT INTO project (title,thumbnail,description,status,createDate,fk_category) VALUES ?";
    var values = [
      [req.body.title, imageUrl, req.body.description, req.body.status, creatDate, req.body.categoryPk],
    ];
    connection.query(sql, [values], function (err, result) {
      if (err){
        res.json({
          status: false,
          message: err
      });
      }else{
        res.json({
          status: true,
          message: "Project inserted successfully"
      });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: false,
      message: 'Some thing went wrong in query'
    });
  }
}

module.exports.addProjectCategory = function (req, res) {
  try {
    connection.query("INSERT INTO project_catagory (categoryName) VALUES ('" + req.body.category + "')"), function (error, results) {
      if (error) {
        console.log("Error running")
        res.json({
          status: false,
          message: 'there are some error with query'
        })
      }
      else {
        res.status(200).json({
          status: true,
          result: results
        });
      }
    }
  } catch (err) {
    res.status(200).json({
      status: false,
      message: 'Some thing wend wrong in query'
    });
  }
}
