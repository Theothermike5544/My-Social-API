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
            required: true,
            unique: true,
            // requires a match on a validated email
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
        }
    }
);

// Constructs a total count of friends of a individual user
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the  model using the following 'UserSchema'
const User = model('User', UserSchema);

module.exports = User;