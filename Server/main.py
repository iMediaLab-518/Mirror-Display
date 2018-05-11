#!/bin/env python
# encoding: utf-8
import os
import sys
from flask import Flask, json
from flask import request

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1><p>欢迎访问魔镜后台服务</p></h1>'


@app.route('/test', methods=['GET'])
def test():
    try:
        out=os.popen('python3 test.py').read()  
        if isinstance(out, bytes):
            res=str(out, encoding='utf-8')
        else:
            res=out
    except Exception:
        return 'ERR'
    return 'successCallback'+'('+json.dumps({'res':res}) +')'

@app.route('/temperature')
def temperature():
    try:
        out=os.popen('python3 getTemperature.py').read()
    except Exception:
        return 'ERR'
    return 'successCallback'+'('+json.dumps({'out':out}) +')'

@app.route('/humidity')
def humidity():
    try:
        out=os.popen('python3 getHumidity.py').read()
    except Exception:
        return 'ERR'
    return 'successCallback'+'('+json.dumps({'out':out}) +')'

@app.route('/face')
def face():
    try:
        user=os.popen('python3 Mirror-Face-Recognition/face_recognition.py').read()
    except Exception:
        return 'ERR'
    return 'successCallback'+'('+json.dumps({'user':user}) +')'

@app.route('/voice')
def voice():
    try:
        out=os.popen('python3 voice/baidu/try.py').read()
        if isinstance(out, bytes):
            res=str(out, encoding='utf-8')
        else:
            res=out
    except Exception:
        return 'ERR'
    return 'successCallback'+'('+json.dumps({'res':res}) +')'

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=12345,debug=True)