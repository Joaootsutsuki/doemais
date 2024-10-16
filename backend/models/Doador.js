const User = require("./User");


class Doador extends User{
    constructor(_idDoador, _cpf, _tipo_sanguineo, _fator_rh, _ultima_doacao, _contato, _email, _apto_para_doar, _endereco){
        this.idDoador = _idDoador;
        this.cpf = _cpf;
        this.tipoSanguineo = _tipo_sanguineo;
        this.fatorRh = _fator_rh;
        this.ultimaDoacao = _ultima_doacao;
        this.contato = _contato;
        this.email = _email;
        this.aptoDoar = _apto_para_doar;
        this.endereco = _endereco;
    }
}



module.exports = Doador;