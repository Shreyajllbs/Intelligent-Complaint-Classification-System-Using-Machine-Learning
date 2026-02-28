import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle
import os

data = pd.read_csv("dataset/datasetnew.csv")

X = data["Reports"]      # complaint text
y = data["Genre"]        # category

vectorizer = TfidfVectorizer(stop_words="english")
X_vec = vectorizer.fit_transform(X)

model = MultinomialNB()
model.fit(X_vec, y)

os.makedirs("model", exist_ok=True)
pickle.dump(model, open("model/classifier.pkl","wb"))
pickle.dump(vectorizer, open("model/vectorizer.pkl","wb"))

print("Model trained successfully")
