import requests
import json
import shutil
import re


api_key = "YOUR_API_KEY"
api_secret = "YOUR_API_SECRET"
username = "YOUR_USERNAME"
password = "YOUR_PASSWORD"
image_id = "95744047"


def get_resource_owner_token(key, secret, user, passwd):
    """Get an access token using resource owner grant"""
    url = "https://api.gettyimages.com/v4/oauth2/token"
    payload = f"grant_type=password&client_id={key}&client_secret={secret}&username={user}&password={passwd}"
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    response = requests.request("POST", url, data=payload, headers=headers)
    auth = json.loads(response.content)
    return auth

def get_download_url(id, auth):
    """Get a download image url given an image id and oauth token"""
    url = f"https://api.gettyimages.com/v3/downloads/images/{id}?auto_download=false"
    headers = {
        "Api-Key": auth["api_key"],
        "Authorization": "Bearer " + auth["access_token"]
    }
    response = requests.request("POST", url, headers=headers)
    return response

def download_image(url):
    """Download an image given the url"""
    response = requests.get(url, stream=True)
    content_disposition = response.headers["content-disposition"]
    match = re.search(".*filename=?(\S*)", content_disposition)
    if match:
        filename = match.group(1)
    else:
        filename = "image.jpg"

    with open(filename, "wb") as out_file:
        shutil.copyfileobj(response.raw, out_file)
    del response
    return filename

auth = get_resource_owner_token(api_key, api_secret, username, password)
auth["api_key"] = api_key
download_response = get_download_url(image_id, auth)
url = json.loads(download_response.content)["uri"]
filename = download_image(url)

print(filename)
