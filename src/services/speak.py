import pyttsx3 as p
import sys

engine = p.init()

def falar(texto):
    engine.say(texto)
    engine.runAndWait()
    print(texto)
    sys.stdout.flush()


def getParam():
    txt = ''
    for x in range(1,len(sys.argv)):
        txt = txt + ' ' + sys.argv[x]
    return txt


falar(getParam())
