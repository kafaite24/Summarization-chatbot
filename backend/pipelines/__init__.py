from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

class Seq2SeqTransformer:
    '''
    A class that stores tokenizer and model for a specific hugginface model_name.
    Can be called for a summarization pipeline.
    '''
    def __init__(self, model_name, use_auth=False):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=use_auth)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_name, use_auth_token=use_auth)
        self.on_gpu = torch.cuda.is_available()
        print("{} running on GPU: {}".format(model_name, self.on_gpu))
        if self.on_gpu:
            self.model = self.model.to("cuda")

    def __call__(self, string, min_output=10, max_output=150, max_tokenizer_len=1024):
        '''
        A summarization pipeline.
        
        Parameters:
        -----------
        - string: the string to be summarized
        - min_output: the minimum length of the summary ouput
        - max_output: the maximum length of the summary ouput
        - max_tokenizer_len: Maximum length of the tokenizer sequence

        Returns:
        -----------
        A summarized representation of the input string.
        '''
        tokens_input = self.tokenizer.encode(string, return_tensors='pt', max_length=max_tokenizer_len, truncation=True)
        if self.on_gpu:
            tokens_input = tokens_input.to("cuda")
        ids = self.model.generate(tokens_input, min_length=min_output, max_length=max_output)
        summary = self.tokenizer.decode(ids[0], skip_special_tokens=True)
        return summary
