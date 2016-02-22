__author__ = 'bryce'
#using twitter search api

from TwitterSearch import *

try:
    config = {}
    execfile("config.py", config)
    searchOrder = TwitterSearchOrder() # create a TwitterSearchOrder object
    searchOrder.set_keywords(['Happy'])
    searchOrder.set_count(10) # only return 10 pages
    searchOrder.set_include_entities(False) # and don't give us all those entity information


    # Now let's create a Twitter Search API Object here
    # complete these by copying from your Twitter Application
    # from Twitter Developer Site
    ts = TwitterSearch(config["consumer_key"], config["consumer_secret"], config["access_key"], config["access_secret"])
                       

    for happy_tweet in ts.search_tweets_iterable(searchOrder):
        print( '@%s tweeted: %s' % ( happy_tweet['user']['screen_name'],happy_tweet['text'] ) )

except TwitterSearchException as e: # deal with exceptions as usual here
    print(e)