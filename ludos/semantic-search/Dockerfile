FROM python:3.10.1
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY semantic_search.py .
RUN python semantic_search.py
COPY main.py .
CMD python main.py