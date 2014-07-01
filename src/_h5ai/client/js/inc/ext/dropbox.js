modulejs.define('ext/dropbox', ['_', '$', 'core/settings', 'core/location', 'core/server', 'core/event'], function (_, $, allsettings, location, server, event) {

	var settings = _.extend({
			enabled: false,
			maxfiles: 5,
			maxfilesize: 20
		}, allsettings.dropbox),

		template = '<ul id="uploads"/>',

		uploadTemplate = '<li class="upload clearfix">' +
							'<span class="name"/>' +
							'<span class="size"/>' +
							'<div class="progress"><div class="bar"/></div>' +
						'</li>',

		data = {
			action: 'upload',
			href: ''
		},

		init = function () {

			if (!settings.enabled || !server.api) {
				return;
			}

			var $content = $('#content').append(template);

			var uploads = {},
				afterUpload = function (err, file) {
					if (file) {
						if(!uploads[file.name]) {
							uploads[file.name] = $(uploadTemplate).appendTo('#uploads')
							.find('.name').text(file.name).end()
							.find('.size').text(file.size).end()
							.find('.progress .bar').css('width', 0).end();
						}
						uploads[file.name]
							.addClass(err ? 'error' : 'finished')
							.find('.progress').replaceWith(err ? '<span class="error">' + err + '</span>' : '<span class="finished">okay</span>');

						setTimeout(function () {
							uploads[file.name].slideUp(400, function () {

								uploads[file.name].remove();
								delete uploads[file.name];
							});
						}, 5000);
					}
				};

			event.sub('ready', function () {

				// $content.filedrop({
				$('html').filedrop({

					paramname: 'userfile',
					allowedfiletypes: settings.allowedfiletypes,
					allowedfileextensions: settings.allowedfileextensions,
					maxfiles: settings.maxfiles,
					maxfilesize: settings.maxfilesize,
					url: location.getAbsHref(),
					data: data,

					docEnter: function () {

						$content.addClass('hint');
					},

					docLeave: function () {

						$content.removeClass('hint');
					},

					dragOver: function () {

						$content.addClass('match');
					},

					dragLeave: function () {

						$content.removeClass('match');
					},

					drop: function () {

						if(!allsettings['security']['CRUD']) {
							var CRUD_pass = allsettings['security']['CRUD_pass'];
							var pass = prompt('Enter CRUD password:', pass);	// Podaj hasło:
							if (pass && md5(pass) == CRUD_pass) {
								$content.removeClass('hint match');
							}
							else 
								alert ('Wrong password');	// Bledne hasło
						}
						else 
						{	
							$content.removeClass('hint match');
						}					
/*					
						var password = prompt('Podaj hasło','');
						if( md5(password) != md5('pass') ) {
							alert('Błędne hasło');
							return false;
						}
						else 
							$content.removeClass('hint match');
*/							
					},


					beforeEach: function (file) {

						uploads[file.name] = $(uploadTemplate).appendTo('#uploads')
							.find('.name').text(file.name).end()
							.find('.size').text(file.size).end()
							.find('.progress .bar').css('width', 0).end();
					},

					progressUpdated: function (i, file, progress) {

						uploads[file.name].find('.progress .bar').css('width', '' + progress + '%');
					},

					uploadFinished: function (i, file, response) {

						afterUpload(response.code && response.msg, file);
					},

					afterAll: function () {

						location.refresh();
					},

					error: function (err, file) {

						afterUpload(err, file);
					}
				});
			});

			event.sub('location.changed', function (item) {

				// $('#uploads').empty();
				data.href = item.absHref;
			});
		};

	init();
});
