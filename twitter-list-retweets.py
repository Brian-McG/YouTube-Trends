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
consumer_key = ""
consumer_secret =""
access_key = ""
access_secret = ""


oauth = OAuth(access_key,access_secret,consumer_key,consumer_secret)
#-----------------------------------------------------------------------
# create twitter API object
#-----------------------------------------------------------------------
twitter = TwitterStream(oauth)

#-----------------------------------------------------------------------
# perform a basic search 
# twitter API docs: https://dev.twitter.com/docs/api/1/get/search
#-----------------------------------------------------------------------
results = twitter.statuses.user_timeline(screen_name = user)

#-----------------------------------------------------------------------
# loop through each of my statuses, and print its content
#-----------------------------------------------------------------------
for status in results:
	print ("@%s %s" % (user, status["text"]))

	#-----------------------------------------------------------------------
	# do a new query: who has RT'd this tweet?
	#-----------------------------------------------------------------------
	retweets = twitter.statuses.retweets._id(_id = status["id"])
	for retweet in retweets:
		print (" - retweeted by %s" % (retweet["user"]["screen_name"]))
