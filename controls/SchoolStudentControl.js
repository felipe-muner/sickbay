const oracledb = require('oracledb')
oracledb.maxRows = 5000
oracledb.outFormat = oracledb.OBJECT

const dbConfig = {
  user: process.env.NODE_ORACLEDB_USER,
  password: process.env.NODE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING
}

const query = "SELECT es.aluno.matricula, " +
                  "es.aluno.primnomealuno||' '||COALESCE(es.aluno.segnomealuno, '')||' '|| es.aluno.ultnomealuno AS nome, " +
                  "es.aluno.alergia, " +
                  "COALESCE(es.turmaano.descturma, es.turma.descturma) AS turma, " +
                  "es.serie.descserie AS serie, " +
                  "es.filial.descfilial AS filial, " +
                  "es.filial.codfilial " +
              "FROM es.aluno " +
                  "INNER JOIN es.alunoano ON (es.alunoano.matricula = es.aluno.matricula AND es.alunoano.anoletivo = '2017 ') " +
                  "INNER JOIN es.turmaano ON (es.turmaano.codturma = es.alunoano.codturma AND es.turmaano.anoletivo = es.alunoano.anoletivo) " +
                  "INNER JOIN es.turma ON (es.turmaano.codturma = es.turma.codturma) " +
                  "INNER JOIN es.serie ON (es.serie.codserie = es.turma.codserie) " +
                  "INNER JOIN es.filial ON (es.filial.codfilial = es.turma.codfilialturma) " +
              "WHERE (" +
                  "es.aluno.statusaluno = '0' " +
                  "OR EXISTS (" +
                      "SELECT 1 " +
                      "FROM es.alunostatus " +
                      "WHERE es.alunostatus.matricula  = es.aluno.matricula " +
                          "AND es.alunostatus.datastatus > CURRENT_DATE " +
                          "AND es.alunostatus.statusaluno = '3'" +
                  ")" +
              ") " +
              "ORDER BY es.aluno.primnomealuno||' '||COALESCE(es.aluno.segnomealuno, '')||' '|| es.aluno.ultnomealuno"

function doRelease(connection) {
  connection.close(function(err) {
    if(err) {
      next(err)
    }
  })
}


function SchoolStudentControl() {
  this.get = function(req, res, next) {
    oracledb.getConnection(dbConfig, function(err, connection) {
      if(err) {
        next(err)
        return
      }
      connection.execute(query, function(err, result) {
        if(err) {
          next(err)
          doRelease(connection)
          return
        }
        console.log('Executing (oracle): ' + query)
        req.SchoolStudent = result.rows
        doRelease(connection)
        next()
      })
    })
  }
}

module.exports = new SchoolStudentControl()
