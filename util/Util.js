module.exports = {
  randomAlphaNumeric: function(length) {
      let chars = '0123456789abcdefghij'
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
  },

  checkPassword: function(newPassword, confirmPassword) {
    let reNum = /[0-9]/
    let reChar = /[A-Za-z]/

    if(newPassword !== confirmPassword) {
      return {
        msg: __('messages.newEqualsConfirmPass'),
        alertClass: 'alert-danger',
        validation: false
      }
    } else if(newPassword.length < 6) {
      return {
        msg: __('messages.minLength'),
        alertClass: 'alert-danger',
        validation: false
      }
    } else if(!reNum.test(newPassword)) {
      return {
        msg: __('messages.containNumber'),
        alertClass: 'alert-danger',
        validation: false
      }
    } else if(!reChar.test(newPassword)) {
      return {
        msg: __('messages.containLetter'),
        alertClass: 'alert-danger',
        validation: false
      }
    } else {
      return {
        validate: true
      }
    }
  },

  orderFunctionality: function(a,b) {
    if (a.Priority < b.Priority)
      return -1;
    if (a.Priority > b.Priority)
      return 1;
    return 0;
  }
}
