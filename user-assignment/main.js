const http = require("http");

const Users = [
  {
    id: 1,
    name: "hesham abdallah",
    email: "Sincere@april.biz",
    phone: "01062821903",
    password: "123456789",
  },
  {
    id: 2,
    name: "abdallah hesham",
    email: "Abdallah@gmail.com",
    phone: "01062821903",
    password: "123456789",
  },

  {
    id: 3,
    name: "ahmed hesham",
    email: "Abdallah@gmail.com",
    phone: "01062821903",
    password: "123456789",
  },

  {
    id: 4,
    name: "roaa hesham",
    email: "Abdallah@gmail.com",
    phone: "01062821903",
    password: "123456789",
  },

  {
    id: 5,
    name: "amany hesham",
    email: "Abdallah@gmail.com",
    phone: "01062821903",
    password: "123456789",
  },

  {
    id: 6,
    name: "may hesham",
    email: "Abdallah@gmail.com",
    phone: "01062821903",
    password: "123456789",
  },
];
const server = http.createServer((req, res, next) => {
  const { url, method } = req;
  if (url == "/GetAllUsers" && method == "GET") {
    const ConvertBufferdata = JSON.parse(JSON.stringify(Users));
    res.write(JSON.stringify(ConvertBufferdata));
    res.end();
  } else if (url == "/AddUser" && method == "POST") {
    let bufferData;
    req.on("data", (chunck) => {
      bufferData = chunck;
    });
    req.on("end", () => {
      const ConvertBufferdata = JSON.parse(bufferData);
      Users.push(ConvertBufferdata);
      ConvertBufferdata.message = "Done";
      res.write(JSON.stringify(ConvertBufferdata));
      res.end();
    });
  } else if (url == "/GetallUsersByName" && method == "GET") {
    const ConvertBufferdata = JSON.parse(JSON.stringify(Users));
    const UserSorted = ConvertBufferdata.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    res.write(JSON.stringify(UserSorted));
    res.end();
  } else if (url == "/deleteUser" && method == "DELETE") {
    let bufferData;
    req.on("data", (chunck) => {
      bufferData = chunck;
    });
    req.on("end", () => {
      const { id } = JSON.parse(bufferData);
      const allUsers = JSON.parse(JSON.stringify(Users));
      const filteredArray = allUsers.filter((ele) => ele.id != id);
      filteredArray.message = "this user has been deleted successfully";
      res.write(JSON.stringify(filteredArray));
      res.end();
    });
  } else if (url == "/updateUser" && method == "PUT") {
    let bufferData;
    req.on("data", (chunck) => {
      bufferData = chunck;
    });
    req.on("end", () => {
      const ConvertBufferdata = JSON.parse(bufferData);
      const updatedArray = Users.map((user) => {
        return user.id == ConvertBufferdata.id ? ConvertBufferdata : user;
      });
      updatedArray.message = "updated successfully";
      res.write(JSON.stringify(updatedArray));
      res.end();
    });
  } else if (url == "/searchUserId" && method == "GET") {
    let bufferData;
    req.on("data", (chunck) => {
      bufferData = chunck;
    });
    req.on("end", () => {
      const { id } = JSON.parse(bufferData);
      const allUsers = JSON.parse(JSON.stringify(Users));
      const SearchedUser = allUsers.filter((ele) => ele.id == id);
      SearchedUser.message = "this user has been Selected";
      res.write(JSON.stringify(SearchedUser));
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
