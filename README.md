# h5ai
**h5ai** is a modern HTTP web server index for Apache httpd, lighttpd, nginx and Cherokee with basic file manipulation CRUD (create folder, upload, rename and delete files).

The preferred way to report a bug or make a feature request is to create [a new issue](https://github.com/lrsjng/h5ai/issues/new) on GitHub!


## Download production version

You'll find a preprocessed package, as well as detailed installation
instructions on the [project page](http://larsjung.de/h5ai/).

**if You are looking for my mod with added CRUD (create folder, upload, rename and delete) [download it from my dropbox](https://www.dropbox.com/sh/ex72wbonqmnc1nr/AACgCIEKOly_NO5LopQui_5Ta)**

## Install

**Note:** please don't use files from the `src` folder for installation,
they need to be preprocessed to work correctly!

**Requires PHP 5.3+**

Copy folder `_h5ai` to the document root directory of the web server and visit `http://YOUR-DOMAIN.TLD/_h5ai/`. This page shows some hints on the server's capabilities.

Add `/_h5ai/server/php/index.php` (**note the leading slash!**) to the end of the default index-file list. In this way h5ai will manage all directories that don't have a valid index file.


Examples of the second step for all tested web servers:

* Apache httpd 2.2/2.4: in `httpd.conf` or in any directory's `.htaccess` file set for example:

    ```DirectoryIndex  index.html  index.php  /_h5ai/server/php/index.php```

* nginx 1.2: in `nginx.conf` set for example:

    ```index  index.html  index.php  /_h5ai/server/php/index.php;```

### Hints

if no icons are displayed, chances are that you have to add the SVG mime-type to your server
on Ubuntu servers you might need to install an additional package for PHP JSON support

### Important!

Please note that **h5ai** does not work with aliased folders (as available in Apache httpd). Aliased folders make it impossible to map URLs to file system folders. **Actually any web server specific things aren't supported. That includes access restrictions!** Best chance to make restricted areas work and secure might be to place folder `_h5ai` completely inside that resticted area. Use on your own risk.

## Configuration

The main configuration file is `_h5ai/conf/options.json`. You might want to adjust some of the documented settings. But there are some more files in the `_h5ai/conf` folder you might have a look at.


## Build

But if you want to build **h5ai** yourself you need to install the build tool [node.js](http://nodejs.org/) and  [fQuery](http://larsjung.de/fquery/) **Important: fQuery won't work on Windows.**

* First:
```
    npm install -g fquery
```
This will install fQuery and its command line tool `makejs`. Run `makejs --help` to see if everything
worked fine. 

* To clone and build the project run the following commands.
You'll find a new directory `build` including a fresh zipball.
```
    git clone git://github.com/jezikk82/h5ai.git
    cd h5ai
    makejs release
```

## License

**h5ai** is provided under the terms of the [MIT License](https://github.com/lrsjng/h5ai/blob/develop/LICENSE.md).

It profits from these great projects:
[Evolvere Icon Theme](http://franksouza183.deviantart.com/art/Evolvere-Icon-theme-440718295)&nbsp;(CC BY-NC-ND 3.0),
[Faenza Icons](http://tiheum.deviantart.com/art/Faenza-Icons-173323228)&nbsp;(GPL),
[Gnome Symbolic Icon Theme](https://git.gnome.org/browse/gnome-icon-theme-symbolic/)&nbsp;(CC BY-SA 3.0),
[HTML5 ★ Boilerplate](http://html5boilerplate.com)&nbsp;(MIT),
[jQuery](http://jquery.com)&nbsp;(MIT),
[jQuery.fracs](http://larsjung.de/fracs/)&nbsp;(MIT),
[jQuery.mousewheel](https://github.com/brandonaaron/jquery-mousewheel)&nbsp;(MIT),
[jQuery.qrcode](http://larsjung.de/qrcode/)&nbsp;(MIT),
[jQuery.scrollpanel](http://larsjung.de/scrollpanel/)&nbsp;(MIT),
[markdown-js](https://github.com/evilstreak/markdown-js)&nbsp;(MIT),
[Modernizr](http://www.modernizr.com)&nbsp;(MIT/BSD),
[modulejs](http://larsjung.de/modulejs/)&nbsp;(MIT),
[Moment.js](http://momentjs.com)&nbsp;(MIT),
[SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/)&nbsp;(MIT/GPL),
[Underscore.js](http://underscorejs.org)&nbsp;(MIT)
