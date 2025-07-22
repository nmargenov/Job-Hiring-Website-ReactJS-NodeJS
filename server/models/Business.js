const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    businessName: {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Owner is required"],
            unique: true
        },
        businessName: {
            type: String,
            default: '',
            required: [true, 'Business name is required'],
            validate: {
                validator: function (val) {

                    return val.length >= 5 && val.length <= 50;
                },
                message: 'Business name must be between 5 and 50 characters'
            },
        },
        bio: {
            type: String,
            maxLength: 500
        },
            employeeCount: {
            type: Number,
            min: 1
        }
    }
});

const business = mongoose.model("Business", businessSchema);

module.exports = business