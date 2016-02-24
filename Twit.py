__author__ = 'bryce'
#using twitter search api

from TwitterSearch import *
from datetime import datetime
from email.utils import parsedate
try:
	releasedate = datetime(2016,04,04)
	config = {}
	execfile("config.py", config)
	searchOrder = TwitterSearchOrder() # create a TwitterSearchOrder object
	searchOrder.set_keywords(['Happy'])
	searchOrder.set_count(100) # only return 10 pages
	searchOrder.set_include_entities(False) # and don't give us all those entity information
 #   searchOrder.set_until()
#	searchOrder.set_max_id()


	# Now let's create a Twitter Search API Object here
	# complete these by copying from your Twitter Application
	# from Twitter Developer Site
	ts = TwitterSearch(config["consumer_key"], config["consumer_secret"], config["access_key"], config["access_secret"])

	tweetcount = 0;
	for tweet in ts.search_tweets_iterable(searchOrder):
		timestamp = parsedate(tweet["created_at"])
		timestamp2 = datetime(timestamp[0],timestamp[1],timestamp[2])

		if(timestamp2<=releasedate):
			tweetcount+=1

	print 'number of tweets: ',tweetcount
except TwitterSearchException as e: # deal with exceptions as usual here
	print(e)