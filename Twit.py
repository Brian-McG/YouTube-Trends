__author__ = 'bryce'
#using twitter search api

from TwitterSearch import *

try:
    searchOrder = TwitterSearchOrder() # create a TwitterSearchOrder object
    searchOrder.set_keywords(['Happy'])
    searchOrder.set_count(10) # only return 10 pages
    searchOrder.set_include_entities(False) # and don't give us all those entity information


    # Now let's create a Twitter Search API Object here
    # complete these by copying from your Twitter Application
    # from Twitter Developer Site
    ts = TwitterSearch(
                       consumer_key = 'UYfEFhbvL1KjRwbEJui7seAgt',
                       consumer_secret = '9hjAXqlOxqftUbIZIcVtyuDSpdYAxq6K11x2yiWax2XtlpbFZA',
                       access_token = '2517247723-O9nY8k2ExGNqSN2u1GIGy2pUR8SAVgNUc0iBcTg',
                       access_token_secret = 'eBYu6Rof7UrkXCLK6uOlhULYSJLN0Wl6POUFFx1SnXX0E'
                       )

    for happy_tweet in ts.search_tweets_iterable(searchOrder):
        print( '@%s tweeted: %s' % ( happy_tweet['user']['screen_name'],happy_tweet['text'] ) )

except TwitterSearchException as e: # deal with exceptions as usual here
    print(e)