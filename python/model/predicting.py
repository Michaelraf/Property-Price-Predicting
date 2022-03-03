import sys
import pickle
import class_
import pandas as pd

try :
    model = pickle.load(open('./python/model/model.pkl', 'rb'))
except Exception as e:
    print("File not found " , e)

X = {'Type of Property':sys.argv[1],'Erf Size':sys.argv[2],'Floor Size':sys.argv[3],'Bedrooms':sys.argv[4], 'Bathrooms':sys.argv[5],'Rates and Taxes':sys.argv[6],'Pets Allowed':sys.argv[7], 'Garage':sys.argv[8], 'Garden':sys.argv[9], 'Pool':sys.argv[10], 'Internet Access':sys.argv[11], 'Description':sys.argv[12], 'Kitchens':sys.argv[13] ,'Lounges':sys.argv[14], 'Dining Rooms':sys.argv[15], 'Security':sys.argv[16], 'Nearby Public Transport':sys.argv[17], 'Kitchen':sys.argv[18],'Lounge':sys.argv[19] ,'Dining Room':sys.argv[20], 'Domestic Rooms':sys.argv[21], 'Reception Rooms':sys.argv[22]}
X = pd.DataFrame(X, index=[1])

try :
    print(model.predict(X))
except Exception as e:
    print(e)