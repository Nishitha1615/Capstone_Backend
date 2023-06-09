const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        min:5,
        max:15
    },
    LastName:{
        type:String,
        required:true,
        min:5,
        max:15
    },
    UserName:{
        type:String,
        required:true,
        index:true
    },

    email:{
        type:String,
        required:true,
    //    unique:true,
       lowercase:true
    },
    hash_password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    },
    MobileNumber:{
        type:String,
        required:false,
    },
    profileImage:{
        type:String
    }
},
{
    timestamps:true
});

userSchema.virtual('password').set(function(password) {
    this.hash_password=bcrypt.hashSync(password,10);
})

userSchema.virtual('fullname').get(function(){
    return `${this.FirstName} ${this.LastName}`
})

//to check the password
userSchema.methods={
    authenticate:function(password) {
        return bcrypt.compareSync(password,this.hash_password)
    }
}

module.exports= mongoose.model('oderUser',userSchema);