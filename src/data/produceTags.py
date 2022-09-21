import json
def IwonderIsThisANumber(str):
    try:
        int(str[0])
        return True
    except ValueError:
        return False

def processInstructions():
    with open('db.json') as datafile:
        rawdb = datafile.read()
        db = json.loads(rawdb)

    tags={}
    undesirable=["large","and","lbs","tsp","tbsp","cup","cups","lb","to","with","or","into","on","can","divided","wo","less","gram","optional","lots","heavy","enough","block","medium","inch","active","quartered","of","whole","weight","finely","peeled","canned","pieces","prepared","for","ml","about","oz","half","small"]
    for recipe in db['recipes'].keys():
        print(recipe)
        for ingredient in db['recipes'][recipe]['ingredients']:
            ingredientwords = ingredient.split(" ")
            for word in ingredientwords:
                word = word.replace('(','').replace(')','').replace(',','').replace('/','').replace('-','').replace('.','').replace('&','')
                if len(word)>=1 and not IwonderIsThisANumber(word) and not(word.lower() in undesirable):
                    word=word.lower()
                    #word = word.replace('(','').replace(')','').replace(',','').replace('/','').replace('-','').replace('.','')
                    if word in tags:
                        tags[word]['count']+=1
                        if not (db['recipes'][recipe]['id'] in tags[word]['recipeids']):
                            tags[word]['recipeids'].append(db['recipes'][recipe]['id'])
                    else:
                        tags[word] = {
                                    'count': 1,
                                    'recipeids':[db['recipes'][recipe]['id']]
                                    }
    #print(tags)
    db['tags'] = tags
    #print(db)
    return db

datatag = processInstructions()
newjson = json.dumps(datatag)
datafile = open("db.json", "w")
datafile.write(newjson)
datafile.close()
