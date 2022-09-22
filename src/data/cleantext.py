
from pyclbr import Function


def clean(txtfile):
    
    incomingdata=""
    with open(txtfile,'r',encoding='utf-8-sig') as incomingfile:
        incomingdata = incomingfile.readlines()
    
    rebuiltdata=""
    for line in incomingdata:
        line = line.replace("'","+")
        print(line)
        rebuiltdata+=line
    
    return rebuiltdata

cleantxt = clean("OurRecipes.txt")

datafile = open("OurRecipes.txt", "w")
datafile.write(cleantxt)
datafile.close()