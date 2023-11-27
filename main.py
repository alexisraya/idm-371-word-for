import os
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(temperature=0.8, openai_api_key=api_key, model_name='gpt-4', request_timeout=1000)
user_input = input("Please enter a word in English to be translated to Spanish: \n")

prompt = 'Please translate "' + user_input + '" from English to Spanish'

print(prompt)

response = llm.predict(prompt)

print(response)
