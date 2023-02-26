const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  first_name: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  last_name: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  phone_number: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  street_address_1: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  street_address_2: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  city: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  state: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  zip: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  country: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    minlength: 5,
  },
  reservation: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
},
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
