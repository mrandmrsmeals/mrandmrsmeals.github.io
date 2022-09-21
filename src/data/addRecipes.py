from asyncio.windows_events import NULL
from concurrent.futures import process
from contextlib import nullcontext
import json
from tokenize import Number




def cleanstring(dirty):
    return dirty.replace('"','')

def newRecipes(txtfile):
    
    #incoming text file is grabbed
    with open(txtfile) as incomingfile:
        incomingdata = incomingfile.readlines()
    
    #open the database file
    with open('db.json') as datafile:
        jsondata = datafile.read()
    
    #store database in data variable. 
    data = json.loads(jsondata)
    
    keys = list(data["recipes"].keys()) 
    

    newdata = []
    for recipetxt in incomingdata:
        dirtyrecipearray = recipetxt.split(",,")
        recipearray = list(map(cleanstring, dirtyrecipearray))
        id = 1+len(keys)+len(newdata)
        print(recipearray)

        recipeobject = {
            "id":id,
            "name":recipearray[0].replace('"',''),
            "image":recipearray[1],
            "instructions":recipearray[2].replace('"',''),
            "ingredients":recipearray[3].split(",")
            }
        newdata.append(recipeobject)
        data["recipes"][str(recipeobject["id"])] = recipeobject

    data["total"] = list(data["recipes"].keys())

    recentrecipes = []
    for recipe in newdata:
        recentrecipes.append(str(recipe["id"]))
    data["recent"] = recentrecipes


#print(data)
#newRecipes('newRecipes.txt')
#newjson = json.dumps(data)
#datafile = open("db.json", "w")
#datafile.write(newjson)
#datafile.close()

def processRecipes(txtfile):
    with open(txtfile) as incomingfile:
        incomingdata = incomingfile.readlines()

    with open('db.json') as datafile:
        jsondata = datafile.read()
    data = json.loads(jsondata) 
    keys = list(data["recipes"].keys()) 
    #print(incomingdata)
    prev="not instantiated"
    done=0
    ingredients=0
    directions=0
    directionstring=""
    title=0
    image=0
    category=0 #multiple categories
    categoryterm=""
    categorylist=[]
    recipe={
            "id":0,
            "categories":[],
            "name":"",
            "image":"",
            "instructions":"",
            "ingredients":[]
            }
    ingredientlist=[]
    ingredientname=""
    ingredientlabel=""
    ingredientnumber= -1
    recipelist=[]
    newcategories=[]
    for line in incomingdata:
        

        

        #beginning of sort
        if line.startswith('\t') or line.startswith(' '):
            line = line.lstrip()
        print(line)
        
        #triggers for preportory commands
        if category:
            #line is a category. store into category list
            line=line.strip()
            if done==0:
                categorylist.append(line)
            else:
                #clear category list
                categorylist=[]
                categorylist.append(line)
                done=0
            if line not in newcategories:
                newcategories.append(line)
            #set category back to zero
            category=0
        if title:
            line=line.strip()
            recipe["name"] = line
            title=0
            done=0 #just reset done regardless
        if image:
            line= line.strip()
            recipe["image"] = line
            image=0
        if ingredients:
            line=line.strip()
            if not line.lower().startswith("directions"):
                #FIX instead of using ingredientnumber, detect beginning of ingredient by checking if its a number type
                if ingredientnumber!=-1 and line!="" and line[0].isnumeric():
                    #reached the start of a new ingredient, store what you have
                    #if ingredientnumber==0 or ingredientnumber=='00':
                    #    ingredientstring = "{}".format(ingredientname)
                    ingredientstring = "{} {}".format(ingredientnumber,ingredientname)
                    ingredientlist.append(ingredientstring)
                    #reset ingredientnumber,ingredientlabel,ingredientname
                    ingredientnumber=-1
                    ingredientname=""
                if ingredientnumber==-1 and line!="" and line[0].isnumeric():
                    ingredientname=""
                    ingredientnumber=line
                elif line!="" and ingredientnumber!=-1:
                    ingredientname+=" {}".format(line)
                    ingredientname=ingredientname.strip()
                    
                
                
        if directions:
            ingredientnumber=-1
            ingredientname=""
            if not line.lower().startswith("done") and line!='\n':
                directionstring+=" {}".format(line)


        #prepatory commands
        if line.lower().startswith('category'):
            category=1
        if line.lower().startswith('title'):
            title=1
        if line.lower().startswith('image'):
            image=1
        if line.lower().startswith('ingredients'):
            ingredients=1
        if line.lower().startswith('directions'):
            ingredients=0
            directions=1
        if line.lower().startswith('done'):
            directions=0
            done=1
            #add directionstring to the recipe
            recipe["instructions"]=directionstring.lstrip()
            recipe["ingredients"]=ingredientlist
            recipe["categories"]=categorylist #reset the category list when encountering a new category after done is found. new category signifies a start of new recipes of different category
            recipe["id"]=len(recipelist)+1
            recipelist.append(recipe)
            recipe={
            "id":0,
            "categories":[],
            "name":"",
            "image":"",
            "instructions":"",
            "ingredients":[]
            }
            directionstring=""
            ingredientlist=[]

        



    print(recipelist)
    
    
    
    recentrecipes = []
    for recipe in recipelist:
        data["recipes"][recipe["id"]]=recipe
        recentrecipes.append(str(recipe["id"]))
    data["recent"] = recentrecipes
    data["total"] = list(map(returnListOfStrings,data["recipes"].keys()))
    data["categories"] = newcategories
    #print(data)
    newjson = json.dumps(data)
    datafile = open("db.json", "w")
    datafile.write(newjson)
    datafile.close()

def returnListOfStrings(entry):
    return str(entry)


processRecipes('OurRecipes.txt')


