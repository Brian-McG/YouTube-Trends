# Visualisation project
## VIS Module CS Honours

### Collaborators
  - Brian Mc George
  - Bryce Billing
  - Calvin Brizzi

### Supported Browsers
  - Google Chrome *(recommended)*
  - Firefox
  
### How to run
The D3 components need to be served up from HTTP, if one just accesses index.html from file, the data cannot be accessed and the page will not render correctly. <br>
If there are any issues getting the visualisation to run, then please contact us. <br>
Outlined below are a number of ways to correctly serve up the visualisation:

#### People.cs
The submitted visualization has been hosted [here](https://people.cs.uct.ac.za/~mcgbri004/vis-project/index.html) and the report [here](https://people.cs.uct.ac.za/~mcgbri004/vis-project/report.html) as a means to avoid having to serve the page via HTTP yourself.

#### Web Server
Host the static html contained in the static folder of www/YoutubeTrends and access via HTTP

#### Local Machine
Some basic Python code has been provided that will serve the page up via HTTP on your local machine.
  1. In terminal change directory to www
  2. Run ```pip install -r requirements.txt```
  3. Run ```python runserver.py```
  4. Then browse to http://localhost:5555/
