from apis.utils import load_and_return_json

def fetch_event(event, lang='en', verbose=False):
    if event is None:
        return "<p>Please provide an event name</p>"
    
    service_url = "https://" + lang + ".wikipedia.org/w/api.php"

    params_eventid = {
        "format": "json",
        "action": "query",
        "list": "search",
        "srsearch": event
    }
    response_eventid = load_and_return_json(service_url, params_eventid)['query']['search'][0]['pageid']

    params_dbinfo = {
        "format": "json",
        "action": "query",
        "prop": "extracts",
        "explaintext": True,
        "exintro": True,
        "pageids": response_eventid
    }
    db_info = load_and_return_json(service_url, params_dbinfo)

    if verbose:
        print(db_info)

    return db_info['query']['pages'][str(response_eventid)]['extract']
