// generated from cl-jewish

function Cal_jw() {

}
if (__calendars_list == undefined)
        var __calendars_list = [];
__calendars_list.push({nm: 'jw', name: 'jewish'});

Cal_jw.prototype.year_type = function(year){
    var qr = pdiv(7 * year - 6, 19);
    var k_p = parseFloat( 0.178117457 * year + 0.777965458 * qr.rem + 0.2533747);
    var i ;
    var k = parseFloat( mod(k_p, i));
    if(qr.rem < 5) {
        if(k >= 0.752248) {
            return 7;
        }
        if(k >= 0.714282) {
            return 6;
        }
        if(k >= 0.661835) {
            return 5;
        }
        if(k >= 0.376121) {
            return 4;
        }
        if(k >= 0.271103) {
            return 3;
        }
        if(k >= 0.090410) {
            return 2;
        }
        if(k >= 0.000000) {
            return 1;
        }
    } else if(qr.rem >= 5 && qr.rem < 8) {
        if(k >= 0.804693) {
            return 7;
        }
        if(k >= 0.714282) {
            return 6;
        }
        if(k >= 0.661835) {
            return 5;
        }
        if(k >= 0.376121) {
            return 4;
        }
        if(k >= 0.271103) {
            return 3;
        }
        if(k >= 0.090410) {
            return 2;
        }
        if(k >= 0.000000) {
            return 1;
        }
    } else if(qr.rem >= 8 && qr.rem < 12) {
        
        if(k >= 0.804693) {
            return 7;
        }
        if(k >= 0.714282) {
            return 6;
        }
        if(k >= 0.661835) {
            return 5;
        }
        if(k >= 0.376121) {
            return 4;
        }
        if(k >= 0.271103) {
            return 3;
        }
        if(k >= 0.090410) {
            return 2;
        }
        if(k >= 0.000000) {
            return 1;
        }
    } else if(qr.rem > 12) {
        if(k >= 0.871750) {
            return 14;
        }
        if(k >= 0.714282) {
            return 13;
        }
        if(k >= 0.533590) {
            return 12;
        }
        if(k >= 0.428570) {
            return 11;
        }
        if(k >= 0.285711) {
            return 10;
        }
        if(k >= 0.157466) {
            return 9;
        }
        if(k >= 0.000000) {
            return 8;
        }
    }
    return 0;
}
Cal_jw.prototype.is_leap = function(year){
    return mod((7 * year + 1), 19) < 7 ? 1 : 0;
}
Cal_jw.prototype.is_complete = function(year){
    switch(this.year_type(year)) {
        case 2:
        case 5:
        case 7:
        case 9:
        case 12:
        case 14:
            return 1;
        default:
            return 0;
    }
}
Cal_jw.prototype.is_deficient = function(year){
    switch(this.year_type(year)) {
        case 1:
        case 6:
        case 8:
        case 11:
        case 13:
            return 1;
        default:
            return 0;
    }
}
Cal_jw.prototype.is_regular = function(year){
    switch(this.year_type(year)) {
        case 3:
        case 5:
        case 10:
            return 1;
        default:
            return 0;
    }
}
Cal_jw.prototype.days_in_month = function(month,year){
    switch(month) {
        case 1:
            return 30;
        case 2:
            return 29;
        case 3:
            return 30;
        case 4:
            return 29;
        case 5:
            return 30;
        case 6:
            return 29;
        case 7:
            return 30;
        case 8:
            if(this.is_regular(year) || this.is_deficient(year)) {
                return 29;
            } else if(this.is_complete(year)) {
                return 30;
            }
        case 9:
            if(this.is_regular(year) || this.is_complete(year)) {
                return 30;
            } else if(this.is_deficient(year)) {
                return 29;
            }
            break;
        case 10:
            return 29;
        case 11:
            return 30;
        case 12:
            if(this.is_leap(year)) {
                
                return 30;
            } else {
                
                return 29;
            }
            break;
        case 13:
            if(this.is_leap(year)) {
                
                return 29;
            } else {
                
                return 0;
            }
            break;
        default:
            break;
    }
    return 0;
}
Cal_jw.prototype.days_in_year = function(year){
    if(year == 0) {
        return 0;
    }
    if(this.is_leap(year)) {
        if(this.is_regular(year)) {
            return 354;
        } else if(this.is_complete(year)) {
            return 355;
        } else if(this.is_deficient(year)) {
            return 353;
        }
    } else {
        if(this.is_regular(year)) {
            return 384;
        } else if(this.is_complete(year)) {
            return 385;
        } else if(this.is_deficient(year)) {
            return 383;
        }
    }
    return 0;
}
Cal_jw.prototype.month_in_year = function(year){
    if(year == 0) {
        return 0;
    }
    if(this.is_leap(year)) {
        return 13;
    }
    return 12;
}
Cal_jw.prototype.is_valid = function(year,month,day){
    if(day > 0 && day <= this.days_in_month(month, year)) {
        return 1;
    }
    return 0;
}
//fn q removed from this file
//fn r removed from this file
//fn v1 removed from this file
//fn v2 removed from this file
//fn L2 removed from this file
//fn v3 removed from this file
//fn v4 removed from this file
//fn c2 removed from this file
//fn L removed from this file
//fn c3 removed from this file
//fn c4 removed from this file
Cal_jw.prototype.to_jdn = function(year,month,day){
    var j0 = 347998;
    var c0 = parseInt( fdiv(13 - month, 7));
    var x1 = parseInt( year - 1 + c0);
    var x3 = parseInt( month - 1);
    var z4 = parseInt( day - 1);
    var qx = parseInt( q(x1));
    return  j0 - 177
          + 32336 * qx
          + fdiv(15 * qx + 765433 * r(x1) + 12084, 25920)
          + mod(fdiv(6 * mod(v1(x1), 7), 7), 2)
          + 2 * mod(fdiv(L2(x1) + 19, 15), 2)
          + mod(fdiv(L2(x1 - 1) + 7, 15), 2)
          + fdiv(384 * x3 + 7, 13)
          + mod(fdiv(L(x3) + 7, 2), 15) * fdiv(x3 + 4, 12)
          - mod(fdiv(385 - L(x3), 2), 15)
          * fdiv(x3 + 3, 12) + z4;
}
Cal_jw.prototype.from_jdn = function(jd){
    var __date = {};

    var y4 = parseInt( jd - 347821);
    var q = parseInt( fdiv(y4, 1447));
    var r = parseInt( mod(y4, 1447));
    var y1_p = parseInt( 49 * q
                         + fdiv(23 * q + 25920 * r + 13835, 765433));
    var gamma_1 = parseInt( y1_p + 1);
    var xi_1 = parseInt( fdiv(19 * gamma_1 + 17, 235));
    var mu_1 = parseInt( gamma_1 - fdiv(235 * xi_1 + 1, 19));
    var zeta_1 = parseInt( y4 - c4(xi_1, mu_1));
    var gamma_2 = parseInt( gamma_1 + fdiv(zeta_1, 33));
    var xi_2 = parseInt( fdiv(19 * gamma_2 + 17, 235));
    var mu_2 = parseInt( gamma_2 - fdiv(235 * xi_2 + 1, 19));
    var zeta_2 = parseInt( y4 - c4(xi_2, mu_2));
    var gamma_3 = parseInt( gamma_2 + fdiv(zeta_2, 33));
    var xi_3 = parseInt( fdiv(19 * gamma_3 + 17, 235));
    var mu_3 = parseInt( gamma_3 - fdiv(235 * xi_3 + 1, 19));
    var zeta_3 = parseInt( y4 - c4(xi_3, mu_3));
    var c = parseInt( fdiv(12 - mu_3, 7));
    __date.year = xi_3 + 1 - c;
    __date.month = mu_3 + 1;
    __date.day = zeta_3 + 1;
    return __date;
}
Cal_jw.prototype.to_gr = function(j,g){
    var jdn = 0;
    jdn = this.to_jdn(j);
    jdn_to_gr(jdn, g);
}
Cal_gr.prototype.to_jw = function(g,j){
    var jdn = 0;
    jdn = gr_to_jdn(g);
    jdn_to_jw(jdn, j);
}
