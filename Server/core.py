#!/bin/env python
# encoding: utf-8
import os
import sys
from flask import (Flask, json, request, make_response)
from multiprocessing import Process


def makeResponse(name, data):
    response = make_response(json.dumps({name: data}))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response
