import pyttsx3 as p
import sys
import time

engine = p.init()

def falar(texto):
    engine.say(texto)
    engine.runAndWait()
    volume = engine.getProperty('volume')   #getting to know current volume level (min=0 and max=1)
    print (volume)   
    print(texto)
    sys.stdout.flush()


def getParam():
    txt = ''
    for x in range(1,len(sys.argv)):
        txt = txt + ' ' + sys.argv[x]
    return txt




falar(getParam())
