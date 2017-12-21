<?php

# Replace these values with your key and secret
$api_key = "YOUR_API_KEY";
$api_secret = "YOUR_API_SECRET";

$phrase = "puppies and kittens";



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
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.gettyimages.com/v3/search/images/creative?phrase=" . urlencode($phrase),
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

echo "Found " . $search_response["result_count"] . " images.\n";
for ($i = 0; $i < count($images); $i++) {
    echo "Image " . $i . " title: " . $images[$i]["title"] . "\n\t" . $images[$i]["display_sizes"][0]["uri"] . "\n\n";
}
?>
