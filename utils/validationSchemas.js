export const createUserValidationSchema ={
    username:{
    isLength: {options:{min:5,max:32},
    errorMessage: "User Best be at least 5 characters"},
    notEmpty: {errorMessage: "User must not be empty"},
    isString: {errorMessage:"User must be String"},

},
displayname:{notEmpty: {errorMessage:" Display Name must not be empty"}
},
password: {
  in: ['body'],
  isLength: {
    options: { min: 6 }, errorMessage: "Password must be at least 6 characters long"},
  notEmpty: {errorMessage: "Password must not be empty"},
  isString: {errorMessage: "Password must be a string"}
},

} 

export const userFilterValidationSchema = {
    filter: {
      isLength: {
        options: { min: 3, max: 20 },
        errorMessage: "Filter must be between 3 to 20 characters testing External"
      },
      notEmpty: {
        errorMessage: "Filter must not be empty testing External"
      },
      isString: {
        errorMessage: "Filter must be a string testing External"
      }
    }
  };











// export const createUserValidationSchema = {
//   username: {
//     in: ['body'],
//     isLength: {
//       options: { min: 5, max: 32 },
//       errorMessage: "Username must be between 5 and 32 characters"
//     },
//     notEmpty: {
//       errorMessage: "Username must not be empty"
//     },
//     isString: {
//       errorMessage: "Username must be a string"
//     }
//   },
//   displayname: {
//     in: ['body'],
//     notEmpty: {
//       errorMessage: "Display name must not be empty"
//     },
//     isString: {
//       errorMessage: "Display name must be a string"
//     }
//   },

// };

// export const userFilterValidationSchema = {
//   filter: {
//     in: ['query'],
//     isLength: {
//       options: { min: 3, max: 20 },
//       errorMessage: "Filter must be between 3 and 20 characters"
//     },
//     notEmpty: {
//       errorMessage: "Filter must not be empty"
//     },
//     isString: {
//       errorMessage: "Filter must be a string"
//     }
//   }
// };
