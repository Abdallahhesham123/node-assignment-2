const http = require("http");

const Posts = [
  {
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
];
const server = http.createServer((req, res, next) => {
  const { url, method } = req;
  if (url == "/GetAllPosts" && method == "GET") {
    const ConvertBufferdata = JSON.parse(JSON.stringify(Posts));
    res.write(JSON.stringify(ConvertBufferdata));
    res.end();
  } else if (url == "/AddPost" && method == "POST") {
    let bufferData;
    req.on("data", (chunck) => {
      bufferData = chunck;
    });
    req.on("end", () => {
      const ConvertBufferdata = JSON.parse(bufferData);
      Posts.push(ConvertBufferdata);
      ConvertBufferdata.message = "Post added successfully";
      res.write(JSON.stringify(ConvertBufferdata));
      res.end();
    });
  } else if (url == "/Getallpostsreversed" && method == "GET") {
    const ConvertBufferdata = JSON.parse(JSON.stringify(Posts));
    const copyConvertBufferdata = [...ConvertBufferdata];
    const postReversed = copyConvertBufferdata.reverse();
    res.write(JSON.stringify(postReversed));
    res.end();
  } else if (url == "/deletePost" && method == "DELETE") {
    let bufferData;
    req.on("data", (chunck) => {
      bufferData = chunck;
    });
    req.on("end", () => {
      const { id } = JSON.parse(bufferData);
      const allPosts = JSON.parse(JSON.stringify(Posts));
      const filteredArray = allPosts.filter((ele) => ele.id != id);
      filteredArray.message = "this post has been deleted successfully";
      res.write(JSON.stringify(filteredArray));
      res.end();
    });
  } else if (url == "/updatePost" && method == "PUT") {
    let bufferData;
    req.on("data", (chunck) => {
      bufferData = chunck;
    });
    req.on("end", () => {
      const ConvertBufferdata = JSON.parse(bufferData);
      const updatedArray = Posts.map((post) => {
        return post.id == ConvertBufferdata.id ? ConvertBufferdata : post;
      });
      updatedArray.message = "updated successfully";
      res.write(JSON.stringify(updatedArray));
      res.end();
    });
  } else if (url == "/searchPostId" && method == "GET") {
    let bufferData;
    req.on("data", (chunck) => {
      bufferData = chunck;
    });
    req.on("end", () => {
      const { id } = JSON.parse(bufferData);
      const allPosts = JSON.parse(JSON.stringify(Posts));
      const Searchedpost = allPosts.filter((ele) => ele.id == id);
      Searchedpost.message = "this post has been Selected";
      res.write(JSON.stringify(Searchedpost));
      res.end();
    });
  } else {
    res.end("404 not found");
  }
});
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server Is running in port ${PORT}`);
});
