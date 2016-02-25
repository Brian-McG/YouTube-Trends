from googleapiclient.discovery import build  # pip install google-api-python-client
from googleapiclient.errors import HttpError  # pip install google-api-python-client
from oauth2client.tools import argparser  # pip install oauth2client
import time
import pprint
import sys
import json
import datetime

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

videos = {}
# Add each result to the appropriate list, and then display the lists of
# matching videos.
# Filter out channels, and playlists.
for search_result in search_response.get("items", []):
    if search_result["id"]["kind"] == "youtube#video":
        videos[search_result["id"]["videoId"]] = search_result["snippet"]["title"]

# Fetches video metadata
video_id = ','.join(videos.keys())
videos_list_response = youtube.videos().list(
    id=video_id,
    regionCode=REGION,
    part='contentDetails, id, liveStreamingDetails, localizations, player, recordingDetails, snippet, statistics, status, topicDetails'
).execute()

# Convert categoryID to a textual description
for item in videos_list_response["items"]:
    for category in categories["items"]:
        if item["snippet"]["categoryId"] == category["id"]:
            item["snippet"]["categoryId"] = category["snippet"]["title"]
            break

#pp.pprint(videos_list_response)

# Fetch all the comments for a given video
comments = []
next_page_token = None
counter = 0
while next_page_token is not None or counter == 0:
    counter += 1
    comment_list_response = None
    keep_trying = True
    while keep_trying:
        try:
            comment_list_response = youtube.commentThreads().list(
                part="id, snippet",
                videoId=video_id,
                pageToken=next_page_token,
                maxResults=100,
                order="time",
                textFormat="plainText"
            ).execute()
            keep_trying = False
        except Exception as e:
            sys.stdout.write("Exception occurred: ")
            sys.stdout.flush()
            print(e)

    next_page_token = comment_list_response.get("nextPageToken")
    comments.extend(comment_list_response["items"])
    print(len(comments))

filename = "Comments_{0}.txt".format(time.strftime("%Y-%m-%d-%H-%M-%S", time.localtime()))
print("Writing comments to {0}".format(filename))
with open(filename, 'wb') as outfile:
    json.dump(comments, outfile)
