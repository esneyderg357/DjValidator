# DjValidator	-	jQuery form validation plugin

Version 1.1.0

THE SIMPLEST WEB FORMS VALIDATION JQUERY PLUGIN!

DjValidator is the jquery plugin for validating web forms, simpler, faster to use and flexible, it does not depend on any UI framework.
Available in English and Spanish.

## Using the plugin

You can find full examples on folder from DjValidator download.

### Install the pulgin

Add jquery and djValidator scripts in your html file:

	<script type="text/javascript" src="../lib/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="../dist/DjValidator.js"></script>
	
Full Reference: http://djvalidator.blogspot.com/2017/04/djvalidator.html

### Add validation rules:

* Add the 'novalidate' attribute to disable browser validation.
* Add validation rules on field forms (data-dj-validator), 'required' attribute is valid:
			
			<input name="input1" type="text" data-dj-validator="atext,3,12" required>
  
Rules reference: http://djvalidator.blogspot.com/2017/04/validators-reference.html

### Use one of these validation modes:
	
			//attach to submit event:
			$('#form').djValidator(); 
			
			//call a function when form is valid, no submit event:
			$('#form').djValidator('callback',function($form){
				alert("Callback executed when the form is valid.");
			});									
			
			//validate form and return true or false, no submit event:
			var resp=$('#form').djValidator('validate');
			alert("only validate form: "+resp);
			
			//validate only a field:
			var resp=$('#input1').djValidator('field')
			alert("only validate a field: "+resp);
			
			//erase validation messages:
			$('#form').djValidator('clean');

API reference: http://djvalidator.blogspot.com/2017/04/api-reference.html

## Perzonalization:

### Change validation message:
	
	<input name="user" required data-dj-validator-msg="Please fill the user!">

### Change validation messages style:
	
	$.setDjValidatorStyle('display:none; text-align:center; color:white; background-color:red;');

### Add own validations:
	
With regular expressions:
	
	<input name="textinput" type="text" data-dj-validator="regexp,^[aeiou]+$,i" required>

With own functions:
	
	<input name="textinput" type="text" data-dj-validator="call,isUpperCase" required>
	
	function isUpperCase($field){
			value=$field.val();
			if(value==value.toUpperCase())return true;
			return false;
		}

Adding a new rule:

	<input name="textinput" type="text" data-dj-validator="even,10" required>
	
	$.addDjValidator('even','only even numbers.',function($field,args){
			value=parseInt($field.val());
			max=args[1];
			if(value%2!=1||value>max)return false;
			return true;
		});

## Documentation

  + [Installation and use](http://djvalidator.blogspot.com/2017/04/djvalidator.html)
  + [API](http://djvalidator.blogspot.com/2017/04/api-reference.html)
  + [Validators reference](http://djvalidator.blogspot.com/2017/04/validators-reference.html)

## Author

The DjValidator jquery plugin is written by David Esneyder Jerez Garnica.
[Email](mailto:esneyderg357@gmail.com)

## License

Copyright (c) 2018 David Esneyder Jerez Garnica.
Released under the GPL v3 license.
