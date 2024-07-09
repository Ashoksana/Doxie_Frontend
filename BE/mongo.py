from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dataclasses import dataclass, asdict
import random
import string
from fastapi import Request, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
from typing import List
from werkzeug.utils import secure_filename 

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
client = MongoClient("mongodb+srv://Doxie:root@doxie.6iqud7b.mongodb.net/")
db = client["doxie"]
collection = db["uploads"]

UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.post("/uploads/")
async def upload_files(request: Request, files: List[UploadFile] = File(...)):
    uploaded_files = []
    form_data = await request.form()
    po_no = form_data.get('po_no')

    for file in files:
        if file.filename == '':
            raise HTTPException(status_code=400, detail="No selected file")
        
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        
        try:
            with open(file_path, "wb+") as file_object:
                file_object.write(file.file.read())
            
            document = {
                "po_no": po_no,  
                "filename": filename,
                "file_path": file_path
            }
            collection.insert_one(document)
            
            uploaded_files.append(filename)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")
    
    return JSONResponse(status_code=200, content={"detail": "Files successfully uploaded", "files": uploaded_files})

@app.route('/get_image/<po_no>', methods=['GET'])
def get_image(po_no):
    document = collection.find_one({"po_no": po_no}, {"_id": 0})
    if document:
        return jsonify(document), 200
    else:
        return jsonify({"error": "Document not found"}), 404

@app.route('/update_document/<po_no>', methods=['POST'])
def update_document(po_no):
    data = request.json
    update_fields = {key: value for key, value in data.items() if key in ['filename', 'file_path']}

    result = collection.update_one({"po_no": po_no}, {"$set": update_fields})

    if result.matched_count > 0:
        return jsonify({"message": "Document updated successfully"}), 200
    else:
        return jsonify({"error": "Document not found"}), 404

@dataclass
class Document:
    document_id: str
    po_no: str
    name: str
    phone_number: str
    address: str

def generate_phone_number():
    return f"({random.randint(100, 999)}) {random.randint(100, 999)}-{random.randint(1000, 9999)}"

def generate_address():
    street = random.choice(['Ash Dr.', 'Washington Ave.', 'Maple St.', 'Oak St.', 'Pine St.'])
    city = random.choice(['San Jose', 'Manchester', 'Hawaii', 'South Dakota'])
    zip_code = ''.join(random.choices(string.digits, k=5))
    return f"{random.randint(1000, 9999)} {street} {city} {zip_code}"

def generate_dummy_data(num_records):
    dummy_data = []
    for i in range(num_records):
        document = Document(
            document_id=f"{''.join(random.choices(string.digits, k=5))}",
            po_no=f"#{''.join(random.choices(string.digits, k=5))}",
            name=random.choice(['Alice', 'Bob', 'Charlie', 'David']),
            phone_number=generate_phone_number(),
            address=generate_address()
        )
        dummy_data.append(document)
    return dummy_data

dummy_documents = generate_dummy_data(5)
collection.insert_many([asdict(doc) for doc in dummy_documents])

@dataclass
class UpdateDTO:
    phone_number: str
    address: str

@app.route('/api/update_document/<string:po_no>', methods=['POST'])
def update_document_endpoint(po_no):
    try:
        data = request.json
        document = collection.find_one({'po_no': po_no})
        
        if document:
            update_result = collection.update_one(
                {'po_no': po_no},
                {'$set': {
                    'phone_number': data.get('phone_number'), 
                    'address': data.get('address')
                }}
            )

            if update_result.modified_count > 0:
                return {"message": "Document updated successfully"}, 200
            else: 
                return {"message": "Document found but no fields were updated"}, 200
        else: 
            return {"message": "Document not found"}, 404
    except Exception as e: 
        return {"error": str(e)}, 500
    
@app.route('/api/get_document/<string:po_no>', methods=['GET'])
def get_document_endpoint(po_no):
    documents = list(collection.find({'po_no': po_no}, {'_id': False}))
    return jsonify(documents)

@app.route('/api/data', methods=['GET'])
def get_data():
    query = request.args.to_dict()  
    try:
        data = collection.find(query)
        data_list = list(data)
        for item in data_list:
            item['_id'] = str(item['_id'])  
        return jsonify(data_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)