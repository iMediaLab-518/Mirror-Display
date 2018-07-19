from importlib import import_module
import os
import sys
from flask import (Flask, json, request, make_response, render_template,
                   Response)
# import camera driver
if os.environ.get('CAMERA'):
    Camera = import_module('camera_' + os.environ['CAMERA']).Camera
else:
    #uncomment below to use Raspberry Pi camera instead
    from cam import Camera

app = Flask(__name__)


def gen(camera):
    """Video streaming generator function."""
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/')
def index():
    return '<h1><p>欢迎访问魔镜后台服务</p></h1>'


@app.route('/test', methods=['GET', 'POST'])
def test():
    try:
        out = os.popen('python3 test.py').read()
        if isinstance(out, bytes):
            res = str(out, encoding='utf-8')
        else:
            res = out
    except Exception:
        return 'ERR'
    return makeResponse('res', res)


@app.route('/temperature', methods=['GET', 'POST'])
def temperature():
    try:
        out = os.popen('python3 getTemperature.py').read()
    except Exception:
        return 'ERR'
    return makeResponse('out', out)


@app.route('/humidity', methods=['GET', 'POST'])
def humidity():
    try:
        out = os.popen('python3 getHumidity.py').read()
    except Exception:
        return 'ERR'
    return makeResponse('out', out)


@app.route('/face', methods=['GET', 'POST'])
def face():
    user = ''
    try:
        res = os.popen(
            'python3 Mirror-Face-Recognition/face_recognition.py').readlines()
        if len(res):
            for i in res:
                user = res.index(i)
                print('' + user)
        else:
            user = ''
    except Exception:
        return 'ERR'
    return makeResponse('user', user)


@app.route('/voice', methods=['GET', 'POST'])
def voice():
    try:
        out = os.popen('python3 voice/baidu/try.py').read()
        if isinstance(out, bytes):
            res = str(out, encoding='utf-8')
        else:
            res = out
    except Exception:
        return 'ERR'
    return makeResponse('res', res)


@app.route('/camera', methods=['GET', 'POST'])
def cam():
    return Response(
        gen(Camera()), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=12345, threaded=True, debug=True)
