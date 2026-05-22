import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.svm import LinearSVC   
import pickle
import os


data = pd.read_csv("dataset/datasetnew.csv")

X = data["Reports"]
y = data["Genre"]


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


vectorizer = TfidfVectorizer(stop_words="english")
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)


model = LinearSVC()
model.fit(X_train_vec, y_train)


y_pred = model.predict(X_test_vec)

accuracy = accuracy_score(y_test, y_pred)
print(" Model Accuracy:", accuracy)


print("\n Classification Report:\n")
print(classification_report(y_test, y_pred))


os.makedirs("model", exist_ok=True)
pickle.dump(model, open("model/classifier.pkl","wb"))
pickle.dump(vectorizer, open("model/vectorizer.pkl","wb"))

print("\n SVM Model trained & saved successfully")