// import * as yup from 'yup';
let yup = require('yup')

let signinSchema = yup.object().shape({
    name: yup.string().min(6,'must contain 6 characters').max(50,'Too long!').required('Required'),
    password: yup.string().min(8,'password must have at least 8 characters').required('Required')
});

let signupSchema = yup.object().shape({
  name: yup.string().min(6,'must contain 6 characters').max(50,'Too long!').required('Required'),
  password: yup.string().min(8,'password must have at least 8 characters').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

// check validity
loginSchema
  .isValid({
    name: 'jimmy',
    password: "12345678",
  })
  .then(function (valid) {
      console.log(valid); // => true
  });