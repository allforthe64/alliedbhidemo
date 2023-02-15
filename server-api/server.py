from flask import Flask, request
from flask_mysqldb import MySQL
from var import USER, PASSWORD, HOST, DB

app = Flask(__name__)

app.config['MYSQL_USER'] = USER
app.config['MYSQL_PASSWORD'] = PASSWORD
app.config['MYSQL_HOST'] = HOST
app.config['MYSQL_DB'] = DB
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

@app.route('/')
def index():
    cur = mysql.connection.cursor()
    cur.execute('''CREATE TABLE patient (id INTEGER,
                fName VARCHAR(20), lName VARCHAR(20), iName VARCHAR(20),
                email VARCHAR(255), phone VARCHAR(15), dob DATE, SEX VARCHAR(10),
                gender VARCHAR(20), mStatus VARCHAR(40), pLanguage VARCHAR(20))''')

    return 'Done!'

@app.route('/test')
def test():
    return {"test": ['foo', 'bar', 'baz']}

@app.route('/get-patients')
def getPatients():

    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM patient''')
    results = cur.fetchall()
    
    count = 0
    resultsDict = {}
    for i in results:
        resultsDict[count] = i
        count += 1
    
    return resultsDict

@app.route('/create-patient', methods=['POST'])
def createPatient():
    cur = mysql.connection.cursor()
    
    data = request.json

    cur.execute('''INSERT INTO patient VALUES (%(id)s, %(fName)s, 
        %(lName)s, %(iName)s, %(email)s, %(phone)s,
        %(DOB)s, %(sex)s, %(gender)s, %(mStatus)s, %(language)s)'''
        ,{
            'id': mysql.connection.insert_id(),
            'fName': data['fName'],
            'lName': data['lName'],
            'iName': data['iName'],
            'email': data['email'],
            'phone': data['phone'],
            'DOB': data['DOB'],
            'sex': data['sex'],
            'gender': data['gender'],
            'mStatus': data['mStatus'],
            'language': data['language']
        })


    mysql.connection.commit()

    return 'Yay'

if __name__ == "__main__":
    app.run(debug=True)