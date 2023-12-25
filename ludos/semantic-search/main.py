from flask import Flask, request, jsonify
from waitress import serve
from semantic_search import find_hits
app = Flask(__name__)

@app.route('/search/<searchKey>', methods=['POST'])
def search(searchKey):
    body = request.get_json()
    items = body['items']
    corpus = list(map(lambda item: item["text"], items))
    hits = find_hits(searchKey, corpus)
    response = []
    for hit in hits:
        response.append({"id": items[hit['corpus_id']]["id"], "text": items[hit['corpus_id']]["text"], "score": hit['score']})
    return jsonify(response)
if __name__ == "__main__":
    print("Starting server...")
    serve(app, host="0.0.0.0", port=8000)