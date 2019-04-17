import requests
import json

api_key = "YOUR_API_KEY"
api_secret = "YOUR_API_SECRET"

def search_for_creative_images(phrase, oauth):
        """Search for creative images given a search phrase"""
        url = "https://api.gettyimages.com/v3/search/images/creative?phrase=" + \
            phrase
        headers = {
            "Api-Key": oauth["api_key"],
            "Authorization": "Bearer " + oauth["access_token"]
        }
        response = requests.request("GET", url, headers=headers)
        return response

def get_client_credentials_token(key, secret):
    """Get an access token using client credentials grant"""
    url = "https://api.gettyimages.com/oauth2/token"
    payload = f"grant_type=client_credentials&client_id={key}&client_secret={secret}"
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    response = requests.request("POST", url, data=payload, headers=headers)
    oauth = json.loads(response.content)
    return oauth



oauth = get_client_credentials_token(api_key, api_secret)
oauth["api_key"] = api_key
search_response = search_for_creative_images("trees", oauth)
print(search_response.text)
