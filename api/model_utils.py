from datetime import datetime, timedelta
import random
import string

def createTokenId() -> str:
    return ''.join(random.choice(string.printable) for x in range(20))

def createDate() -> datetime:
    return datetime.now() + timedelta(hours=1)
