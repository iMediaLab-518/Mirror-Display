#!/bin/env python
# _*_coding:utf-8_*_
import os
from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1><p>欢迎访问魔镜后台服务</p></h1>'


@app.route('/test')
def test():
    try:
        out=os.popen('python3 test.py').read()
    except Exception:
        return 'ERR'
    return out

@app.route('/temperature')
def temperature():
    try:
        out=os.popen('python3 getTemperature.py').read()
    except Exception:
        return 'ERR'
    return out

@app.route('/humidity')
def humidity():
    try:
        out=os.popen('python3 getHumidity.py').read()
    except Exception:
        return 'ERR'
    return out

@app.route('/face')
def face():
    try:
        out=os.popen('python3 face.py').read()
    except Exception:
        return 'ERR'
    return out

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=12345,debug=True)