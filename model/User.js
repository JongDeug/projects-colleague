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

    static isEmpty = (data) => {
        let array = [];
        if (data.checkNull(data.getUsername)) {
            array.push("username");
        }
        if (data.checkNull(data.getPassword)) {
            array.push("password");
        }
        if (data.checkNull(data.getDateOfBirth)) {
            array.push("dateOfBirth");
        }
        if (data.checkNull(data.getEmail)) {
            array.push("email");
        }
        if (data.checkNull(data.getPet)) {
            array.push("pet");
        }
        if (data.checkNull(data.getInterestKeywords)) {
            array.push("interestKeywords");
        }

        if (array.length === 0) {
            return false;
        } else {
            return array.join(" ");
        }
    }

    checkNull = (value) => {
        if (!value) {
            return true;
        } else {
            return false;
        }
    }
}

const DB = mongoose.model('User', userSchema);
module.exports = { DB, DTO }