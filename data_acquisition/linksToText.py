from urllib.request import urlopen

cleanLinks = open("cleanLinks.txt", "r")

with open("rawEvola.txt", "w+") as evolaTxt:
	for line in cleanLinks:
		r = urlopen("http://www.juliusevola.com" + line)
		data = r.read()
		print(data)
		evolaTxt.write(str(data))

cleanLinks.close()