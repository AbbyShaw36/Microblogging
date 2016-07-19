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

//comment
exports.commentContentNotProvided = {type: "illegalArgument", discription: "Comment content must provided"};
exports.blogIdNotProvided = {type: "illegalArgument", discription: "BlogId must provided"};
exports.receiverNotProvided = {type: "illegalArgument", discription: "Receiver must provided"};
exports.commentNotExists = {type: "RescouceNotFound", discription: "Comment not exists"};

//message
exports.messageContentNotProvided = {type: "illegalArgument", discription: "Message content must provided"};
exports.messageReceiverNotProvided = {type: "illegalArgument", discription: "Message receiver must provided"};
exports.commentIdNotProvided = {type: "illegalArgument", discription: "Comment Id must provided"};

// follow
exports.uIdNotProvided = {type: "illegalArgument", discription: "User ID must provided"};
exports.fuIdNotProvided = {type: "illegalArgument", discription: "Follower ID must provided"};