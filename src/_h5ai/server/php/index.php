<?php



/*********************************************************************
  SHA1 hash of the info page password, the preset password is the
  empty string. You might change it to keep this information private.
  Online hash generator: http://www.sha1.cz/
*********************************************************************/
define("PASSHASH", "da39a3ee5e6b4b0d3255bfef95601890afd80709");



function normalized_require_once($lib) {

	require_once(preg_replace("#\\\\+|/+#", "/", dirname(__FILE__) . "/inc/${lib}.php"));
}

normalized_require_once("util");
normalized_require_once("setup");
normalized_require_once("class-api");
normalized_require_once("class-app");
normalized_require_once("class-archive");
normalized_require_once("class-item");
normalized_require_once("class-thumb");
normalized_require_once("class-image");

setup();
$app = new App();
$options = $app->get_options();
if ($options["security"]["enabled"] &&
	( !isset($_SERVER['PHP_AUTH_USER'])
	|| !isset($_SERVER['PHP_AUTH_PW'])
	|| ($_SERVER['PHP_AUTH_USER'] !== $options["security"]["login"])
	|| (md5($_SERVER['PHP_AUTH_PW']) !== $options["security"]["password"])
	|| !(empty($options["security"]["allowedips"]) || in_array($_SERVER['REMOTE_ADDR'], $options["security"]["allowedips"]))
        )
) {

	header('WWW-Authenticate: Basic realm='.$options["security"]["message"]);
	header('HTTP/1.0 401 Unauthorized');
	exit;
}
else if (has_request_param("action")) {

	header("Content-type: application/json;charset=utf-8");
	$api = new Api($app);
	$api->apply();

} else {

	header("Content-type: text/html;charset=utf-8");
	define("FALLBACK", $app->get_fallback());
	normalized_require_once("page");
}
