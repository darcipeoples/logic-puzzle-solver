# logic-puzzle-solver
Frontend for the Puzzle Baron Logic Puzzle Solver.

Try it yourself at [darcipeoples.com/logic-puzzle-solver](https://darcipeoples.com/logic-puzzle-solver/).

Read more about it on [darcipeoples.com](https://darcipeoples.com/).

## Screenshots
### Example Puzzle Input

Start a new logic puzzle on Puzzle Baron: [logic.puzzlebaron.com](https://logic.puzzlebaron.com/init.php).

![](screenshots/puzzle-baron.png)

### Example Solver Output

Enter the puzzle URL into the [Logic Puzzle Solver](https://darcipeoples.com/logic-puzzle-solver/) to automagically solve it.

![](screenshots/solver.png)

## How to Run it
### Start an HTTP Server
```
python3 -m http.server 8000
```

Set the `serverEndpoint` in `index.html` to either the local Flask server or the AWS API Gateway.

If wanting to call AWS locally, temporarily add `localhost:8000` to the API Gateway CORS.

NOTE: To call AWS, we have to start an HTTP server, so that the CORS Origin gets set. We also have to disable authentication and enable CORS in the AWS API Gateway. The HTTP server is needed to load the navbar HTML properly (as opposed to opening `index.html` in browser).