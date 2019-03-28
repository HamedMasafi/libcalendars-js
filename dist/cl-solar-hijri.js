// generated from cl-solar-hijri

function Cal_sh() {

}
if (__calendars_list == undefined)
        var __calendars_list = [];
__calendars_list.push('sh');





var cycle_days = 1029983;

var cycle_years = 2820;

var year_length = 365.24219858156028368;

var hijri_shamsi_epoch = 2121446;

var leap_threshold = 0.24219858156028368;
Cal_sh.prototype.is_leap = function(year){
    var integral ;
    var frac ;
    frac = mod((year + 2346) * leap_threshold, integral);
    if(frac < leap_threshold) {
        return 1;
    } else {
        return 0;
    }
}
Cal_sh.prototype.days_in_month = function(month,year){
    if(month > 0 && month <= 12) {
        return month < 7 ? 31 : month < 12 || this.is_leap(year) ? 30 : 29;
    }

    return 0;
}
//fn cycle removed from this file
Cal_sh.prototype.days_in_year = function(year){
    return this.is_leap(year) ? 366 : 365;
}
Cal_sh.prototype.month_in_year = function(year){
    return 12;
}
Cal_sh.prototype.is_valid = function(year,month,day){
    if(year < 0)
        ++year;
    if(day > 0 && day <= this.days_in_month(month, year)) {
        return 1;
    }
    return 0;
}
//fn cycle_start removed from this file
//fn fdoy_c removed from this file
//fn fdoy removed from this file
Cal_sh.prototype.to_jdn = function(year,month,day){
    
    var era = 0;
    var d_y = 0;
    var y_c = 0;
    var f_d = 0;
    var i = 0;
    if(year < 0) {
        ++year;
    }
    era = (year - 475) / cycle_years;
    if((year - 475) < 0) {
        --era;
    }
    y_c = (year - 475) - era * cycle_years;
    f_d = fdoy_c(y_c, era);
    d_y = 0;
    for(i = 1; i < month; ++i) {
        d_y += this.days_in_month(i, year);
    }
    d_y += day;
    return  f_d + d_y - 1;
}
Cal_sh.prototype.from_jdn = function(jd){
    var __date = {};

    var c = parseInt( cycle(jd));
    var y_c = parseInt( (Math.floor((jd - cycle_start(jd)) / year_length)));
    var y = parseInt( y_c + 475 + c * 2820);
    var d = parseInt( jd - fdoy_c(y_c, c) + 1);
    var m = 0;
    if(d > this.days_in_year(y)) {
        y++;
        d = 1;
    }
    if(y <= 0) {
        y--;
    }
    for(m = 1; m < 12; ++m) {
        if(d > this.days_in_month(m, y)) {
            d -= this.days_in_month(m, y);
        } else {
            break;
        }
    }
    __date.year = y;
    __date.month = m;
    __date.day = d;
    return __date;
}
Cal_sh.prototype.to_gr = function(j,g){
    var jdn = 0;
    jdn = this.to_jdn(j);
    jdn_to_gr(jdn, g);
}
Cal_gr.prototype.to_sh = function(g,j){
    var jdn = 0;
    jdn = gr_to_jdn(g);
    jdn_to_sh(jdn, j);
}
