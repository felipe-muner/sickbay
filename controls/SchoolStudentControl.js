const oracledb = require('oracledb')
oracledb.maxRows = 5000
oracledb.outFormat = oracledb.OBJECT

const dbConfig = {
  user: process.env.NODE_ORACLEDB_USER,
  password: process.env.NODE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING
}

const setTimestampFormat = "begin execute immediate q'[alter session set nls_timestamp_format='YYYY-MM-DD HH24.MI.SSXFF']'; end;"

const query = "SELECT es.aluno.Matricula AS MATRICULA, " +
                     "es.aluno.primnomealuno||' '||COALESCE(es.aluno.segnomealuno, '')||' '|| es.aluno.ultnomealuno AS NOME, " +
                     "es.aluno.alergia AS ALERGIA, " +
                     "COALESCE(es.turmaano.descturma, es.turma.descturma) AS TURMA, " +
                     "es.serie.Descserie AS SERIE, " +
                     "es.filial.Descfilial AS FILIAL, " +
                     "es.filial.codfilial AS CODFILIAL " +
                "FROM es.aluno " +
                  "INNER JOIN es.alunoano ON (es.alunoano.matricula = es.aluno.matricula AND es.alunoano.anoletivo = '2017 ') " +
                  "INNER JOIN es.turma ON (es.alunoano.codturma = es.turma.codturma) " +
                  "LEFT JOIN es.turmaano ON (es.turmaano.codturma = es.turma.codturma AND es.turmaano.anoletivo = es.alunoano.anoletivo) " +
                  "INNER JOIN es.serie ON (es.serie.codserie = es.turma.codserie) " +
                  "INNER JOIN es.filial ON (es.filial.codfilial = es.turma.codfilialturma) " +
                "WHERE es.alunoano.Datamatricula <= CURRENT_DATE " +
                  "AND (COALESCE((SELECT es.alunostatus.statusaluno " +
                                  "FROM (SELECT es.alunostatus.matricula, " +
                                              "MAX(es.alunostatus.DATASTATUS) DATASTATUS, " +
                                              "MAX(CAST( es.alunostatus.DATALANCSTATUS||' '||es.alunostatus.HORALANCSTATUS AS TIMESTAMP))DATA_HoraLANCSTATUS  " +
                                          "FROM es.alunostatus " +
                                          "WHERE  es.alunostatus.datastatus <= CURRENT_DATE " +
                                            "AND CODUSUARIOESTORNO IS NULL " +
                                          "GROUP BY es.alunostatus.matricula) x  " +
                                    "INNER JOIN es.alunostatus " +
                                      "ON (es.alunostatus.matricula = x.matricula AND " +
                                        "es.alunostatus.DATASTATUS = x.DATASTATUS AND " +
                                        "CAST( es.alunostatus.DATALANCSTATUS||' '||es.alunostatus.HORALANCSTATUS AS TIMESTAMP) = x.DATA_HoraLANCSTATUS)  " +
                                    "WHERE es.alunostatus.matricula = es.aluno.matricula), '0') IN ('0', '4')) " +
                "ORDER BY es.filial.Descfilial, es.aluno.Matricula"

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
      connection.execute(setTimestampFormat, function(err) {
        if(err) {
          next(err)
          doRelease(connection)
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
    })
  }
}

module.exports = new SchoolStudentControl()
