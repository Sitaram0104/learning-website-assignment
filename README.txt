1. Open your terminal and then type:

git clone https://github.com/Sitaram0104/learning-website-assignment.git

This clones the repo

2. cd into the new folder and open the folder in visual studio code

cd learning-website-assignment
code .

and type

npm install

This installs the required dependencies

3. create a file named .env in the project folder and add following variables to the file
REACT_APP_RAPID_API_GET_URL=https://webit-keyword-search.p.rapidapi.com/autosuggest
REACT_APP_RAPID_API_GET_HOST=webit-keyword-search.p.rapidapi.com
REACT_APP_RAPID_API_GET_KEY=28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7
REACT_APP_RAPID_API_POST_URL=https://testpostapi1.p.rapidapi.com/testBatmanApi/name/register
REACT_APP_RAPID_API_POST_HOST=testpostapi1.p.rapidapi.com
REACT_APP_RAPID_API_POST_KEY=28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7

4. To run the React project.

npm start

You are done!