export const createUserValidationSchema ={
    username:{
    isLength: {options:{min:5,max:32},
    errorMessage: "User Best be at least 5 characters"},
    notEmpty: {errorMessage: "User must not be empty"},
    isString: {errorMessage:"User must be String"},

},
displayname:{notEmpty: {errorMessage:" Display Name must not be empty"}}

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