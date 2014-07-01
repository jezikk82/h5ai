	    modulejs.define('ext/new_folder', ['_', '$', 'core/settings', 'core/event', 'core/resource', 'core/location', 'core/server'], function (_, $, allsettings, event, resource, location, server) {

		var settings = _.extend({
			enabled: false
		    }, allsettings['new_folder']),

		    new_folderBtnTemplate = '<li id="new_folder">' +
						'<a href="#">' +
						    '<img src="' + resource.image('new_folder') + '" alt="new_folder"/>' +
						    '<span class="l10n-new_folder"/>' +
						'</a>' +
					    '</li>',

		    //selectedHrefsStr = '',
		    $new_folder, $img,

		    failed = function () {

			$new_folder.addClass('failed');
			setTimeout(function () {
			    $new_folder.removeClass('failed');
			}, 1000);
		    },

		    handleResponse = function (json) {

			$new_folder.removeClass('current');
			$img.attr('src', resource.image('new_folder'));

			if (!json || json.code) {
			    failed();
			}
			location.refresh();
		    },

		    requestnew_folder = function () {

			$new_folder.addClass('current');
			$img.attr('src', resource.image('loading'));
			//console.log(location, server, resource);
			//console.log(location.getAbsHref());

/*			
				var newname = prompt('Nowy folder', ''); 
				if (newname) {
					server.request({action: 'new_folder', href: location.getAbsHref(), name: newname}, handleResponse);
				}	
*/
				console.log(allsettings['security']['CRUD']);
				var newname = prompt('Nowy folder', ''); 
				if(allsettings['security']['CRUD'] && newname && newname != '') {
					server.request({action: 'new_folder', href: location.getAbsHref(), name: newname}, handleResponse);
				}
				else if(!allsettings['security']['CRUD'] && newname && newname != '') {
					var CRUD_pass = allsettings['security']['CRUD_pass'];
					var pass = prompt('Podaj has³o:', pass);
					if (pass && md5(pass) == CRUD_pass) {
						server.request({action: 'new_folder', href: location.getAbsHref(), name: newname}, handleResponse);
					}
					else 
						alert('B³êdne has³o');
				}
				else {
					$img.attr('src', resource.image('new_folder'));
					return;					
				}
		    },

		    init = function () {

			if (!settings.enabled || !server.api) {
			    return;
			}

			$new_folder = $(new_folderBtnTemplate)
			    .find('a').on('click', function (event) {
				event.preventDefault();
				requestnew_folder();
			    }).end()
			    .appendTo('#navbar');
			$img = $new_folder.find('img');

			//event.sub('selection', onSelection);
		    };

		init();
	    });

