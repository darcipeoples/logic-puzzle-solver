# logic-puzzle-solver
Solver for Puzzle Baron's Logic Puzzles

## Start HTTP Server
```
python3 -m http.server 8000
```

Set the `serverEndpoint` in `index.html` to either the local Flask server or the AWS API Gateway.

If testing the API Gateway locally, temporarily add `localhost:8000` to CORS.

Note: To call AWS, we have to start an HTTP server, so that the CORS Origin gets set. We also need to disable authentication and endable CORS in the AWS API Gateway. We also need the HTTP server to load the navbar HTML.