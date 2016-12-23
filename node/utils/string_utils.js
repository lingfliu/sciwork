/**
 * Created by liulingfeng on 8/9/16.
 */

var format_check = function(str){
    if (str == ''){
        return 'empty';
    }

    reg = {
        'email': /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}/,
        'mobile': /^[0-9]*$/,
        'general': /[a-zA-Z0-9_]/
    };
    for (pattern in reg){
        if (reg[pattern].test(str)){
            return pattern;
        }
        // console.log(pattern);
    }
    return 'error';
}

var random_string = function(len){
    var base = 32;
    var range = 94; //printable range
    var str = '';
    for (var i = 0; i < len; i++){
        str += String.fromCharCode(Math.round(Math.random()*range)+base);
    }
    return str;
}

module.exports = {'format_check': format_check, 'random_string': random_string};
