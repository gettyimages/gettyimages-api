import requests
import json

api_key = "YOUR_API_KEY"
api_secret = "YOUR_API_SECRET"
username = "YOUR_USERNAME"
password = "YOUR_PASSWORD"
channel_id = "CHANNEL_ID_WITH_NOTIFICATIONS"


def get_resource_owner_token(key, secret, user, passwd):
    """Get an access token using resource owner grant"""
    url = "https://api.gettyimages.com/oauth2/token"
    payload = f"grant_type=password&client_id={key}&client_secret={secret}&username={user}&password={passwd}"
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    response = requests.request("POST", url, data=payload, headers=headers)
    auth = json.loads(response.content)
    return auth

# This script requires Python 3.6+ because it uses string interpolation

def get_asset_change_notifications(channel_id, auth):
    """Get asset change notifications for a specific channel"""
    url = "https://api.gettyimages.com/v3/asset-changes/change-sets"
    query_params = {"channel_id": channel_id}  
    headers = {
        "Api-Key": auth["api_key"],
        "Authorization": f"Bearer {auth['access_token']}"
    }
    response = requests.put(url, params=query_params, headers=headers)
    asset_change_notifications = json.loads(response.content)
    return asset_change_notifications

def confirm_asset_change_notifications(change_set_id, auth):
    """Confirm asset change notifications for a specific channel"""
    url = f"https://api.gettyimages.com/v3/asset-changes/change-sets/{change_set_id}"
    headers = {
        "Api-Key": auth["api_key"],
        "Authorization": f"Bearer {auth['access_token']}"
    }
    response = requests.delete(url, headers=headers)
    return response


auth = get_resource_owner_token(api_key, api_secret, username, password)
auth["api_key"] = api_key

# Get batch of asset_change_notifications for channel
asset_change_notifications = get_asset_change_notifications(channel_id, auth)
change_set_id = asset_change_notifications["change_set_id"]
changed_assets = asset_change_notifications["changed_assets"]

# Process asset_change_notifications appropriately
# Do something with changed_assets

# Confirm asset_change_notifications have been recieved
confirmation_response = confirm_asset_change_notifications(change_set_id, auth)
print(confirmation_response.status_code)
