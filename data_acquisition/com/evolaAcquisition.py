import html2text
import requests
from urllib.request import urlopen
from bs4 import BeautifulSoup as BS

def evolaComLinks():
	'''
	Gets a list of links to Evola's work
	'''
	r = requests.get("http://www.juliusevola.com/julius_evola/writings/")
	rHtml = r.text
	soup = BS(rHtml, "lxml")
	links = []

	for link in soup.find_all('a', href=True):
		links.append(link['href'])

	return links

def filterLinks(uncleanLinks):
	'''
	Removes everything except text files
	'''
	cleanLinks = []

	for link in uncleanLinks:
		if "reader" in link:
			pass
		elif "txt" in link:
			cleanLinks.append(link)

	return cleanLinks

def linksToText(cleanLinks):
	'''
	Downloads all text files from links and concatenates them together
	'''
	evolaTxt = []

	for link in cleanLinks:
		r = urlopen("http://www.juliusevola.com" + link)
		data = r.read()
		print(data)
		evolaTxt.append(str(data))

	return evolaTxt

def cleanHtml(evolaTxt):
	'''
	Removes html in evola.txt
	'''
	md = []

	h = html2text.HTML2Text()
	h.ignore_links = True
	h.ignore_images = True

	for line in evolaTxt:
		rHtml = h.handle(line).encode('ascii') #TODO change encoding
		md.append(str(rHtml))

	return md

def cleanMd(md):
	'''
	remove '\' '\n' '\r' '#'
	'''
	evolaText = open("evola.txt", "w+")

	for char in md: #TODO currently does nothing
		if "#" in char:
			pass
		elif "\n" in char:
			pass
		elif "\r" in char:
			pass
		elif "'\'" in char:
			pass
		else:
			evolaText.write(char)

	evolaText.close()

def main():
	'''
	Runs all functions in order
	'''
	cleanMd(cleanHtml(linksToText(filterLinks(evolaComLinks()))))

if __name__ == '__main__':
	main()