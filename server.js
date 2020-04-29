var http = require("http");
var url = require("url");
var fs = require("fs");

var path = require("path");

var userPath = path.join(__dirname, "user/");
var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var store = "";
  req.on("data", (c) => {
    store += c;
  });
  req.on("end", () => {
    if (req.method === "POST" && parsedUrl.pathname === "/users") {
      var username = JSON.parse(store).name;
      console.log(userPath + username + ".json");

      fs.open(userPath + username + ".json", "wx", (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          fs.close(fd, (err) => {
            res.end(username + " Created Successfully");
          });
        });
      });
    } else if (req.method === "GET" && parsedUrl.pathname === "/users") { 
      console.log(parsedUrl.query,"query pasred");
      var filePath = userPath + parsedUrl.query.username + ".json";
      // console.log(filePath)
      fs.open(filePath, "r", (err, fd) => {
        if (err) return console.log(err);
        fs.readFile(fd, (err, data) => {
          if (err) return console.log(err);
          res.end(data.toString());
          fs.close(fd, (err) => {
            res.end("Create Successfully");
          });
        });
      });
    } else if (req.method === "PUT" && parsedUrl.pathname === "/users") {
      fs.open(userPath + username + ".json", "r+", (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, (err) => {
            res.end("Update Successfully");
          });
        });
      });
    } else if (req.method === "DELETE" && parsedUrl.pathname === "/users") {
      fs.open(userPath + username + ".json", () => {
        res.end("Delete");
      });
    } else {
      res.end("Page not found");
    }
  });
}

server.listen(3000, console.log("Server Start"));
