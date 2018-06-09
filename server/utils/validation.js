var isRealString = str => {
  // A string and has character in it
  return typeof str == "string" && str.trim().length > 0;
};

module.exports = {
  isRealString
};
