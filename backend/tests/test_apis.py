from apis.wikipedia import fetch_event
from pipelines.t5_small_german import summarizer
from emile_worker import getArticles_api2
import requests

def test_apis():
    # Wikipedia
    text = fetch_event('beatles ', lang='de', verbose=True)
    assert len(text) > 100
    assert summarizer(text) == 'Die Beatles entstand in den 1960er Jahren als eine der populärsten Bands der Musikgeschichte.'

    # MealDB
    text = requests.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + 'pasta')
    text = text.json()['meals'][0]['strInstructions'].replace('\r', '').replace('\n', '')[:512]
    assert len(text) > 100
    assert summarizer(text) == 'So macht man pasta...'
    
    # Eventregistry
    text = getArticles_api2('apple')
    assert len(text) > 100
    assert len(summarizer(text)) < 300