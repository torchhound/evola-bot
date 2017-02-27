import requests

cleanLinks = open("cleanLinks.txt", "w+")
uncleanLinks = open("uncleanLinks.txt", "r")

for line in uncleanLinks:
	if "reader" in line:
		pass
	elif "txt" in line:
		cleanLinks.write(line + "\n")

uncleanLinks.close()
cleanLinks.close()