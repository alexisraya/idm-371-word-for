from langchain.chat_models import ChatOpenAI

user_input = input("Please enter a word in English to be translated to Spanish: \n")

prompt = 'Please translate "' + user_input + '" from English to Spanish'

print(prompt)

response = llm.predict(prompt)

print(response)