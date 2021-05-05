const mongoose  = require( "mongoose");
const validator  = require( "validator");
const bcrypt  = require( "bcryptjs");
const jwt  = require( "jsonwebtoken");


const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: {type: String, trim: true, required: true},
    password: {type: String, required: true, minLength: 6},
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: function(value){
            if(!validator.isEmail(value)){
                throw new Error(`Invalid email: ${value}`);
            }
        }
    },
    logins: [{token: {type: String}, date: {type: Date, default: Date.now()}}]
}, {timestamps: true});

userSchema.pre('save', async function(next){
    //move to next middleware if password is not modified during save
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 1);
    next();
});

userSchema.methods.token = async function(){
    const token = await jwt.sign({email: this.email, id: this._id.toString()}, process.env.JWT_SECRET, {expiresIn: '3h'});
    this.logins = this.logins.concat({token});
    await this.save();
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);
module.exports =  User;