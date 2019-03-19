function div () {
    return {
        quot: Math.floor(a / b),
        rem: a % b
    }
}
function q (x){
    return parseInt(fdiv(fdiv(235 * x + 1, 19), 1095));
}
function r (x){
    return parseInt(mod(fdiv(235 * x + 1, 19), 1095));
}
function v1 (x){
    var c1 = parseInt( fdiv(235 * x + 1, 19));
    var qx = parseInt( fdiv(c1, 1095));
    return parseInt(32336 * qx
           + fdiv(15 * qx + 765433 * mod(c1, 1095) + 12084, 25920));
}
function v2 (x){
    var c1 = parseInt( fdiv(235 * x + 1, 19));
    var qx = parseInt( fdiv(c1, 1095));
    var v1x = parseInt( 32336 * qx
                        + fdiv(15 * qx + 765433 * mod(c1, 1095) + 12084, 25920));
    return parseInt(v1x + mod(fdiv(6 * mod(v1x, 7), 7), 2));
}
function L2 (x){
    return parseInt(v2(x + 1) - v2(x));
}
function v3 (x){
    return parseInt(2 * mod(fdiv(L2(x) + 19, 15), 2));
}
function v4 (x){
    return parseInt(mod(fdiv(L2(x - 1) + 7, 15), 2));
}
function c2 (x){
    return parseInt(v2(x) + v3(x) + v4(x));
}
function L (x){
    return parseInt(c2(x + 1) - c2(x));
}
function c3 (x){
    return parseInt(fdiv(384 * x + 7, 13)
           + mod(fdiv(L(x) + 7, 2), 15) * fdiv(x + 4, 12)
           - mod(fdiv(385 - L(x), 2), 15) * fdiv(x + 3, 12));
}
function c4 (x,y){

    var c1 = parseInt( fdiv(235 * x + 1, 19));
    var qx = parseInt( fdiv(c1, 1095));
    var Ly = parseInt( L(y));
    var rx = parseInt( mod(c1, 1095));
    var v1x = parseInt( 32336 * qx
                        + fdiv(15 * qx + 765433 * rx + 12084, 25920));
    return parseInt(v1x
        + mod(fdiv(6 * mod(v1x, 7), 7), 2)
        + 2 * mod(fdiv(L2(x) + 19, 15), 2)
        + mod(fdiv(L2(x - 1) + 7, 15), 2)
        + fdiv(384 * y + 7, 13)
        + mod(fdiv(Ly + 7, 2), 15) * fdiv(y + 4, 12)
        - mod(fdiv(385 - Ly, 2), 15) * fdiv(y + 3, 12));
}
function cycle (jdn){
    var offset = parseInt( jdn - hijri_shamsi_epoch);
    var cycle_no = parseInt( offset / cycle_days);
    if(offset < 0) {
        --cycle_no;
    }
    return parseInt(cycle_no);
}
function cycle_start (jdn){
    var era = parseInt( cycle(jdn));
    var start = parseInt( hijri_shamsi_epoch + era * cycle_days);
    return parseInt(start);
}
function fdoy_c (year,cycleNo){
    var d_c = parseFloat( (year * year_length)); 
    
    var fdoy_c = parseInt( (Math.floor(d_c)));
    return parseInt(hijri_shamsi_epoch + cycleNo * cycle_days + fdoy_c );
}
function fdoy (year){
    
    var c = parseInt( year / cycle_years);
    
    var fdoy_c ;
    
    var d_c ;
    year -= 475;
    if(year < 0) {
        c--;
    }
    year -= (c * cycle_years);
    d_c = (year * year_length);
    fdoy_c = (Math.floor(d_c));
    return parseInt(hijri_shamsi_epoch + c * cycle_days + fdoy_c );
}
function pdiv (y,x){
    var rv = div(y, x);
    if(rv.rem < 0) {
        if(x>0) {
            rv.quot -= 1;
            rv.rem += x;
        } else {
            rv.quot += 1;
            rv.rem -= x;
        }
    }
    return rv;
}
function fdiv (a,b){
    return parseInt((a - (a < 0 ? b - 1 : 0)) / b);
}
function mod (x,y){
    return parseInt(x - fdiv(x, y) * y);
}
