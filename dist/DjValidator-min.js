/*
 * DjValidator v1.1.0
 * Copyright (C) 2018 David Esneyder Jerez Garnica
 * esneyderg357@gmail.com
 * See the GNU General Public license <http://www.gnu.org/licenses/gpl-3.0.html>.
 */
if("undefined"==typeof jQuery)throw new Error("DjValidator requires jQuery 1.5.1 or higher.");!function(e){var r=["word","atext","antext","text","int","num","dig","file","efile","email","phone","url","regexp","equal","nequal","or","multi","call","radio","check","ip"],t=[function(e,r){if(r.length<3)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");if("*"==r[2]){if(!new RegExp("^\\S{"+r[1]+",}$").test(e.val()))return l(e,n.word_min.replace("$1",r[1])),!1}else if(!new RegExp("^\\S{"+r[1]+","+r[2]+"}$").test(e.val()))return l(e,n.word_between.replace("$1",r[1]).replace("$2",r[2])),!1;return!0},function(e,r){if(r.length<3)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");if("*"==r[2]){if(!new RegExp("^[a-záéíóúñçü ]{"+r[1]+",}$","i").test(e.val()))return l(e,n.atext_min.replace("$1",r[1])),!1}else if(!new RegExp("^[a-záéíóúñçü ]{"+r[1]+","+r[2]+"}$","i").test(e.val()))return l(e,n.atext_between.replace("$1",r[1]).replace("$2",r[2])),!1;return!0},function(e,r){if(r.length<3)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");if("*"==r[2]){if(!new RegExp("^[a-z0-9áéíóúñçü ]{"+r[1]+",}$","i").test(e.val()))return l(e,n.antext_min.replace("$1",r[1])),!1}else if(!new RegExp("^[a-z0-9áéíóúñçü ]{"+r[1]+","+r[2]+"}$","i").test(e.val()))return l(e,n.antext_between.replace("$1",r[1]).replace("$2",r[2])),!1;return!0},function(e,r){if(r.length<3)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");var t=e.val();if("*"==r[2]){if(t.length<r[1])return l(e,n.text_min.replace("$1",r[1])),!1}else if(t.length<r[1]||t.length>r[2])return l(e,n.text_between.replace("$1",r[1]).replace("$2",r[2])),!1;return!0},function(e,r){if(r.length<3)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");var t=e.val();if(!/^[+-]?\d+$/.test(t))return l(e,n.int_invalid),!1;if("*"==r[1]){if("*"==r[2])return!0;if(parseInt(t)>r[2])return l(e,n.int_max.replace("$1",r[2])),!1}else if("*"==r[2]){if(parseInt(t)<r[1])return l(e,n.int_min.replace("$1",r[1])),!1}else if(parseInt(t)<r[1]||parseInt(t)>r[2])return l(e,n.int_between.replace("$1",r[1]).replace("$2",r[2])),!1;return!0},function(e,r){if(r.length<3)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");var t=e.val();if(isNaN(t))return l(e,n.num_invalid),!1;if("*"==r[1]){if("*"==r[2])return!0;if(parseFloat(t)>r[2])return l(e,n.num_max.replace("$1",r[2])),!1}else if("*"==r[2]){if(parseFloat(t)<r[1])return l(e,n.num_min.replace("$1",r[1])),!1}else if(parseFloat(t)<r[1]||parseFloat(t)>r[2])return l(e,n.num_between.replace("$1",r[1]).replace("$2",r[2])),!1;return!0},function(e,r){if(r.length<3)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");var t=e.val();if("*"==r[2]){if(!new RegExp("^\\d{"+r[1]+",}$").test(t))return l(e,n.dig_min.replace("$1",r[1])),!1}else if(!new RegExp("^\\d{"+r[1]+","+r[2]+"}$").test(t))return l(e,n.dig_between.replace("$1",r[1]).replace("$2",r[2])),!1;return!0},function(e,r){if(!File)return console.error("The 'file' validator requires javascript file api, the field  '"+e.attr("name")+"' was ignored."),!0;if(r.length<5)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");var t=e[0].files;if("*"==r[2]){if(t.length<r[1])return l(e,n.file_min.replace("$1",r[1])),!1}else if(t.length<r[1]||t.length>r[2])return l(e,n.file_between.replace("$1",r[1]).replace("$2",r[2])),!1;if(r[5]){var a=r[5].split("|"),f=0==a.length;for(i=0;i<t.length;i++){for(f=!1,j=0;j<a.length;j++)t[i].type==a[j]&&(f=!0);if(!f)break}if(!f)return l(e,n.file_format),!1}for(i=0;i<t.length;i++){if("*"!=r[3]&&t[i].size/1024<r[3])return l(e,n.file_min_size.replace("$1",r[3])),!1;if("*"!=r[4]&&t[i].size/1024>r[4])return l(e,n.file_max_size.replace("$1",r[4])),!1}return!0},function(e,r){if(r.length<2)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");var t=e.val(),i=!1,a=t.substring(t.lastIndexOf(".")+1,t.length).toLowerCase(),f=r[1].split("|");for(ifile=0;ifile<f.length;ifile++)if(a==f[ifile].toLowerCase()){i=!0;break}if(!i)return validas=e.data("dj-validator").substring(e.data("dj-validator").indexOf(",")+1),l(e,n.file_ext.replace("$1",validas.replace(/\|/g,","))),!1;return!0},function(e,r){if(r.length<2)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");if(!/^([a-z0-9_.-])+@(([a-z0-9-])+.)*([a-z0-9])+$/i.test(e.val()))return l(e,n.email),!1;if("*"!=r[1]&&e.val().length>r[1])return l(e,n.email_max.replace("$1",r[1])),!1;return!0},function(e){if(!/^(\+?[0-9]{2,3}[- ]?)?[0-9]{5,12}$/.test(e.val()))return l(e,n.phone),!1;return!0},function(e,r){if(r.length<2)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");if(!/^(https?|s?ftp)\:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/.test(e.val()))return l(e,n.url),!1;if("*"!=r[1]&&e.val().length>r[1])return l(e,n.url_max.replace("$1",r[1])),!1;return!0},function(e,r){if(r.length<2)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");if(r[1]=r[1].replace("°",","),!(r[2]?new RegExp(r[1],r[2]):new RegExp(r[1])).test(e.val()))return l(e,n.regexp),!1;return!0},function(r,t){if(t.length<3)throw new Error("Error validating field '"+r.attr("name")+"', insufficient parameters.");if(r.val()!=e("#"+t[1]).val())return l(r,n.equal.replace("$1",t[2])),!1;return!0},function(r,t){if(t.length<3)throw new Error("Error validating field '"+r.attr("name")+"', insufficient parameters.");if(r.val()==e("#"+t[1]).val())return l(r,n.not_equal.replace("$1",t[2])),!1;return!0},function(r,t){if(t.length<3)throw new Error("Error validating field '"+r.attr("name")+"', insufficient parameters.");fs=e("input[data-dj-validator-group="+t[1]+"]");var a=!1,f=fs.length;for(i=0;i<f;i++)value=e(fs[i]).val(),null==value||""==value||/^\s+$/.test(value)||(a=!0);0==a&&l(r,n.or.replace("$1",t[2]));return a},function(e,r){if(r.length<3)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");var t=[],t=e.val();if("*"==r[2]){if(t.length<parseInt(r[1]))return l(e,n.multi_min.replace("$1",r[1])),!1}else if(t.length<parseInt(r[1])||t.length>parseInt(r[2]))return l(e,n.multi_between.replace("$1",r[1]).replace("$2",r[2])),!1;return!0},function(e,r){if(r.length<2)throw new Error("Error validating field '"+e.attr("name")+"', insufficient parameters.");if(0==window[r[1]](e))return l(e,n.call),!1;return!0},function(r){var t=e("input[name="+r.attr("name")+"]");for(i=0;i<t.length;i++)if(e(t[i]).is(":checked"))return!0;return l(r,n.radio),!1},function(r,t){{if(t[1]){var a=e("input[data-dj-validator-group="+t[1]+"]"),f=0;for(i=0;i<a.length;i++)e(a[i]).is(":checked")&&f++;if("*"==t[3]){if(f<parseInt(t[2]))return l(r,n.check_multi_min.replace("$1",t[4]).replace("$2",t[2])),!1}else if(f<parseInt(t[2])||f>parseInt(t[3]))return l(r,n.check_multi_between.replace("$1",t[4]).replace("$2",t[2]).replace("$3",t[3])),!1;return!0}if(!r.is(":checked"))return l(r,n.check_single),!1}return!0},function(e,r){var t=/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,i=/^((25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])$/;if(r[1])if("v6"==r[1]){if(!t.test(e.val()))return l(e,n.ip.replace("$1","IPv6")),!1}else{if("v4"!=r[1])throw new Error("Error validating field '"+e.attr("name")+"', invalid ip option.");if(!i.test(e.val()))return l(e,n.ip.replace("$1","IPv4")),!1}else if(!t.test(e.val())&&!i.test(e.val()))return l(e,n.ip.replace("$1","IP")),!1;return!0}],a="display:none; color:red; text-align:inherit; font:.9em fantasy bold italic;",n={required:"Required field.",word_min:"At least $1 characters with no spaces.",word_between:"Between $1 and $2 characters with no spaces.",atext_min:"At least $1 alphabetic characters.",atext_between:"Between $1 and $2 alphabetic characters.",antext_min:"At least $1 alphabetic characters or digits.",antext_between:"Between $1 and $2 alphabetic characters or digits.",text_min:"At least $1 characters.",text_between:"Between $1 and $2 characters.",int_invalid:"Invalid integer.",int_min:"The number must be greater than or equal to $1.",int_max:"The number must be less than or equal to $1",int_between:"The number must be between $1 and $2.",num_invalid:"Invalid real number.",num_min:"The number must be greater than or equal to $1.",num_max:"The number must be less than or equal to $1",num_between:"The number must be between $1 and $2.",dig_min:"At least $1 digits.",dig_between:"Between $1 and $2 digits.",file_min:"Select at least $1 files.",file_between:"Select between $1 and $2 files.",file_format:"Invalid file type.",file_min_size:"Files must be larger than $1 kb in size.",file_max_size:"Files must be less than $1 kb. in size",file_ext:"Valid file extensions: $1.",email:"Email not valid.",email_max:"Email must be less than $1 characters.",phone:"Invalid phone number.",url:"Invalid url.",url_max:"URL must be less than $1 characters",ip:"Invalid $1 address",regexp:"Invalid value.",or:"$1: At least one of these fields is required.",equal:"Must be equal to: $1.",not_equal:"Must be different from: $1.",multi_min:"Select at least $1 options",multi_between:"Select from $1 to $2 options.",call:"Invalid value.",radio:"Check an option.",check_single:"Check this option.",check_multi_min:"$1: Check at least $2 options.",check_multi_between:"$1: Check from $2 to $3 options."};function l(r,t){var i=e.data(r,"dj-validator-msg");i&&(t=i),$new=e('<p class="dj-validator-msg" style="'+a+'">'+t+"</p>");var n=r.attr("type"),l=r.is(":visible"),f=e.data(r,"input-group");n&&("radio"==n||"checkbox"==n)||!l||f?$new.appendTo(r.parent()):$new.insertAfter(r),$new.fadeIn(1500)}function f(e){e.find(".dj-validator-msg").remove()}function o(i){var a=!0;if(function(r){if(e.data(r,"dj-validator-group"))return!0;var t=r.val();return null!=t&&""!=t&&!/^\s+$/.test(t)}(i)){var f=e.data(i,"dj-validator");if(f){var o=f.split("&");for(j=0;j<o.length;j++){var s=o[j].split(","),u=r.indexOf(s[0]);if(-1==u)throw new Error("'"+s[0]+"' is not a valid DjValidator key.");a=!!t[u](i,s)&&a}}}else null!=i.attr("required")&&(l(i,n.required),a=!1);return a}function s(r){var t=!0;return f(r),r.find(":input").each(function(r,i){t=!!o(e(i))&&t}),t}e.fn.djValidator=function(r,t){if(!r)return this.filter("form").each(function(){var r=e(this);r.attr("novalidate","novalidate"),r.submit(function(){return s(r)})});switch(r){case"validate":if(this.length>1)throw new Error("The 'validate' option requires the selection of a single form, there are "+this.length+" selected.");return s(e(this));case"callback":return this.filter("form").each(function(){var r=e(this);r.attr("novalidate","novalidate"),r.submit(function(){if(1==s(r)){if(!t)throw new Error("The 'callback' mode requires a function as second parameter.");t(r)}return!1})});case"clean":return this.filter("form").each(function(){f(e(this))});case"field":return e(this).parent().find(".dj-validator-msg").remove(),o(e(this));default:throw new Error("Invalid mode for DjValidator.")}},e.addDjValidator=function(e,i,a){r.push(e),t.push(function(e,r){return 0!=a(e,r)||(l(e,i),!1)})},e.setDjValidatorStyle=function(e){a=e||"display:none; color:red; text-align:inherit; font:.9em fantasy bold italic;"},e.setDjValidatorLabels=function(e){n=e}}(jQuery);