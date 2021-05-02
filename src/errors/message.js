const codes = require('./code');

function getErrorMessage(code) {
  switch (code) {
    case codes.USER_NOT_FOUND:
      return 'User is not found';
    case codes.WRONG_PASSWORD:
      return 'Wrong password';
    case codes.USER_EXISTING:
        return 'user is existing!';
    case codes.MODERATOR_NOT_FOUND:
      return 'moderator is not found!';
    case codes.MODERATOR_EXISTING:
      return 'moderator is existing!';
    case codes.UPLOAD_FILE_ERROR:
      return "upload file error... server aws error!";
    case codes.FILE_INVALID:
      return "file is invalid, not match!";
    default:
      return null;
  }
}

function getSuccess(data, mess){
  return {
    data,
    mess
  };
}

module.exports = {
  getErrorMessage,
  getSuccess,
  };