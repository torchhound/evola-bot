import html2text

previous = open("rawEvola.txt", "r")
new = open("evola.txt", "w+")

h = html2text.HTML2Text()
h.ignore_links = True
h.ignore_images = True

for line in previous:
	rHtml = h.handle(line).encode('utf8')
	new.write(str(rHtml))

# remove '\' '\n' '\r' '#'