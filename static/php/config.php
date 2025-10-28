<?
/*
    site-specific config
*/
$site_title = 'I-n-t-e-r-f-a-c-e';
$head = 'VIS 415';
$site = 'I-n-t-e-r-f-a-c-e';
$home = $head . ", " . $site;
$card_default = '/media/jpg/card-default.jpg';
$logo_src = '/media/jpg/logo.jpg';
$description = 'Hello, w-w-w-orld.';
$site_url = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http';
$site_url .= '://' . $_SERVER['SERVER_NAME'];
$og_locale = 'en_US';
?>
