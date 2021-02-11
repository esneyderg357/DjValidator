# DjValidator -	jQuery form validation plugin

Version 2.0.0

THE SIMPLEST WEB FORMS VALIDATION JQUERY PLUGIN!

DjValidator is the most simple, flexible and quick to use jquery plugin for web form validation, it does not depend on any UI framework.
Available in English and Spanish.

## Features

- Only requires Jquery, 1.5.1 or higher, it does not depend on any UI framework.
- The validation rules are placed using a single "data-dj-validator" attribute, it also recognizes the "required" attribute for validate required fields.
- All customization options: style, messagess and validations.
- Compact and fast write multifunctional validation rules set.
- Different ways to execute validation.
- Supports server validation (asynchronous).
- 22 validation rules available.
- You can create your own validators using 3 different alternatives.
- Validation rules can be changed dynamically.
- Change the style of validation messages.

[SHOW DEMO HERE!!!](https://esneyderg357.github.io/DjValidator-docs/v2/en/demo.html)

## Using the plugin

You can find full documentation and examples on https://esneyderg357.github.io/DjValidator-docs
You can find more examples on DjValidator download.

### Install the pulgin

Add jquery and djValidator scripts in your html file:

	<script type="text/javascript" src="../lib/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="../dist/DjValidator.js"></script>
	
[SHOW THE FULL REFERENCE](https://esneyderg357.github.io/DjValidator-docs)

### Add validation rules:

* Add validation rules on field forms (data-dj-validator), 'required' attribute is valid:
			
			<input name="input1" type="text" data-dj-validator="atext,3,12" required>
  
[FULL RULES REFERENCE](https://esneyderg357.github.io/DjValidator-docs/v2/en/validators.html)

### Use one of these validation modes:
	
			//attach to submit event (default)
			$('#form').djValidator();						
			
			//validation is executed immediately as a function, returns true or false according to result:
			var resp=$('#form').djValidator({mode:’function’});
			
			//validate only a field
			var resp=$('#input').djValidator(); 	
			
			//erase validation messages:
			$(“#my-form”).djValidator({mode:”clean”});
			
			//active field by field validation:
			$(“#my-form”).djValidator({mode:”blur”});

[API REFERENCE](https://esneyderg357.github.io/DjValidator-docs/v2/en/how_to_use.html)

## Perzonalization:

[Personalization guide](https://esneyderg357.github.io/DjValidator-docs/v2/en/personalization.html)

### Change validation message:
	
	<input name="user" required data-dj-validator-msg="Please fill the user!">

### Change validation messages style:
	
	//Personalization options:
	$(“#my-form”).djValidator({
			style:'display:none; color:red; text-align:inherit; font:italic bold .9em sans-serif',
			template:'<p class="dj-validator-msg" style="$style">$msg</p>'
			decorate: true,
			border_color: 'red'
	});

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

  + [Demo](https://esneyderg357.github.io/DjValidator-docs/v2/en/demo.html)
  + [Full documentation](https://esneyderg357.github.io/DjValidator-docs)
  + [How to use](https://esneyderg357.github.io/DjValidator-docs/v2/en/how_to_use.html)
  + [Validators reference](https://esneyderg357.github.io/DjValidator-docs/v2/en/validators.html)
  + [Server validation](https://esneyderg357.github.io/DjValidator-docs/v2/en/server_validation.html)
  + [Personalization](https://esneyderg357.github.io/DjValidator-docs/v2/en/personalization.html)
  + [Label reference](https://esneyderg357.github.io/DjValidator-docs/v2/en/labels.html)

## Author

The DjValidator jquery plugin was written by David Esneyder Jerez Garnica.
[Email](mailto:esneyderg357@gmail.com)

## License

Copyright (c) 2021 David Esneyder Jerez Garnica.
Released under the GPL v3 license.
