from googleapiclient.discovery import build  # pip install google-api-python-client
from googleapiclient.errors import HttpError  # pip install google-api-python-client
from oauth2client.tools import argparser  # pip install oauth2client
import pprint

# Set DEVELOPER_KEY to the API key value from the APIs & auth > Registered apps
# tab of
# https://cloud.google.com/console
# Please ensure that you have enabled the YouTube Data API for your project.

with open('google_api_key.txt', 'r') as api_key_file:
    DEVELOPER_KEY = api_key_file.read().replace('\n', '')

YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
REGION = "ZA"

pp = pprint.PrettyPrinter(indent=4)

# change the default to the search term to search
argparser.add_argument("--q", help="Search term", default="gangnam style")

# default number of results which are returned. It can very from 0 - 100
argparser.add_argument("--max-results", help="Max results", default=1)

args = argparser.parse_args()
options = args
youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)

# Call the search.list method to retrieve results matching the specified
# query term.
search_response = youtube.search().list(
    q=options.q,
    type="video",
    part="id,snippet",
    regionCode=REGION,
    maxResults=options.max_results
).execute()

categories = youtube.videoCategories().list(
    part="id,snippet",
    regionCode=REGION,
).execute()
# pp.pprint(categories)

videos = {}
# Add each result to the appropriate list, and then display the lists of
# matching videos.
# Filter out channels, and playlists.
for search_result in search_response.get("items", []):
    if search_result["id"]["kind"] == "youtube#video":
        videos[search_result["id"]["videoId"]] = search_result["snippet"]["title"]

s = ','.join(videos.keys())
videos_list_response = youtube.videos().list(
    id=s,
    regionCode=REGION,
    part='contentDetails, id, liveStreamingDetails, localizations, player, recordingDetails, snippet, statistics, status, topicDetails'
).execute()

# Convert categoryID to a textual description
for item in videos_list_response["items"]:
    for category in categories["items"]:
        if item["snippet"]["categoryId"] == category["id"]:
            item["snippet"]["categoryId"] = category["snippet"]["title"]
            break

pp.pprint(videos_list_response)
