/*jslint  browser: true, white: true, plusplus: true */
/*global $: true */

var event = new Event('keyup');

var onselect = function (selector,data,c) {
	var txtbox = document.getElementById(selector);
	var str = txtbox.value;
	var i = str.lastIndexOf(c);
	var vlaue = c;
	while(str.charAt(i) !=' ' && i<str.length){
		i++;
		vlaue+=str.charAt(i);
	}
	data = data.replace(/\s/g,'');
	var res = str.replace(vlaue,c+data);
	//console.log(res);
	txtbox.value = res;
}

var selected = '';

$(function () {
    'use strict';

    // Load countries then initialize plugin:
    $.ajax({
        url: 'content/countries.txt',
        dataType: 'json'
    }).done(function (source) {

        var countriesArray = $.map(source, function (value, key) { return { value: value, data: key }; }),
            countries = $.map(source, function (value) { return value; });

        // Setup jQuery ajax mock:
        $.mockjax({
            url: '*',
            responseTime:  200,
            response: function (settings) {
                var query = settings.data.query,
                    queryLowerCase = query.toLowerCase(),
                    suggestions = $.grep(countries, function(country) {
                         return country.toLowerCase().indexOf(queryLowerCase) !== -1;
                    }),
                    response = {
                        query: query,
                        suggestions: suggestions
                    };

                this.responseText = JSON.stringify(response);
            }
        });

        // Initialize ajax autocomplete:
        $('#autocomplete-ajax').autocomplete({
            serviceUrl: '/autosuggest/service/url',
            onSelect: function(suggestion) {
                $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
            }
        });

        // Initialize autocomplete with local lookup:
        $('.content').on('keyup',function(){
        		var ele = this;
        		selected =this.getAttribute('id');
        		var str = document.getElementById(selected).value;
        		var datais = ele.getAttribute('data');
        		datais = datais.split(' ');
        		var attheratefunc = datais[1];
        		var hashfunc = datais[0];        		
        		var imp = document.getElementById(hashfunc);
        		
        		var c = '#',d='@';
        		var pos = str.lastIndexOf(c)+1;
        		if(pos > 0 ){
        			var i=pos;
        			while(i<str.length){
        				i++;
        				if(str.charAt(i) == ' ');{
        					imp.value='';
        					imp.dispatchEvent(event);
        				}
        			}
        			//console.log(str.substring(pos,i));
        			var val = str.substring(pos,i);
        			var chek = val.indexOf(' ');
        			if(chek == -1){
        				imp.value = val;
        			}
        			else{
        				imp.value = '';
        			}
        			//console.log(selected+' '+dataList);
        			//console.log(listEle);
        			imp.dispatchEvent(event);
        		}
        		pos = str.lastIndexOf(d)+1;
        		imp = document.getElementById(attheratefunc);
        		if(pos > 0 ){
        			var i=pos;
        			while(i<str.length){
        				i++;
        				if(str.charAt(i) == ' ');{
        					imp.value='';
        					imp.dispatchEvent(event);
        				}
        			}
        			//console.log(str.substring(pos,i));
        			var val = str.substring(pos,i);
        			var chek = val.indexOf(' ');
        			if(chek == -1){
        				imp.value = val;
        			}
        			else{
        				imp.value = '';
        			}
        			//console.log(selected+' '+dataList);
        			//console.log(listEle);
        			imp.dispatchEvent(event);
        		}
        })
        
        $('#hashlist').autocomplete({
            lookup: countriesArray,
            appendTo:'#list1',
            onSelect: function (suggestion) {
                //$('#selection').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
                onselect(selected,suggestion.value,'#');
            }
        });
        
          $('#atlist').autocomplete({
            lookup: countriesArray,
            appendTo:'#list1',
            onSelect: function (suggestion) {
                //$('#selection').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
                onselect(selected,suggestion.value,'@');
            }
        });

        // Initialize autocomplete with custom appendTo:
        $('#autocomplete-custom-append').autocomplete({
            lookup: countriesArray,
            appendTo: '#suggestions-container'
        });
        
    });

});