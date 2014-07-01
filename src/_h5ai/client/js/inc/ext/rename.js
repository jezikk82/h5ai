	modulejs.define('ext/rename', ['_', '$', 'core/settings', 'core/event', 'core/resource', 'core/location', 'core/server'], function (_, $, allsettings, event, resource, location, server) {

		var settings = _.extend({
				enabled: false
			}, allsettings['rename']),

			renameBtnTemplate = '<li id="rename">' +
										'<a href="#">' +
											'<img src="' + resource.image('rename') + '" alt="rename"/>' +
											'<span class="l10n-rename"/>' +
										'</a>' +
									'</li>',

			selectedHrefsStr = '',
			$rename, $img,

			failed = function () {

				$rename.addClass('failed');
				setTimeout(function () {
					$rename.removeClass('failed');
				}, 1000);
			},

			handleResponse = function (json) {

				$rename.removeClass('current');
				$img.attr('src', resource.image('rename'));

				if (!json || json.code) {
					failed();
				}
				location.refresh();
			},

			requestRename = function (hrefsStr) {

				$rename.addClass('current');
				$img.attr('src', resource.image('loading'));

				//console.log(hrefsStr);
				// http://jsfiddle.net/
				var lastPart = '';
				var parts = hrefsStr.split('/');
				var parts_pop = parts.pop();
				//console.log(parts);
				//console.log(parts_pop);

				lastPart = parts_pop == '' ? parts[parts.length - 1] : parts_pop;
				//console.log("Final: " + lastPart);
				console.log(allsettings['security']['CRUD']);
				var newname = prompt('New name: ', lastPart); 	// Nowa nazwa
				console.log(newname);
				
				if(allsettings['security']['CRUD'] && newname && newname != lastPart) {
					server.request({action: 'rename', href: hrefsStr, name: newname}, handleResponse);
				}
				else if(!allsettings['security']['CRUD'] && newname && newname != lastPart) {
					var CRUD_pass = allsettings['security']['CRUD_pass'];
					var pass = prompt('Enter CRUD password:', pass);	// Podaj hasło:
					if (pass && md5(pass) == CRUD_pass) {
						server.request({action: 'rename', href: hrefsStr, name: newname}, handleResponse);
					}
					else 
						alert('Wrong password'); 	// Błędne hasło
				}
				else {
					$img.attr('src', resource.image('rename'));
					return;
				}
				
				/*
				if (newname) {
					server.request({action: 'rename', href: hrefsStr, name: newname}, handleResponse);
				}
				*/
			},

			onSelection = function (items) {

				selectedHrefsStr = '';
				if (items.length == 1) {
					selectedHrefsStr = _.map(items, function (item) {

						return item.absHref;
					}).join('|:|');
					$rename.appendTo('#navbar').show();
				} else {
					$rename.hide();
				}
			},

			init = function () {

				if (!settings.enabled || !server.api) {
					return;
				}

				$rename = $(renameBtnTemplate)
					.find('a').on('click', function (event) {

						event.preventDefault();
						requestRename(selectedHrefsStr);
					}).end()
					.appendTo('#navbar');
				$img = $rename.find('img');

				event.sub('selection', onSelection);
			};

		init();
	});