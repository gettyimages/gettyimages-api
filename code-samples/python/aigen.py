import requests
import json

api_key = "YOUR_API_KEY"
api_secret = "YOUR_API_SECRET"

def gen_image(oauth):
        """Generate an image using AI"""
        url = "https://api.gettyimages.com/v3/ai/image-generations"
        headers = {
            "Api-Key": oauth["api_key"],
            "Authorization": f"Bearer {oauth['access_token']}",
            "content-type": "application/json"
        }
        payload = {
                    "prompt": "Person hiking in the woods",
                    "negative_prompt": "bad quality",
                    "aspect_ratio": "1:1",
                    "media_type": "photography",
                    "mood": "warm",
                    "lens_type": "telephoto",
                    "depth_of_field": "deep"
                }
        response = requests.request("POST", url, json=payload, headers=headers, verify=False)
        return response

def get_client_credentials_token(key, secret):
    """Get an access token using client credentials grant"""
    url = "https://authentication.gettyimages.com/oauth2/token"
    payload = f"grant_type=client_credentials&client_id={key}&client_secret={secret}"
    headers = {"content-type": "application/x-www-form-urlencoded"}
    response = requests.request("POST", url, data=payload, headers=headers, verify=False)
    oauth = json.loads(response.content)
    return oauth

oauth = get_client_credentials_token(api_key, api_secret)
oauth["api_key"] = api_key
response = gen_image(oauth)
response = json.loads(response.content)
print(response)