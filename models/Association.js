const Department = require(process.env.PWD + '/models/Department')
const Functionality = require(process.env.PWD + '/models/Functionality')
const ProfileFunctionality = require(process.env.PWD + '/models/ProfileFunctionality')
const ProfileSystemAccess = require(process.env.PWD + '/models/ProfileSystemAccess')
const System = require(process.env.PWD + '/models/System')
const Unit = require(process.env.PWD + '/models/Unit')
const User = require(process.env.PWD + '/models/User')
const UserControlAccess = require(process.env.PWD + '/models/UserControlAccess')
const SickBayArea = require(process.env.PWD + '/models/SickBayArea')
const SickBayNurseArea = require(process.env.PWD + '/models/SickBayNurseArea')
const SickBayAttendanceType = require(process.env.PWD + '/models/SickBayAttendanceType')
const SickBayRemedy = require(process.env.PWD + '/models/SickBayRemedy')
const UnitOfMeasure = require(process.env.PWD + '/models/UnitOfMeasure')
const SickBayAttendance = require(process.env.PWD + '/models/SickBayAttendance')
const SickBayAttendanceMedication = require(process.env.PWD + '/models/SickBayAttendanceMedication')
const SickBayMedicationControlled = require(process.env.PWD + '/models/SickBayMedicationControlled')
const SickBayMedicationSchedule = require(process.env.PWD + '/models/SickBayMedicationSchedule')
const SchoolStudent = require(process.env.PWD + '/models/SchoolStudent')

function Association() {
  this.init = function() {
    Department.hasMany(User, {foreignKey: 'id_departamento', sourceKey: 'iddepartamento'})
    Functionality.hasMany(Functionality, {foreignKey: 'FunctionalityFather_ID', sourceKey: 'FunctionalityID'})
    Functionality.hasMany(ProfileFunctionality, {foreignKey: 'Functionality_ID', sourceKey: 'FunctionalityID'})
    ProfileSystemAccess.hasMany(ProfileFunctionality, {foreignKey: 'Profile_ID', sourceKey: 'idperfilsistema'})
    ProfileSystemAccess.hasMany(UserControlAccess, {foreignKey: 'id_perfil_sistema', sourceKey: 'idperfilsistema'})
    System.hasMany(Functionality, {foreignKey: 'System_ID', sourceKey: 'idsistema'})
    System.hasMany(ProfileSystemAccess, {foreignKey: 'id_sistema', sourceKey: 'idsistema'})
    System.hasMany(UserControlAccess, {foreignKey: 'id_sistema', sourceKey: 'idsistema'})
    Unit.hasMany(User, {foreignKey: 'id_site', sourceKey: 'idunidade'})
    Unit.hasMany(SickBayArea, {foreignKey: 'Unit_ID', sourceKey: 'idunidade'})
    User.hasMany(UserControlAccess, {foreignKey: 'id_usuario', sourceKey: 'idusuario'})
    User.hasMany(SickBayAttendance, {foreignKey: 'Nurse_Matricula', sourceKey: 'matricula'})
    User.hasMany(SickBayMedicationControlled, {foreignKey: 'Nurse_Matricula', sourceKey: 'matricula'})
    User.hasMany(SickBayMedicationSchedule, {foreignKey: 'Matricula1', sourceKey: 'matricula'})
    User.hasMany(SickBayMedicationSchedule, {foreignKey: 'Matricula2', sourceKey: 'matricula'})
    User.hasMany(SickBayMedicationSchedule, {foreignKey: 'Matricula3', sourceKey: 'matricula'})
    User.hasMany(SickBayMedicationSchedule, {foreignKey: 'Matricula4', sourceKey: 'matricula'})
    SickBayArea.hasMany(SickBayNurseArea, {foreignKey: 'SickBayArea_ID', sourceKey: 'SickBayAreaID'})
    SickBayArea.hasMany(SickBayAttendance, {foreignKey: 'SickBayArea_ID', sourceKey: 'SickBayAreaID'})
    SickBayArea.hasMany(SickBayMedicationControlled, {foreignKey: 'SickBayArea_ID', sourceKey: 'SickBayAreaID'})
    SickBayNurseArea.hasMany(User, {foreignKey: 'matricula', sourceKey: 'MatriculaNurse'})
    SickBayAttendanceType.hasMany(SickBayAttendance, {foreignKey: 'SickBayAttendanceType_ID', sourceKey: 'SickBayAttendanceTypeID'})
    SickBayAttendance.hasMany(SickBayAttendanceMedication, {foreignKey: 'SickBayAttendance_ID', sourceKey: 'SickBayAttendanceID'})
    SickBayRemedy.hasMany(SickBayAttendanceMedication, {foreignKey: 'SickBayRemedy_ID', sourceKey: 'SickBayRemedyID'})
    UnitOfMeasure.hasMany(SickBayAttendanceMedication, {foreignKey: 'UnitOfMeasure_ID', sourceKey: 'UnitOfMeasureID'})
    SickBayMedicationControlled.hasMany(SickBayMedicationSchedule, {foreignKey: 'SickBayMedicationControlled_ID', sourceKey: 'SickBayMedicationControlledID'})
    SchoolStudent.hasMany(SickBayMedicationControlled, {foreignKey: 'Student_Matricula', sourceKey: 'Matricula'})

    Functionality.belongsTo(Functionality, {foreignKey: 'FunctionalityFather_ID', targetKey: 'FunctionalityID'})
    Functionality.belongsTo(System, {foreignKey: 'System_ID', targetKey: 'idsistema'})
    ProfileFunctionality.belongsTo(Functionality, {foreignKey: 'Functionality_ID', targetKey: 'FunctionalityID'})
    ProfileFunctionality.belongsTo(ProfileSystemAccess, {foreignKey: 'Profile_ID', targetKey: 'idperfilsistema'})
    ProfileSystemAccess.belongsTo(System, {foreignKey: 'id_sistema', targetKey: 'idsistema'})
    User.belongsTo(Department, {foreignKey: 'id_departamento', targetKey: 'iddepartamento'})
    User.belongsTo(Unit, {foreignKey: 'id_site', targetKey: 'idunidade'})
    User.belongsTo(SickBayNurseArea, {foreignKey: 'matricula', targetKey: 'MatriculaNurse'})
    UserControlAccess.belongsTo(ProfileSystemAccess, {foreignKey: 'id_perfil_sistema', targetKey: 'idperfilsistema'})
    UserControlAccess.belongsTo(System, {foreignKey: 'id_sistema', targetKey: 'idsistema'})
    UserControlAccess.belongsTo(User, {foreignKey: 'id_usuario', targetKey: 'idusuario'})
    SickBayArea.belongsTo(Unit, {foreignKey: 'Unit_ID', targetKey: 'idunidade'})
    SickBayNurseArea.belongsTo(SickBayArea, {foreignKey: 'SickBayArea_ID', targetKey: 'SickBayAreaID'})
    SickBayAttendance.belongsTo(User, {foreignKey: 'Nurse_Matricula', targetKey: 'matricula'})
    SickBayAttendance.belongsTo(SickBayArea, {foreignKey: 'SickBayArea_ID', targetKey: 'SickBayAreaID'})
    SickBayAttendance.belongsTo(SickBayAttendanceType, {foreignKey: 'SickBayAttendanceType_ID', targetKey: 'SickBayAttendanceTypeID'})
    SickBayAttendanceMedication.belongsTo(SickBayAttendance, {foreignKey: 'SickBayAttendance_ID', targetKey: 'SickBayAttendanceID'})
    SickBayAttendanceMedication.belongsTo(SickBayRemedy, {foreignKey: 'SickBayRemedy_ID', targetKey: 'SickBayRemedyID'})
    SickBayAttendanceMedication.belongsTo(UnitOfMeasure, {foreignKey: 'UnitOfMeasure_ID', targetKey: 'UnitOfMeasureID'})
    SickBayMedicationControlled.belongsTo(User, {foreignKey: 'Nurse_Matricula', targetKey: 'matricula'})
    SickBayMedicationSchedule.belongsTo(SickBayMedicationControlled, {foreignKey: 'SickBayMedicationControlled_ID', targetKey: 'SickBayMedicationControlledID'})
    SickBayMedicationSchedule.belongsTo(User, {foreignKey: 'Matricula1', targetKey: 'matricula'})
    SickBayMedicationSchedule.belongsTo(User, {foreignKey: 'Matricula2', targetKey: 'matricula'})
    SickBayMedicationSchedule.belongsTo(User, {foreignKey: 'Matricula3', targetKey: 'matricula'})
    SickBayMedicationSchedule.belongsTo(User, {foreignKey: 'Matricula4', targetKey: 'matricula'})
    SickBayMedicationControlled.belongsTo(SchoolStudent, {foreignKey: 'Student_Matricula', targetKey: 'Matricula'})
    SickBayMedicationControlled.belongsTo(SickBayArea, {foreignKey: 'SickBayArea_ID', targetKey: 'SickBayAreaID'})
  }
}

module.exports = new Association()
