const mongoose = require('mongoose');


const Loginwithgmail = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String
    },
    email: {
        type: String
    }, password: {
        type: String
    }
})

module.exports = mongoose.model('Loginwithgmail', Loginwithgmail);
