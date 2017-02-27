import requests
from bs4 import BeautifulSoup as BS

links = open("uncleanLinks.txt", "w+")
r = requests.get("http://www.juliusevola.com/julius_evola/writings/")
rHtml = r.text
soup = BS(rHtml, "lxml")

for link in soup.find_all('a', href=True):
	links.write(link['href'] + "\n")

links.close()