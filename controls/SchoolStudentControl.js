const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SchoolStudent = require(process.env.PWD + '/models/SchoolStudent')

function SchoolStudentControl() {
  this.get = function(req, res, next) {
    SchoolStudent.findAll().then(SchoolStudent => {
      req.SchoolStudent = SchoolStudent
      next()
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = new SchoolStudentControl()
