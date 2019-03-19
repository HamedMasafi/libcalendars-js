#!/usr/bin/python3

import re
import os

core_functions = {}

core_functions["div"] = {
        "type": "div_t",
        "source": """() {
    return {
        quot: Math.floor(a / b),
        rem: a % b
    }"""
}

def proc_method(name, source):
        if "int" in core_functions[name]["type"]: 
                source = re.sub(r"return\s*((.|\n|\r)*)?;", r"return parseInt(\1);", source)
        core_functions[name]["source"] = source
        return "function %s %s\n}\n" % (name, source)

def proc_file(fn, name):
        f = open("libcalendars/src/" + fn + ".c", 'r')
        content = f.read()
        var_re = "(u?int\d+\_t|int|size_t|div_t|double|float)"
        var_int_re = "(u?int\d+\_t|int|size_t)"
        var_float_re = "(double|float)"
        token_re = "[a-zA-Z][A-Za-z0-9_]*"
        d_re = "year|month|day"
        fn_re = "function\s+(\w+)((.|\n)*?)\n\}\n"
        fn_wt_re = "%s\s+(\w+)((.|\n)*?)\n\}\n" % var_re
        # init
        content = re.sub(r"static\s*", "", content)
        content = re.sub(r"const\s*", "", content)
        content = re.sub(r"inline\s*", "", content)
        content = re.sub(r"\/\*(.|\n)*?\*\/\n", "\n", content)
        #     content = re.sub(r"\s\*\s.*\n", "", content)
        #     content = re.sub(r"\n\/\*\n", "", content)
        content = content.replace("LIBCALENDAR_API", "")
        
        content = re.sub(r"\*year\s*\=", r"var __date = {}; \n    *year =", content)
        content = re.sub(r"\*day\s*\=(.*)\;", r"*day = \1;\n    return __date;", content)

        fn_list_t = re.findall(r"%s" % fn_wt_re, content)
        for f in fn_list_t:
                core_functions[f[1]] = {
                        "name": f[1],
                        "type": f[0],
                        "source": ""
                }

        #parametere
        content = re.sub(r"(\,|\()\s*%s\*?\s*" % var_re, r"\1", content)
        #variable declare
        content = re.sub(r"%s\s*(\w+)\s*\=([^;]*)\;" % var_int_re, r"var \2 = parseInt(\3);", content)
        content = re.sub(r"%s\s*(\w+)\s*\=([^;]*)\;" % var_float_re, r"var \2 = parseFloat(\3);", content)
        content = re.sub(r"%s\s*(\w+)\s*(\=|\;)" % var_re, r"var \2 \3", content)
        #method name
        content = re.sub(r"\n\s*(%s)\s+(%s)\s*\((.*)\)\s*\{" % (token_re, token_re), r"\nfunction \2(\3){", content)


        content = re.sub(r"(\w+)\(\&jdn,?\s?(.*);", r"jdn = \1(\2;", content)

        content = re.sub(r"\*\s*year\s*,\s*\*\s*month\s*,\s*\*\s*day", "_date", content)
        content = re.sub(r"(\w+)year\s*,\s*(\w+)month\s*,\s*(\w+)day", r"\1", content)
        content = re.sub(r"\*(%s)" % d_re, r"__date.\1", content)
        content = re.sub(r"([A-Za-z]+)(%s)" % d_re, r"\1.\2", content)
        #     content = re.sub(r"\*(%s)" % d_re, r"_date.\1", content)

        content = re.sub(r"\#include\s*(\<|\")\S+(\>|\")\n", "", content)
        content = re.sub("\(\)\(", "(", content)
        content = re.sub(r"\*jd =(.*)\n", r"return \1\n", content)

        # remove address and reference mark
        content = re.sub(r"\*(%s)" % token_re, r"\1", content)
        content = re.sub(r"\&(%s)" % token_re, r"\1", content)

        content = content.replace("function function", "function ");

        # Math
        content = re.sub(r"(\W)floor(\W)", r"\1Math.floor\2", content)
        content = re.sub(r"(\W)modf(\W)", r"\1mod\2", content)
        # content = re.sub(r"(\W)div\(\s*(\w+)\s*,\s*(\w+)\s*\)(\W)", r"\1\2 % \3\4", content)

        # etc
        # content = re.sub(r"year\s*\=\s*([^;]*)\;(\n|\r|\s)+month\s*\=\s*([^;]*)\;(\n|\r|\s)+day\s*\=\s*([^;]*)\;", r"return {year: \1, month: \3, day: \5}", content)
        content = re.sub(r"function (\w{2})_(\S+)\(", r"Cal_\1.prototype.\2 = function(", content)
        content = re.sub(r"\s%s_(%s)" % (name, token_re), r" this.\1", content)
        content = re.sub(r"function jdn_to_(\w{2})", r"Cal_\1.prototype.from_jdn = function", content)
        # final
        content = content.replace("prototype.to_jdn = function(jd,year,month,day)", "prototype.to_jdn = function(year,month,day)")
        content = content.replace("prototype.from_jdn = function(jd,year,month,day)", "prototype.from_jdn = function(jd)")
        content = re.sub(r"parse(Int|Float)\(\s*((\d|\.)*)\s*\)", r"\2", content)

        content = re.sub(r"return\s*\n", "return ", content)

        fn_list = re.findall(r"%s" % fn_re, content)
        for f in fn_list:
                proc_method(f[0], f[1])
        content = re.sub(r"%s" % fn_re, r"//fn \1 removed from this file\n", content)
        if (name != ""):
                content = ("""// generated from %s

function Cal_%s() {

}
if (__calendars_list == undefined)
        var __calendars_list = [];
__calendars_list.push('%s');""") % (fn, name, name) + content

        #content = re.sub(r"\*([A-Za-z]+)", r"\1", content) 
        #print(content)
        f = open("dist/" + fn + ".js", 'w')
        f.write(content)
        f.close()
        print(fn + ".js created")


proc_file("cl-gregorian", "gr")
proc_file("cl-islamic-civil", "is")
proc_file("cl-jewish", "jw")
proc_file("cl-julian", "ju")
proc_file("cl-milankovic", "ml")
proc_file("cl-solar-hijri", "sh")
proc_file("cl-math", "")

f = open("calendars.js", 'r')
core_class_content = f.read()
f.close()

f = open("dist/cl-core.js", 'w')
for fn, sc in core_functions.items():
        if (sc["source"] != ""):
                f.write("function %s %s\n}\n" % (fn, sc["source"]))
f.close()
print("Finished")