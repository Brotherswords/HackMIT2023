import openai
import json
import re
import csv
import time
from dotenv import dotenv_values


def main():
    OPENAI_KEY = dotenv_values('.env').get('OPENAI_KEY')
    openai.api_key = OPENAI_KEY

    passage_list = load_passages('datasets/training_v2.json')[0:500]
    passage_count = len(passage_list)
    print(f"Parsing {passage_count} passages...\n")
    i = 0
    # batch_size is the number of texts we want to prompt GPT in a single call
    # seems only 2 produces succinct ouputs
    batch_size = 2
    with open('model_training.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["text", "tag1", "tag2", "tag3", "tag4", "tag5", "token_usage"])

        while i < passage_count:
            texts = passage_list[i:i+batch_size]
            gpt_inputs = format_input(texts)
            gpt_output, token_usage = generate_output(gpt_inputs)
            cost = round(int(token_usage)/1000*0.002/batch_size,5)
            tags = group_tags(gpt_output)
            # print(gpt_inputs)
            print(gpt_output, tags)

            for a in range(len(texts)):
                try:
                    row = [texts[a]] 
                    row += tags[a] 
                    row += [cost]
                    writer.writerow(row)
                except IndexError:
                    print(f"GPT Output Inviable; Discarding Row #{i+a}")

            print(f"{min(i+batch_size, passage_count)} done...")
            i += batch_size



def load_passages(file_path="datasets/training_v2.json") -> list:
    """Loads json of training_data"""
    with open(file_path, "r") as file:
        data = file.read()
        return json.loads(data)
    

def format_input(texts):
    input_string = """"""
    for text in texts:
        input_string += f"""Text: {text}\nOutput:\n\n"""
    input_string += f"Adjective count in output: 5*{len(texts)} for each; {len(texts)*5} total"
    return input_string


def generate_output(input):
    """Given a set of text prompts it will call GPT to generate responses"""
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {
        "role": "system",
        "content": "Identify 5 emotions that each individual passage evokes. Be succinct; only include the emotions in your response: \n\nText: The most beautiful things in the world cannot be seen or touched, they are felt with the heart.\nOutput: [profound], [yearning], [transcendent], [poignant], [awe]\n\nText: I wanted so badly to lie down next to her on the couch, to wrap my arms around her and sleep. Not fuck, like in those movies. Not even have sex. Just sleep together in the most innocent sense of the phrase. But I lacked the courage and she had a boyfriend and I was gawky and she was gorgeous and I was hopelessly boring and she was endlessly fascinating. So I walked back to my room and collapsed on the bottom bunk, thinking that if people were rain, I was drizzle and she was hurricane.\nOutput: [longing], [inadequacy], [desolation], [resignation], [admiration]"
        },
        {
        "role": "user",
        "content": f"""{input}"""
        }
    ],
    temperature=0.7,
    max_tokens=300,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    
    output = response['choices'][0]['message']['content']
    token_usage = int(response['usage']['total_tokens'])
    return output, token_usage


def group_tags(input_str):
    # Extract all words between brackets
    tags = re.findall(r'\[(.*?)\]', input_str)
    
    # Group words into lists of size batch_size
    return [tags[i:i + 5] for i in range(0, len(tags), 5)]


start_time = time.perf_counter()

main()

end_time = time.perf_counter()
elapsed_time = end_time - start_time
print(f"Program runtime: {elapsed_time:.2f} seconds")