from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(temperature=0.8, openai_api_key="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", model_name='gpt-4', request_timeout=1000) #gitignore
user_input = input("Please enter a word in English to be translated to Spanish: \n")

prompt = 'Please translate "' + user_input + '" from English to Spanish'

print(prompt)

response = llm.predict(prompt)

print(response)