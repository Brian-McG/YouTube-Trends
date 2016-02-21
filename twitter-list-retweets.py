#!/usr/bin/python

#-----------------------------------------------------------------------
# twitter-retweets
#  - print who has retweeted tweets from a given user's timeline
#-----------------------------------------------------------------------

from twitter import *

user = "ideoforms"

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
	count+=1

	#-----------------------------------------------------------------------
	# do a new query: who has RT'd this tweet?
	#-----------------------------------------------------------------------
	retweets = twitter.statuses.retweets._id(_id = result["id"])
	for retweet in retweets:
		countretweets+=1

print "Number of tweets ",count
print "Number of retweets ",countretweets
