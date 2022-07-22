import requests
import json

api_key = "YOUR_API_KEY"
api_secret = "YOUR_API_SECRET"

# This script requires Python 3.6+ because it uses string interpolation

def search_for_creative_images(phrase, orientations, number_of_people, oauth):
        """Search for creative images given a search phrase and some filters"""
        url = "https://api.gettyimages.com/v3/search/images/creative"
        query_params = {"phrase": phrase, "orientations": orientations, "number_of_people": number_of_people}  
        headers = {
            "Api-Key": oauth["api_key"],
            "Authorization": f"Bearer {oauth['access_token']}"
        }
        response = requests.get(url, params=query_params, headers=headers)
        return response

def get_client_credentials_token(key, secret):
    """Get an access token using client credentials grant"""
    url = "https://api.gettyimages.com/v4/oauth2/token"
    payload = f"grant_type=client_credentials&client_id={key}&client_secret={secret}"
    headers = {"content-type": "application/x-www-form-urlencoded"}
    response = requests.request("POST", url, data=payload, headers=headers)
    oauth = json.loads(response.content)
    return oauth



oauth = get_client_credentials_token(api_key, api_secret)
oauth["api_key"] = api_key
search_response = search_for_creative_images("office workers", "square,vertical", 3, oauth)
print(search_response.text)
