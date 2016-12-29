# ABOUT THIS PROJECT

This is a simple, dual-resource API built in node.js and using a Mongo database. For my project I used records of television shows (with a name it's original date of airing) and episodes (with the episode title and director).

# TO USE THIS PROJECT

You'll need Mongo. To install Mongo please refer to the <a href="https://docs.mongodb.com/manual/installation/">Mongo Installation page</a>.

Clone this repository and switch to the `/lab-megan` folder. Open a terminal window and install the dependencies:
```
  npm i
```
Open a Mongo database to run in a second terminal window:
```
  mongod
```
Connect to our server in the first terminal window:
```
  npm run start
```
Note: If your server runs on a different port number than used in the examples below please use that port number instead.

- To add a new show to the database:
```
  http POST localhost:3000/api/show name="Show Name" startDate="new Date('December 16, 2016 012:00:00')"
```
- To add a new episode to the database:
```
  http POST localhost:3000/api/show/knownShowID/episode title="Episode Title" director="Director Name"
```
- To check the record of a show:
```
  http GET localhost:3000/api/show/knownShowID
```
- To check the record of an episode:
```
  http GET localhost:3000/api/episode/knownEpisodeID
```
- To edit or update a show:
```
  http PUT localhost:3000/api/show/knownShowID name="Updated Show Name" startDate="new Date('December 18, 2016 012:00:00')"
```
- To edit or update an episode:
```
  http PUT localhost:3000/api/episode/knownEpisodeID title="Updated Episode Title" director="Updated Director Name"
```
- To delete a show:
```
  http DELETE localhost:3000/api/show/knownShowID
```
- To delete an episode:
```
  http DELETE localhost:3000/api/episode/knownEpisodeID
```
# TO USE THIS API

Clone the project and switch to the lab-megan folder.

```
  npm i

  npm i -D chai mocha superagent
```
