from pipelines.bart_large import summarizer
from apis.mealdb import get_food_full_text

def huseyin_food(parameters):     
    fulfillmentText = "My food summary output text"
    meal_name = parameters.get('meal')
    if (meal_name is None):
        return fulfillmentText
    status, meal_full_text = get_food_full_text(parameters.get('meal')) 
    if status == 500:
        return fulfillmentText
    return summarizer(meal_full_text, max_output=150)
    # max output length !! 100-150
