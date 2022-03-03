from sklearn.base import BaseEstimator, TransformerMixin
import numpy as np

def handling_missing_data(data):
    
    #Erf Size and Floor Size
    data['Erf Size'] = np.where(((data["Erf Size"] == 0) & (data["Floor Size"] != 0) & (data["Type of Property"] == "Apartment / Flat")),data["Floor Size"],data["Erf Size"])
    data['Floor Size'] = np.where(((data["Floor Size"] == 0) & (data["Erf Size"] != 0) & (data["Type of Property"] == "Apartment / Flat")),data["Erf Size"],data["Floor Size"])
    
    return data

import math

def transform_garage(garage):
    if isinstance(garage, str):
        if " " in garage:
            temp = garage.strip(' ').split("\n")
            if temp[0].isdigit():
                return float(temp[0])
            elif "Double" in temp:
                return 2;
            elif "Single" in temp:
                return 1
            else:
                return 1;
        else:
            if garage == "":
                return 0;
            elif garage == "Double":
                return 2
            elif garage == "Single":
                return 1
            elif garage[0].isdigit():
                return float(garage)
            else:
                return 1
    else:
        if math.isnan(garage):
            return 0
        return float(garage)


def transform_pool_garden(df):
    df["Pool"].loc[~df["Pool"].isnull()] = 1.
    df["Pool"].loc[df["Pool"].isnull()] = 0
    df['Pool'] = df["Pool"].astype(float)
    
    df["Garden"].loc[~df["Garden"].isnull()] = 1.
    df["Garden"].loc[df["Garden"].isnull()] = 0
    df['Garden'] = df["Garden"].astype(float)
    
    return df

def transform_pets(df):
    df["Pets Allowed"].loc[df["Pets Allowed"] == 'Yes'] = 1.
    df["Pets Allowed"].loc[df["Pets Allowed"].isnull()] = 0
    df["Pets Allowed"].loc[df["Pets Allowed"] == 'No'] = 0
    
    df["Pets Allowed"] = df["Pets Allowed"].astype(float)

    return df


def transform_category(value):
    if isinstance(value, str):
        if value.strip(' ') == '':
            return 0;
        value = value.replace(' ', '').split(',')
        return len(value)
    else:
        return 0

def transform_column(df):
    df["Internet Access"] = df["Internet Access"].apply(transform_category)
    df["Nearby Public Transport"] = df["Nearby Public Transport"].apply(transform_category)
    df["Kitchen"] = df["Kitchen"].apply(transform_category)
    df["Dining Room"] = df["Dining Room"].apply(transform_category)
    df["Lounge"] = df["Lounge"].apply(transform_category)
    df["Description"] = df["Description"].apply(transform_category)
    df["Security"] = df["Security"].apply(transform_category)
    
    return df

class Cleaning(BaseEstimator, TransformerMixin):
    def __init__(self):
        pass
    
    def fit(self, X, y=None):
        return self
        
    def transform(self, X, y=None):
        X = handling_missing_data(X)
        X["Garage"] = X["Garage"].apply(transform_garage)
        X = transform_pool_garden(X)
        X = transform_pets(X)
        X = transform_column(X)
        
        return X
    
    def fit_transform(self, X, y=None):
        self.fit(X, y)
        return self.transform(X, y)
    
def feature_engineering(df):
    df['Comfort Level'] = df[["Internet Access", "Nearby Public Transport", "Kitchen", "Dining Room", "Description", "Lounge", "Security"]].sum(axis=1)
    df = df.drop(["Internet Access", "Nearby Public Transport", "Kitchen", "Dining Room", "Description", "Lounge", "Security"], axis = 1)
    
    return df
    
class Feature_engineering(BaseEstimator, TransformerMixin):
    def __init__(self):
        pass
    
    def fit(self, X, y=None):
        return self
        
    def transform(self, X, y=None):
        X = feature_engineering(X)
        
        return X
    
    def fit_transform(self, X, y=None):
        self.fit(X, y)
        return self.transform(X, y)
