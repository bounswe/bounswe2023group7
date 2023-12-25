from sentence_transformers import SentenceTransformer, util
embedder = SentenceTransformer('all-MiniLM-L6-v2')


def find_hits(query, corpus):
    query_embedding = embedder.encode(query, convert_to_tensor=True)
    corpus_embeddings = embedder.encode(corpus, convert_to_tensor=True)
    hits = util.semantic_search(query_embedding, corpus_embeddings, top_k=5)
    hits = hits[0]
    return hits