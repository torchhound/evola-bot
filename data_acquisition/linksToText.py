from urllib.request import urlopen

cleanLinks = open("cleanLinks.txt", "r")
evolaTxt = open("evola.txt", "w+")

for line in cleanLinks:
	r = urlopen("http://www.juliusevola.com" + line)
	data = r.read()
	print(data)
	#evolaTxt.write(data)

cleanLinks.close()
evolaTxt.close()