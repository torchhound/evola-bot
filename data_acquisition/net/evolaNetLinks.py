import requests
from bs4 import BeautifulSoup as BS

f = open("links.txt", "a")
r = requests.get("http://www.juliusevola.net/textarchive/fulllistoftitles.html")
rHtml = r.text
soup = BS(rHtml, "lxml")

for link in soup.find_all('a', href=True):
	f.write(link['href'] + "\n")