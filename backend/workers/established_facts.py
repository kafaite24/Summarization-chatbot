from apis.wikipedia import fetch_event
from pipelines.bart_large import summarizer

def process_and_fetch_facts(parameters):
    event = ""
    if parameters['person']  != '':
        event += parameters['person']['name'] + " "
    event += parameters['location'] + " "
    event += parameters['date'] + " "
    event += parameters['geo-country'] + " "
    event += parameters['history-event'] + " "

    #for a in parameters['any']:
    event += parameters['any'] + ' '

    return summarizer(
        fetch_event(event, lang='de', verbose=False)
    )
