const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pet: {
        type: String,
        required: true // 미정
    },
    interestKeywords: {
        type: String,
        required: true
    },
    refreshToken: String
});

class DTO {
    #username;
    #password;
    #dateOfBirth;
    #email;
    #pet;
    #interestKeywords;

    get getUsername() {
        return this.#username;
    }
    get getPassword() {
        return this.#password;
    }
    get getDateOfBirth() {
        return this.#dateOfBirth;
    }
    get getEmail() {
        return this.#email;
    }
    get getPet() {
        return this.#pet;
    }
    get getInterestKeywords() {
        return this.#interestKeywords;
    }

    set setUsername(value) {
        this.#username = value;
    }
    set setPassword(value) {
        this.#password = value;
    }
    set setDateOfBirth(value) {
        this.#dateOfBirth = value;
    }
    set setEmail(value) {
        this.#email = value;
    }
    set setPet(value) {
        this.#pet = value;
    }
    set setInterestKeywords(value) {
        this.#interestKeywords = value;
    }

    isEmpty = () => {
        let array;
        check(this.#username, "username");
        check(this.#password, "password");
        check(this.#dateOfBirth, "dateOfBirth");
        check(this.#email, "email");
        check(this.#pet, "pet");
        check(this.#interestKeywords, "interestKeywords");
    }
}

const check = (value, str) => {
    if(!value){
        return str;
    } else {
        return "";
    }
    // join같이 써서 합치면 될듯 concat
}

const DB = mongoose.model('User', userSchema);
module.exports = { DB, DTO}