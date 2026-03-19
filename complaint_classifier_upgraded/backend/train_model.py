import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os

# Load data
data = pd.read_csv("dataset/datasetnew.csv")

X = data["Reports"]      # complaint text
y = data["Genre"]        # category

# Split data (IMPORTANT)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Vectorization
vectorizer = TfidfVectorizer(stop_words="english")
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Model
model = MultinomialNB()
model.fit(X_train_vec, y_train)

# Predictions
y_pred = model.predict(X_test_vec)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)
print("✅ Model Accuracy:", accuracy)

# Detailed report
print("\n📊 Classification Report:\n")
print(classification_report(y_test, y_pred))

# Save model
os.makedirs("model", exist_ok=True)
pickle.dump(model, open("model/classifier.pkl","wb"))
pickle.dump(vectorizer, open("model/vectorizer.pkl","wb"))

print("\n🎯 Model trained & saved successfully")