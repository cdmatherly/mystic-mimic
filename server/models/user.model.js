const bcrypt = require("bcrypt");
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "Username must be at least {MINLENGTH} characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be {MINLENGTH} characters or longer"],
    },
    characters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}]
  }, 
  { timestamps: true }
);

//confirms password
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Confirm password must match password");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

module.exports.User = mongoose.model('User', UserSchema)