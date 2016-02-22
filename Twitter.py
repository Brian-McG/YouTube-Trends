#!/usr/bin/python

#-----------------------------------------------------------------------
# twitter-retweets
#  - print who has retweeted tweets from a given user's timeline
#-----------------------------------------------------------------------

from twitter import *
from datetime import datetime
import re
from email.utils import parsedate
#sets the dates to filter
startdate = datetime(2000,1,1)
enddate = datetime(2016,3,29)

#-----------------------------------------------------------------------
# load our API credentials
#-----------------------------------------------------------------------
config = {}
execfile("config.py", config)
#-----------------------------------------------------------------------
# create twitter API object
#-----------------------------------------------------------------------
twitter = Twitter(
auth = OAuth(config["access_key"], config["access_secret"], config["consumer_key"], config["consumer_secret"]))

#-----------------------------------------------------------------------
# perform a basic search
# twitter API docs: https://dev.twitter.com/docs/api/1/get/search
#-----------------------------------------------------------------------
results = twitter.search.tweets(q = "Gangnam Style")

#-----------------------------------------------------------------------
# loop through each of my statuses, and print its content
#-----------------------------------------------------------------------
count = 0
countretweets = 0
for result in results["statuses"]:
	timestamp = parsedate(result["created_at"])
	timestamp2 = datetime(timestamp[0],timestamp[1],timestamp[2])

	if(timestamp2>=startdate and timestamp2<=enddate):
		count+=1

	#-----------------------------------------------------------------------
	# do a new query: who has RT'd this tweet?
	#-----------------------------------------------------------------------
	retweets = twitter.statuses.retweets._id(_id = result["id"])
	for retweet in retweets:
		countretweets+=1

print "Number of tweets ",count
print "Number of retweets ",countretweets
