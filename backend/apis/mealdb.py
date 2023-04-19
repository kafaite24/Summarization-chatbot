from apis.utils import load_and_return_json, translate_text

def get_food_full_text(meal_name):
    mealText = 'My food summary output text'
    status = 200
    try:
        mealJson = load_and_return_json(
            'https://www.themealdb.com/api/json/v1/1/search.php',
            {
                "s": meal_name
            }
        )
        mealText = mealJson['meals'][0]['strInstructions'].replace('\r', '').replace('\n', '')
        mealText = mealText[:512]

        mealText = translate_text(mealText)
    except:
        print('Something went wrong with food api')
        status = 500
    return status, mealText