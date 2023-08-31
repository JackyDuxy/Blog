from flask import Flask, render_template, request, jsonify
from flaskext.mysql import MySQL
import sys
import json

app = Flask(__name__)
 
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Jacky_Duxy20081111'
app.config['MYSQL_DATABASE_DB'] = 'task_list'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.route('/')
def view_form():
    return render_template('login.html')

@app.route('/login', methods= ['POST']) 
def login():

    input_user = request.form["username"]
    input_pswd = request.form["password"]

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(f'select * from user where username = "{input_user}" and pswd = "{input_pswd}" ')

    #we grab all the results
    data = cursor.fetchall()

    cursor.close()
    


    # instead of just printing we want to only login if the user input correct combination
    if len(data) != 0:
        print('Success', file = sys.stderr)
        # check for all the existing containers for user and then load it as html inside blog.html befor running
        # grab all containers from said user
        mysql_code = f'select * from containers where username = "{input_user}"'
        cursor2 = conn.cursor()
        cursor2.execute(mysql_code)

        results = cursor2.fetchall()


        print(results, file = sys.stderr)
        containers = [{"user_name": input_user}]
        for container in results:

            # HW NOTE : thiS IS THE PREV_CONTAITER FORMAT: LIST OF DICTIONARY 
            containers.append({"img": str(container[0]), "task" :str(container[1])})
    
        json_data = json.dumps(containers)
        
        cursor2.close()

        conn.close()

        # render customer template
        return render_template('blog.html', json_data = json_data)
    else:
        conn.close()
        print('Try again', file = sys.stderr)
        # render login template with error msg
        return render_template('login.html', content = "Try again, that is wrong")


@app.route('/submit', methods = ['POST'])
def submit():
    data = request.json
    # data grabbed from the new fetch call in json format
    if data:
        # Process the data
        response_data = {'message': 'Data received successfully'}
        return jsonify(response_data)
    else:
        return jsonify({'error': 'No data received'})

    # # grab task and img
    # task = request.form['task']
    # img = request.form['img']

    # # update database
    # conn = mysql.connect()
    # cursor = conn.cursor()
    # cursor.execute(f'select * from user where username = "{pass}"')

@app.route('/signup')
def signup():
        return render_template('signup.html')
    
@app.route('/sign_up', methods = ['POST'])
def sign_up():
    if (request.method == 'POST'):
        # grab fullname username password from input
        signup_user = request.form['username']
        signup_fullname = request.form['fullname']
        signup_pswd = request.form['password']

        # connect to mysql
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(f'select * from user where username = "{signup_user}"')
        info = cursor.fetchall()

        # check if username already exists
        if (len(info) != 0):
            conn.close()
            cursor.close()
             # if username already render signup.html with an error msg about username already taken
            print(f'usernmae already exists \n' , file = sys.stderr)
            return render_template('signup.html', content = "Username already exist, try again")
        
        else:
            
            cursor.close()
            # if not insert into mysql and render login.html
            mysql_code = f'insert into user (fullname, username, pswd) values("{signup_fullname}", "{signup_user}", "{signup_pswd}")'
            # insert username and password as a new user in the user table in mysql

            
            cursor2 = conn.cursor()
            cursor2.execute(mysql_code)
            
            conn.commit()
            conn.close()
            cursor2.close()

            return render_template('login.html', content = "account created successful, try logging it in")





if __name__ == '__main__':
    app.run(debug=True, host = "0.0.0.0", port = 8080)