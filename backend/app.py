from flask import Flask, request, jsonify

from workers.current_affairs_worker import handle_current_affairs
from workers.established_facts import process_and_fetch_facts
from workers.food_recipies_worker import huseyin_food

responses = {
    "summarize.established_factbase": process_and_fetch_facts,
    "summarize.current_event": handle_current_affairs,
    "bake.meals": huseyin_food
}

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def webhook():
    req = request.get_json(silent=True, force=True)

    dialogflow_result = req["queryResult"]
    intent = dialogflow_result["intent"]['displayName']
    parameters = dialogflow_result["parameters"]

    return jsonify(
        {
            "fulfillmentText": responses.get(intent, lambda _: dialogflow_result["fulfillmentText"])(parameters)
        }
    )
