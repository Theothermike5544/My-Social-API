const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: 'Enter a personal username!',
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: 'Enter a personal email!',
            unique: true,
            //Email REGEX Validation
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Enter a valid e-mail address!']
            
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Constructs a total count of friends of a individual user
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the  model using the following 'UserSchema'
const User = model('User', UserSchema);

module.exports = User;