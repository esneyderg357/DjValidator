/*
 *DjValidator v2.0.0 is a jquery plugin for the validation of web forms, 
 *in a simple, fast and flexible way regardless of the web design framework.
 *
 * Copyright (C) 2021 David Esneyder Jerez Garnica
 * Contact: esneyderg357@gmail.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * See the GNU General Public license <http://www.gnu.org/licenses/gpl-3.0.html>.
 */

if (typeof jQuery==='undefined'){throw new Error('DjValidator requires jQuery 1.5.1 or higher.');}

(function ($){

	var promises=[];
	var djv_keys=['word','atext','antext','text','int','num','dig','file','efile','email','phone','url','regexp','equal','nequal','or','multi','call','radio','check','ip','ajax'];	
	var djv_functions=[vword,vatext,vantext,vtext,vint,vnum,vdig,vfile,vefile,vmail,vphone,vurl,vregexp,vequal,vnequal,vor,vmulti,vcall,vradio,vcheck,vip,vajax];
	var djv_labels={
			required:'Required field.',
			word_min:'At least $1 characters with no spaces.',
			word_between:'Between $1 and $2 characters with no spaces.',
			atext_min:'At least $1 alphabetic characters.',
			atext_between:'Between $1 and $2 alphabetic characters.',
			antext_min:'At least $1 alphabetic characters or digits.',
			antext_between:'Between $1 and $2 alphabetic characters or digits.',
			text_min:'At least $1 characters.',
			text_between:'Between $1 and $2 characters.',
			int_invalid:'Invalid integer.',
			int_min:'The number must be greater than or equal to $1.',
			int_max:'The number must be less than or equal to $1',
			int_between:'The number must be between $1 and $2.',
			num_invalid:'Invalid real number.',
			num_min:'The number must be greater than or equal to $1.',
			num_max:'The number must be less than or equal to $1',
			num_between:'The number must be between $1 and $2.',
			dig_min:'At least $1 digits.',
			dig_between:'Between $1 and $2 digits.',
			file_min:'Select at least $1 files.',
			file_between:'Select between $1 and $2 files.',
			file_format:'Invalid file type.',
			file_min_size:'Files must be larger than $1 kb in size.',
			file_max_size:'Files must be less than $1 kb. in size',
			file_ext:'Valid file extensions: $1.',
			email:'Invalid email.',
			email_max:'Email must be less than $1 characters.',
			phone:'Invalid phone number.',
			url:'Invalid url.',
			url_max:'URL must be less than $1 characters',
			ip:'Invalid $1 address',
			regexp:'Invalid value.',
			or:'$1: At least one of these fields is required.',
			equal:'Must be equal to: $1.',
			not_equal:'Must be different from: $1.',
			multi_min:'Select at least $1 options',
			multi_between:'Select from $1 to $2 options.',
			call:'Invalid value.',
			radio:'Check an option.',
			check_single:'Check this option.',
			check_multi_min:'$1: Check at least $2 options.',
			check_multi_between:'$1: Check from $2 to $3 options.',
			ajax:'Rejected value.',
			ajax_validating:'Field is validating, please wait...',
			ajax_fail:'Error, could not be validated.'
	}
	
	function vreq($obj){
		if($obj.data('dj-validator-group'))return true;
		var value=$obj.val();
		if(value==null||value==""||/^\s+$/.test(value))return false;
		return true;
	}
	
	function vword(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		if(params[2]=="*"){
			if(!new RegExp("^\\S{"+params[1]+",}$").test($obj.val()))
			{createMsg($obj,djv_labels.word_min.replace('$1',params[1]),props);return false;} 
		}
		else if(!new RegExp("^\\S{"+params[1]+","+params[2]+"}$").test($obj.val()))
			{createMsg($obj,djv_labels.word_between.replace('$1',params[1]).replace('$2',params[2]),props);return false;} 
		return true;
		
	}
	
	function vatext(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		if(params[2]=="*"){
			if(!new RegExp("^[a-záéíóúñçü ]{"+params[1]+",}$","i").test($obj.val()))
			{createMsg($obj,djv_labels.atext_min.replace('$1',params[1]),props);return false;} 
		}
		else if(!new RegExp("^[a-záéíóúñçü ]{"+params[1]+","+params[2]+"}$","i").test($obj.val()))
			{createMsg($obj,djv_labels.atext_between.replace('$1',params[1]).replace('$2',params[2]),props);return false;}
		return true;
	}
	
	function vantext(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		if(params[2]=="*"){
			if(!new RegExp("^[a-z0-9áéíóúñçü ]{"+params[1]+",}$","i").test($obj.val()))
			{createMsg($obj,djv_labels.antext_min.replace('$1',params[1]),props);return false;} 
		}
		else if(!new RegExp("^[a-z0-9áéíóúñçü ]{"+params[1]+","+params[2]+"}$","i").test($obj.val()))
			{createMsg($obj,djv_labels.antext_between.replace('$1',params[1]).replace('$2',params[2]),props);return false;}
		return true;
	}
	
	function vtext(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		var value=$obj.val();
		if(params[2]=="*"){
			if(value.length<params[1])
			{createMsg($obj,djv_labels.text_min.replace('$1',params[1]),props);return false;} 
		}
		else if(value.length<params[1]||value.length>params[2])
			{createMsg($obj,djv_labels.text_between.replace('$1',params[1]).replace('$2',params[2]),props);return false;} 
		return true;
	}
	
	function vint(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		var value=$obj.val();
		if(!/^[+-]?\d+$/.test(value)){createMsg($obj,djv_labels.int_invalid,props);return false;}
		if(params[1]=="*"){
			if(params[2]=="*")return true;
			else if(parseInt(value)>params[2]){createMsg($obj,djv_labels.int_max.replace('$1',params[2]),props);return false;} 
		}
		else if(params[2]=="*"){
			if(parseInt(value)<params[1]){createMsg($obj,djv_labels.int_min.replace('$1',params[1]),props);return false;}
		}
		else if(parseInt(value)<params[1]||parseInt(value)>params[2]){
			createMsg($obj,djv_labels.int_between.replace('$1',params[1]).replace('$2',params[2]),props);
			return false;
		}
		return true;
	}
	
	function vnum(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		var value=$obj.val();
		if(isNaN(value)){createMsg($obj,djv_labels.num_invalid,props);return false;}
		if(params[1]=="*"){
			if(params[2]=="*")return true;
			else if(parseFloat(value)>params[2]){createMsg($obj,djv_labels.num_max.replace('$1',params[2]),props);return false;} 
		}
		else if(params[2]=="*"){
			if(parseFloat(value)<params[1]){createMsg($obj,djv_labels.num_min.replace('$1',params[1]),props);return false;}
		}
		else if(parseFloat(value)<params[1]||parseFloat(value)>params[2]){
			createMsg($obj,djv_labels.num_between.replace('$1',params[1]).replace('$2',params[2]),props);
			return false;
		}
		return true;
	}
	
	function vdig(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		var value=$obj.val();
		if(params[2]=="*"){
			if(!new RegExp("^\\d{"+params[1]+",}$").test(value))
			{createMsg($obj,djv_labels.dig_min.replace('$1',params[1]),props);return false;} 
		}
		else if(!new RegExp("^\\d{"+params[1]+","+params[2]+"}$").test(value))
			{createMsg($obj,djv_labels.dig_between.replace('$1',params[1]).replace('$2',params[2]),props);return false;}
		return true;
	}
	
	function vfile(props,$obj,params){
		if(!File){console.error("The 'file' validator requires javascript file api, the field  '"+$obj.attr("name")+"' was ignored.");return true;}
		if(params.length<5)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		var archivos=$obj[0].files;
		if(params[2]=="*"){
			if(archivos.length<params[1])
			{createMsg($obj,djv_labels.file_min.replace('$1',params[1]),props);return false;} 
		}
		else if(archivos.length<params[1]||archivos.length>params[2])
		{createMsg($obj,djv_labels.file_between.replace('$1',params[1]).replace('$2',params[2]),props);return false;}
		if(params[5]){
			var validos=params[5].split('|');
			var ok=validos.length==0?true:false;
			for(i=0;i<archivos.length;i++){
				ok=false;
				for(j=0;j<validos.length;j++){
					if(archivos[i].type==validos[j])ok=true;
				}
				if(!ok)break;
			}
			if(!ok){createMsg($obj,djv_labels.file_format,props);return false;} 
		}
		for(i=0;i<archivos.length;i++){
			if(params[3]!="*"&&(archivos[i].size/1024)<params[3]){createMsg($obj,djv_labels.file_min_size.replace('$1',params[3]),props);return false;}
			if(params[4]!="*"&&(archivos[i].size/1024)>params[4]){createMsg($obj,djv_labels.file_max_size.replace('$1',params[4]),props);return false;}
		}
		return true;
	}
	
	function vefile(props,$obj,params){
		if(params.length<2)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		var value=$obj.val();
		var valid=false;
		var ext=value.substring(value.lastIndexOf(".")+1,value.length).toLowerCase();
		var validos=params[1].split('|');
		for(ifile=0;ifile<validos.length;ifile++)
			if(ext==validos[ifile].toLowerCase()){valid=true;break;}
		if(!valid){
			validas=$obj.data('dj-validator').substring($obj.data('dj-validator').indexOf(",")+1);
			createMsg($obj,djv_labels.file_ext.replace('$1',validas.replace(/\|/g,',')),props);
			return false;
		} 
		return true;
	}
	
	function vmail(props,$obj,params){
		if(params.length<2)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		if(!/^([a-z0-9_.-])+@(([a-z0-9-])+.)+([a-z0-9])+$/i.test($obj.val())){createMsg($obj,djv_labels.email,props);return false;} 
		if(params[1]!='*'&&$obj.val().length>params[1]){createMsg($obj,djv_labels.email_max.replace('$1',params[1]),props);return false;}
		return true;
	}
	
	function vphone(props,$obj){
		if(!/^(\+?[0-9]{2,3}[- ]?)?[0-9]{5,12}$/.test($obj.val())){createMsg($obj,djv_labels.phone,props);return false;}
		return true;
	}
	
	function vurl(props,$obj,params){
		if(params.length<2)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		if(!/^(https?|s?ftp)\:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/.test($obj.val())){createMsg($obj,djv_labels.url,props);return false;}
		if(params[1]!='*'&&$obj.val().length>params[1]){createMsg($obj,djv_labels.url_max.replace('$1',params[1]),props);return false;}
		return true;
	}
	
	function vregexp(props,$obj,params){
		if(params.length<2)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		params[1]=params[1].replace('°',',');
		var ext=params[2]?new RegExp(params[1],params[2]):new RegExp(params[1]);
		if(!ext.test($obj.val())){createMsg($obj,djv_labels.regexp,props);return false;}
		return true;
	}
	
	function vor(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		fs=$('input[data-dj-validator-group='+params[1]+']');
		var valid=false;
		var len=fs.length;
		for(i=0;i<len;i++){
			value=$(fs[i]).val();
			if(value!=null&&value!=""&&!/^\s+$/.test(value))valid=true;
		}
		if(valid==false){createMsg($obj,djv_labels.or.replace('$1',params[2]),props);}
		return valid;
	}
	
	function vequal(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		if($obj.val()!=$('#'+params[1]).val())
		{createMsg($obj,djv_labels.equal.replace('$1',params[2]),props);return false;} 
		return true;
	}
	
	function vnequal(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		if($obj.val()==$('#'+params[1]).val())
		{createMsg($obj,djv_labels.not_equal.replace('$1',params[2]),props);return false;} 
		return true;
	}
	
	function vmulti(props,$obj,params){
		if(params.length<3)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		var valores=[];
		var valores=$obj.val();
		if(params[2]=="*"){
			if(valores.length<parseInt(params[1]))
			{createMsg($obj,djv_labels.multi_min.replace('$1',params[1]),props);return false;}  
		}
		else if(valores.length<parseInt(params[1])||valores.length>parseInt(params[2])){
			createMsg($obj,djv_labels.multi_between.replace('$1',params[1]).replace('$2',params[2]),props);
			return false;
		} 
		return true;
	}
	
	function vcall(props,$obj,params){
		if(params.length<2)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		if(window[params[1]]($obj)==false){createMsg($obj,djv_labels.call,props);return false;} 
		return true;
	}
	
	function vradio(props,$obj){
		var radios=$('input[name='+$obj.attr('name')+']');
		for(i=0;i<radios.length;i++){
			if($(radios[i]).is(':checked'))return true;
		}
		createMsg($obj,djv_labels.radio,props);
		return false;
	}
	
	function vcheck(props,$obj,params){
		if(params[1]){
			var fs=$('input[data-dj-validator-group='+params[1]+']');
			var cs=0;
			for(i=0;i<fs.length;i++)if($(fs[i]).is(':checked'))cs++;
			if(params[3]=="*"){
				if(cs<parseInt(params[2])){
					createMsg($obj,djv_labels.check_multi_min.replace('$1',params[4]).replace('$2',params[2]),props);
					return false;
				}  
			}
			else if(cs<parseInt(params[2])||cs>parseInt(params[3])){
				createMsg($obj,djv_labels.check_multi_between.replace('$1',params[4]).replace('$2',params[2]).replace('$3',params[3]),props);
				return false;
			}
			return true;
		}
		else if(!$obj.is(':checked')){createMsg($obj,djv_labels.check_single,props);return false;}
		return true;
	}
	
	function vip(props,$obj,params){
		var rv6=/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
		var rv4=/^((25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])$/;
		if(!params[1]){if(!rv6.test($obj.val())&&!rv4.test($obj.val())){createMsg($obj,djv_labels.ip.replace('$1','IP'),props);return false;}}
		else if(params[1]=='v6'){if(!rv6.test($obj.val())){createMsg($obj,djv_labels.ip.replace('$1','IPv6'),props);return false;}}
		else if(params[1]=='v4'){if(!rv4.test($obj.val())){createMsg($obj,djv_labels.ip.replace('$1','IPv4'),props);return false;}}
		else throw new Error("Error validating field '"+$obj.attr("name")+"'"+", invalid ip option.");
		return true;
	}
	
	function vajax(props,$obj,params,nopromises){
		if(params.length<2)throw new Error("Error validating field '"+$obj.attr("name")+"'"+", insufficient parameters.");
		createMsg($obj,djv_labels.ajax_validating,props);
		var promise=$.ajax({
	        url: params[1],
	        type: $.fn.djValidator.props.request_method,
	        dataType: "json",
	        data: {value:$obj.val()},
	    }).done(function(resp){
	    	cleanField($obj,props);
	    	if(resp.valid==false){
	    		createMsg($obj,resp.message?r.message:djv_labels.ajax,props);
	    	}
	    }).fail(function() {
	    	cleanField($obj,props);
	    	createMsg($obj,djv_labels.ajax_fail,props);
	    });
		if(!nopromises){
			promises.push(promise);
		}
		return null;
	}
	
	//core functions:
	function createMsg($obj,text,props){
		var custom=$obj.data('dj-validator-msg');
		if(custom)text=custom;
		$new=$(props.template.replace('$style',props.style).replace('$msg',text));
		var type=$obj.attr('type');
		var disp=$obj.is(':visible');
		var group=$obj.data('input-group');
		if((type&&(type=='radio'||type=='checkbox'))||!disp||group){$new.appendTo($obj.parent());}
		else $new.insertAfter($obj);
		if(props.decorate==true)$obj.css('border-color',props.border_color);
		$new.fadeIn(1500);
	}
	
	function cleanField($field,props){
		$field.parent().find(".dj-validator-msg").remove();
		if(props.decorate==true)$field.css('border-color','');
	}
	
	function cleanForm($form,props){
		$form.find(".dj-validator-msg").remove();
		if(props.decorate==true)$form.find(':input').css('border-color','');
	}
	
	function cleanAsync($form){
		promises=[];
	}
	
	function validateField($field,props,nopromises){
		cleanField($field,props);
		var correct=true;
		if(vreq($field)){
			var def=$field.data('dj-validator');
			if(def){
				var validators=def.split("&");
				for (j=0;j<validators.length;j++) {
					var params=validators[j].split(",");
					var n=djv_keys.indexOf(params[0]);
					if(n!=-1){
						prev=djv_functions[n](props,$field,params,nopromises);
						if(prev==null)correct=null;
						else correct=(prev==true?correct:(correct==null?correct:false));
					}
					else throw new Error("'"+params[0]+"' is not a valid DjValidator key.");
				}
			}
		}
		else if($field.attr("required")!=null){createMsg($field,djv_labels.required,props);correct=false;}
		return correct;
	}
	
	function validateAsync($form,status,prop){
		$.when.apply($,promises)
		.done(function(){
			var sync_result=true;
			var responses=arguments;
			if(promises.length==1)sync_result=responses[0].valid;
			else 
				for(i=0;i<promises.length;i++){
			      	sync_result=(responses[i][0].valid==true?sync_result:false);
			    }
		    cleanAsync();
		    if(status==true&&sync_result==true){
		      	prop.success($form);
		    }
		})
		.fail(function(){
			cleanAsync();
		});
	}
	
	function validateForm($form,props){
		var valid=true;
		cleanForm($form,props);
		cleanAsync();
		$form.find(':input').each(function(id,el){
			resp=validateField($(el),props);
			if(id==0&&resp==false)$(el).focus();
			valid=(resp==true?valid:(resp==false?false:valid));
		});
		if(promises.length>0){
			validateAsync($form,valid,props);
			return null;
		}
		return valid;
	}

	function enableBlur($form,prop){
		$form.find(':input').each(function(id,el){
			$(el).blur(function(){
				validateField($(this),prop,true);
			});
		});
	}
	
	//plugin definition:
	$.fn.djValidator=function(options) {
		var prop=$.extend({},$.fn.djValidator.props,options);
		
		//validation mode:
		switch(prop.mode){
			case 'submit':
				return this.each(function(idx,el){
					obj=$(el);
					if(obj.is('form')){
						var $form=obj;
						$form.attr('novalidate','novalidate');
						$form.submit(function(e){
							var result=validateForm($form,prop);
	    	    			if(result==true){
								return prop.success($form);
							}
	    	    			else e.preventDefault();
						});
						if(prop.blur==true){
							enableBlur($form,prop);
						}
					}
					else if(obj.is('input')){
						return validateField(obj,prop,true);
					}
				});
			case 'function':
				$form=$(this);
				if($form.length!=1){
					throw new Error("function mode requires a one form selection.");
				}
				$form.attr('novalidate','novalidate');
				if($form.is('form'))return validateForm($form,prop);
				else return null;
			case 'clean':
				return this.filter('form').each(function(){
	    			cleanForm($(this),prop);
				});
			case 'blur':
				return this.filter('form').each(function(){
	    			enableBlur($(this),prop);
				});
			default:
				throw new Error("Invalid mode for DjValidator, only: submit, function, blur and clean are valid modes.");
		}
		return this;
	}

	//default options:
	$.fn.djValidator.props={
		mode: 'submit',//submit function clean blur
		blur: true,
		decorate: true,
		border_color: 'red',
		style:'display:none; color:red; text-align:inherit; font:italic bold .9em sans-serif',
		template:'<p class="dj-validator-msg" style="$style">$msg</p>',
		request_method: 'post',
		success: function($form){return true;}
	};
	
	//add validator:
	$.fn.djValidator.add=function(key,msg,callback){
		djv_keys.push(key);
		djv_functions.push(function(props,$obj,params){
			if(callback($obj,params)==false){createMsg($obj,msg,props);return false;} 
			return true;
		});
	}
	
	//change labels:
	$.fn.djValidator.setLabels=function(custom_labels){
		djv_labels=$.extend({},djv_labels,custom_labels);
	}
}(jQuery));