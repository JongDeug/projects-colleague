const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    userId: {
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
    interestKeywords: {
        type: String,
        required: true
    },
    refreshToken: String
});

class DTO {
    #userId;
    #password;
    #dateOfBirth;
    #email;
    #interestKeywords;

    get getUserId() {
        return this.#userId;
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
    get getInterestKeywords() {
        return this.#interestKeywords;
    }

    set setUserId(value) {
        this.#userId= value;
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
    set setInterestKeywords(value) {
        this.#interestKeywords = value;
    }

    static isEmpty = (data) => {
        let array = [];
        if (data.checkNull(data.getUserId)) {
            array.push("userId");
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