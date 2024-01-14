import os
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(temperature=0.8, openai_api_key=api_key, model_name='gpt-4', request_timeout=1000)
user_input = input("Please enter a word in English to be translated to Spanish: \n")
formality = ' ' +input("Please enter whether you would like this phrase to be translated formal or informal: \n")+ ' '
if formality == ' both ':
    formality = ' formal and informal '
region = input("Please enter what region of Spanish you would like this to be translated: \n")

prompt = 'Please give all' +formality+  'translations of "' + user_input + '" from English to Spanish that are used in ' +region+ '. Include phonetic spelling, description, and part of speech.'

print(prompt)

response = llm.predict(prompt)

print(response)
