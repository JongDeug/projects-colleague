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
        let array = [];
        if (checkNull(this.#username, "username")) {
            array.push("username");
        }
        if (checkNull(this.#password, "password")) {
            array.push("password");
        }
        if (checkNull(this.#dateOfBirth, "dateOfBirth")) {
            array.push("dateOfBirth");
        }
        if (checkNull(this.#email, "email")) {
            array.push("email");
        }
        if (checkNull(this.#pet, "pet")) {
            array.push("pet");
        }
        if (checkNull(this.#interestKeywords, "interestKeywords")) {
            array.push("interestKeywords");
        }

        if (array.length === 0) {
            return false;
        } else {
            return array.join(" ");
        }
    }
}

const checkNull = (value) => {
    if (!value) {
        return true;
    } else {
        return false;
    }
}

const DB = mongoose.model('User', userSchema);
module.exports = { DB, DTO }