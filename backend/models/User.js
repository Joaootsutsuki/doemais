class User{
    constructor(_idUser, _name, _uid, _role){
        this.idUser = _idUser;
        this.name = _name;
        this.uid = _uid;
        this.role = _role;
    }

    getidUser(){
        return this.idUser;
    }
    getUid(){
        return this.uid;
    }

    getRole(){
        return this.role;
    }

    getName(){
        return this.name;
    }
}


module.exports = User;