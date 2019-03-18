// generated from cl-milankovic

function Cal_ml() {

}
if (__calendars_list == undefined)
        var __calendars_list = [];
__calendars_list.push('ml');

Cal_ml.prototype.is_leap = function(year){
    if(year <= 0) {
        ++year;
    }
    if(mod(year, 4) == 0) {
        if(mod(year, 100) == 0) {
            var century = parseInt( mod(fdiv(year, 100), 9));
            if(century == 2 || century == 6) {
                return 1;
            } else {
                return 0;
            }
        }
        return 1;
    }
    return 0;
}
Cal_ml.prototype.days_in_month = function(month,year){
    switch(month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
            break;
        case 02:
            return this.is_leap(year) ? 29 : 28;
            break;
        default:
            return 0;
            break;
    }
}
Cal_ml.prototype.days_in_year = function(year){
    return this.is_leap(year) ? 366 : 365;
}
Cal_ml.prototype.month_in_year = function(year){
    return 12;
}
Cal_ml.prototype.is_valid = function(year,month,day){

    if(day > 0 && day <= this.days_in_month(month, year)) {
        return 1;
    }
    return 0;
}
Cal_ml.prototype.to_jdn = function(year,month,day){
    var c0 ;
    var x1 = 0;
    var x2 = 0;
    var x3 = 0;
    var x4 = 0;
    if(year <= 0) {
        ++year;
    }
    c0 = fdiv((month - 3) , 12);
    x1 = month - (12 * c0) - 3;
    x4 = year + c0;
    x3 = fdiv(x4, 100);
    x2 = mod(x4, 100);
    return  fdiv(328718 * x3 + 6, 9)
          + fdiv(36525 * x2 , 100)
          + fdiv(153 * x1 + 2 , 5)
          + day + 1721119;
}
Cal_ml.prototype.from_jdn = function(jd){
    var k3 = parseInt( 9 * (jd - 1721120) + 2);
    var x3 = parseInt( fdiv(k3, 328718));
    var k2 = parseInt( 100 * fdiv(mod(k3, 328718), 9) + 99);
    var k1 = parseInt( fdiv(mod(k2, 36525), 100) * 5 + 2);
    var x2 = parseInt( fdiv(k2, 36525));
    var x1 = parseInt(
        fdiv(5 * fdiv(mod(k2, 36525), 100) + 2, 153));
    var c0 = parseInt( fdiv(x1 + 2, 12));
    var __date = {}; 
    __date.year = (100 * x3 + x2 + c0);
    if(__date.year <= 0) {
        --(__date.year);
    }
    __date.month = (x1 - 12 * c0 + 3);
    __date.day =  fdiv(mod(k1, 153), 5) + 1;
    return __date;
}
Cal_ml.prototype.to_gr = function(j,g){
    var jdn = 0;
    jdn = this.to_jdn(j);
    jdn_to_gr(jdn, g);
}
Cal_gr.prototype.to_ml = function(g,j){
    var jdn = 0;
    jdn = gr_to_jdn(g);
    jdn_to_ml(jdn, j);
}

