const User = require("./User");

class Admin extends User {
    constructor(_idAdmin, _cpf){
        this.idAdmin = _idAdmin;
        this.cpf = _cpf;
    }

    getIdAdmin(){
        return this.idAdmin;
    }
    getCpf(){
        return this.cpf;
    }
}

exports.module = Admin;
