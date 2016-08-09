/**
 * Created by liulingfeng on 8/9/16.
 */

var format_check = function(str){
    if (str.equals('')){
        return 'empty';
    }
    reg = {
        'email': /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
        'mobile': /\+[0-9]*/,
        'general': /[a-zA-Z0-9_]/
    };
    for (pattern in reg){
        if (map(pattern).test(str)){
            return pattern;
        }
    }
    return 'error';
}

var random_string = function(len){
    var base = 32;
    var range = 94; //printable range
    var str = '';
    for (var i = 0; i < len; i++){
        str += String.fromCharCode(int(round(Math.random()*94)+32));
    }
    return str;
}

module.exports = {'format_check': format_check, 'random_string': random_string};
