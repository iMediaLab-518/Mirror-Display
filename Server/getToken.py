import requests
# grant_type=client_credentials&client_id=lhjm5iHwZxyXIXSR1SeBvTRr&client_secret=b3c19294cd0fdb6efe92082eda117393

# client_id 为官网获取的AK， client_secret 为官网获取的SK
host = 'https://aip.baidubce.com/oauth/2.0/token'
r = requests.post(host,data={'grant_type':'client_credentials','client_id':'lhjm5iHwZxyXIXSR1SeBvTRr','client_secret':'b3c19294cd0fdb6efe92082eda117393'})
content = r.text

if(content):
	strArr = content.split('"')
	print(strArr[3])