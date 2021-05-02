const Role = require('../models/Role');


function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "employee",
          permission: "create,read,update,deleted"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'employee' to roles collection");
        });
  
        new Role({
          name: "manager",
          permission: "full"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'manager' to roles collection");
        });
      }
    });
  }

  module.exports = initial;