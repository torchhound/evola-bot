import requests
import html2text

previous = open("links.txt", "r")
new = open("evola.txt", "a")

h = html2text.HTML2Text()
h.ignore_links = True
h.ignore_images = True

for line in previous:
	r = requests.get(line)
	rHtml = h.handle(r.text).encode('utf8')
	new.write(str(rHtml))
	new.write("\n")