<?php

// Performs a creative image search and writes out HTML to display
// the results with links to the detail pages on either
// iStockPhoto.com or gettyimages.com

// key info
// your API key
$api_key = "";

// your API secret
$api_secret = "";

// request options
// search phrase
$phrase = "lake geneva";

// istockphoto or gettyimages
$site = "istockphoto";

// 1 - 100
$page_size = 50;

// best_match, most_popular, newest or random
$sort_order = "best_match";

// The set of fields to return in the results
// Valid image sizes specified in fields are thumb, preview and comp (in order from smallest to largest)
$fields = "id,title,thumb,referral_destinations";

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.gettyimages.com/oauth2/token",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "grant_type=client_credentials&client_id=" . $api_key . "&client_secret=". $api_secret,
    CURLOPT_HTTPHEADER => array(
        "Cache-Control: no-cache",
        "Content-Type: application/x-www-form-urlencoded"
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
      echo "cURL Error #:" . $err;
      exit;
}

$token_response = json_decode($response, true);
$access_token = $token_response["access_token"];

$curl = curl_init();
$fields = urlencode($fields);
$phrase = urlencode($phrase);
$url = "https://api.gettyimages.com/v3/search/images/creative?fields={$fields}&phrase={$phrase}&page_size={$page_size}&sort_order={$sort_order}";
curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      "Api-Key: " . $api_key,
      "Authorization: Bearer " . $access_token
    )
  ));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
    exit;
}

$search_response = json_decode($response, true);
$images = $search_response["images"];

for ($i = 0; $i < count($images); $i++) {
    $image = $images[$i];
    $uri = get_referral_link($image["referral_destinations"], $site);
    echo "<a href=\"{$uri}\" target=\"_blank\"><img src=\"{$image["display_sizes"][0]["uri"]}\" alt=\"{$image["title"]}\"></a>";
}

function get_referral_link($items, $site)
{
    for ($i=0; $i < count($items); $i++) {
        if ($items[$i]["site_name"] == $site) {
            return $items[$i]["uri"];
        }
    }
}
?>
