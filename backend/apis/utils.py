import json
import urllib.parse, urllib.request

def load_and_return_json(service_url: str, params: dict):
    url = service_url + '?' + urllib.parse.urlencode(params)
    return json.loads(urllib.request.urlopen(url).read())

def translate_text(text, target_lang='DE'):
    API_KEY = "ba754433-ebba-c684-97d1-9d0bbbe6d959:fx"
    url = "https://api-free.deepl.com/v2/translate"
    translated_json = load_and_return_json(
        url,
        {
            "auth_key": API_KEY,
            "text": text,
            "target_lang": target_lang
        }
    )
    return translated_json["translations"][0]["text"]
