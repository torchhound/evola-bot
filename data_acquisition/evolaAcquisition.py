import html2text
import requests
from urllib.request import urlopen
from bs4 import BeautifulSoup as BS

def evolaComLinks():
	'''
	Gets a list of links to Evola's work
	'''
	links = open("uncleanLinks.txt", "w+")
	r = requests.get("http://www.juliusevola.com/julius_evola/writings/")
	rHtml = r.text
	soup = BS(rHtml, "lxml")

	for link in soup.find_all('a', href=True):
		links.write(link['href'] + "\n")

	links.close()

def filterLinks():
	'''
	Removes everything except text files
	'''
	cleanLinks = open("cleanLinks.txt", "w+")
	uncleanLinks = open("uncleanLinks.txt", "r")

	for line in uncleanLinks:
		if "reader" in line:
			pass
		elif "txt" in line:
			cleanLinks.write(line + "\n")

	uncleanLinks.close()
	cleanLinks.close()

def linksToText():
	'''
	Downloads all text files from links and concatenates them together
	'''
	cleanLinks = open("cleanLinks.txt", "r")

	with open("rawEvola.txt", "w+") as evolaTxt:
		for line in cleanLinks:
			r = urlopen("http://www.juliusevola.com" + line)
			data = r.read()
			print(data)
			evolaTxt.write(str(data))

	cleanLinks.close()

def clean():
	'''
	Removes html in evola.txt
	'''
	previous = open("rawEvola.txt", "r")
	new = open("evola.txt", "w+")

	h = html2text.HTML2Text()
	h.ignore_links = True
	h.ignore_images = True

	for line in previous:
		rHtml = h.handle(line).encode('utf8')
		new.write(str(rHtml))

# remove '\' '\n' '\r' '#'

def main():
	'''
	Runs all functions in order
	'''
	evolaComLinks()
	filterLinks()
	linksToText()
	clean()

if __name__ == '__main__':
	main()