from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def root(): return {"service":"ai-agents","status":"ok"}
@app.get("/health")
def health(): return {"ok": True}