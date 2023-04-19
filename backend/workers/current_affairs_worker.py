import time
from eventregistry import *
from pipelines.bart_large import summarizer
from logger import logger

er = EventRegistry(apiKey="4441217c-378c-49c3-a908-80220002a9a0")

def handle_current_affairs(parameters):
    p_topic = parameters["news_category"]
    p_person = parameters["person"]

    # Logic to choose search string (topic > person)
    search = "news"
    if p_person != '':
        search = p_person
    if p_topic != '':
        search = p_topic

    return getSummary(
        getArticles_api2(search)
    )

def getArticles_api2(topic='ibm'):
    q = QueryArticlesIter(
        keywords=topic,
        keywordsLoc="title",
        lang='eng',
        isDuplicateFilter='skipDuplicates',
    )
    res = q.execQuery(er, sortBy="rel",
                        returnInfo=ReturnInfo(articleInfo=ArticleInfoFlags(
                            concepts=True, categories=True)),
                        maxItems=10,
                        )
    
    try:
        res = next(res)
    except:
        res = {'body': "Wir haben unsere kostenlosen Anfragen für Event Registry in diesem IP-Netzwerk schon verbraucht." }
    return res


def getSummary(article):
    if article != '':
        tic0 = time.perf_counter()
        summary = summarizer(
            article['body'], min_output=80, max_output=120, max_tokenizer_len=512)
        tic1 = time.perf_counter()
        logger.info("Summary took {} seconds.".format(tic1-tic0))
        return summary
    return "No news article found."
