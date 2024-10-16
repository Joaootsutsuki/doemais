const User = require("./User");

class Instituicao extends User{
    constructor(_idInstituicao , _cnpj, _tipo, _contato, _sobre){
        this.idInstituicao = _idInstituicao;
        this.cnpj = _cnpj;
        this.tipo = _tipo;
        this.contato = _contato;
        this.sobre = _sobre;

    }
    
    getIdInstituicao(){
        return this.idInstituicao;
    }
    getCnpj(){
        return this.cnpj;
    }
    getTipo(){
        return this.tipo;
    }
    getContato(){
        return this.contato;
    }
    getSobre(){
        return this.sobre;
    }
}


exports.module = Instituicao;