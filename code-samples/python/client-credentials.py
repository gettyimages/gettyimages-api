import requests

url = "https://api.gettyimages.com/oauth2/token"
api_key = "YOUR_API_KEY"
api_secret = "YOUR_API_SECRET"

payload = f"grant_type=client_credentials&client_id={api_key}&client_secret={api_secret}"
headers = {'content-type': 'application/x-www-form-urlencoded'}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
