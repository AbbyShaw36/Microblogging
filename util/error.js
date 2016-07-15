//public
exports.internalServerErr = {type: "internalServerError", discription: "Internal server error"};
exports.requestEntityTooLarge = {type: "requestEntityTooLarge", discription: "Request entity too large"};
exports.methodNotAllowed = {type: "methodNotAllowed", discription: "Request method not allowed"};
exports.unauthorized = {type: "unauthorized", discription: "Request unauthorized"};

//user
exports.usernameNotProvided = {type: "illegalArgument", discription: "Username must provided"};
exports.userIdNotProvided = {type: "illegalArgument", discription: "User ID must provided"};
exports.hpDataNotProvided = {type: "illegalArgument", discription: "Head portrait data must provided"};
exports.hpPathNotProvided = {type: "illegalArgument", discription: "Head portrait path must provided"};
exports.passwordNotProvided = {type: "illegalArgument", discription: "Password must provided"};
exports.userNotExists = {type: "ResourceNotFound", discription: "User not exists"};
exports.usernameAlreadyExists = {type: "duplicateEntry", discription: "Username already exists"};
exports.hpPathNotExists = {type: "ResourceNotFound", discription: "Head portrait path not exists"};

//blog
exports.blogListLimitNotProvided = {type: "illegalArgument", discription: "Blog List limit must provided"};
exports.blogContentNotProvided = {type: "illegalArgument", discription: "Blog content must provided"};