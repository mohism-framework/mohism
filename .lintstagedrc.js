module.exports = {
  '*': allFiles => {
    console.log(allFiles);
    return 'echo "ok"';
  }
};