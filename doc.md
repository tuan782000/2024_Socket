# Socket.IO

Socket.IO is a JavaScript library that enables real-time, bidirectional communication between web clients (browsers) and servers. It simplifies the process of building interactive web applications by allowing data to be transmitted instantly and continuously between the client and server, facilitating features like chat applications, live updates, and multiplayer gaming.

Socket.IO là một thư viện JavaScript giúp giao tiếp thời gian thực hai chiều giữa các trình duyệt (clients) và máy chủ. Nó đơn giản hóa quá trình xây dựng ứng dụng web tương tác bằng cách cho phép dữ liệu được truyền đưa giữa client và server ngay lập tức và liên tục. Điều này hỗ trợ các tính năng như ứng dụng trò chuyện, cập nhật trực tuyến và trò chơi đa người chơi.

## Bidirectional Communication

Bidirectional Communication means that information can flow in two directions, both the web client (browser) and the server can send and receive data to and from each other in real-time. So, if something changes on the server, it can immediately notify the client, and vice versa, without the client needing to constantly ask the server if there is new information available.

Giao tiếp hai chiều (Bidirectional Communication) có nghĩa là thông tin có thể chuyển đổi theo hai hướng, cả trình duyệt (web client) và máy chủ đều có thể gửi và nhận dữ liệu từ nhau thời gian thực. Do đó, nếu có sự thay đổi trên máy chủ, nó có thể ngay lập tức thông báo cho client và ngược lại, mà không cần client phải liên tục yêu cầu máy chủ xem có thông tin mới không.

## Anlogy

Think of bidirectional communication like a phone call. When you're talking on the phone with someone, you can both speak and listen at the same time. It's not just one person talking while the other listens; both parties can exchange information back and forth. Similarly, with bidirectional communication in Socket.IO, both the web client and the server can send and receive data, creating a two way flow of information like a conversation on the phone.

Hãy tưởng tượng về giao tiếp hai chiều giống như một cuộc gọi điện thoại. Khi bạn đang nói chuyện qua điện thoại với ai đó, cả hai đều có thể nói và nghe đồng thời. Đó không chỉ là một người nói trong khi người kia nghe; cả hai bên đều có thể trao đổi thông tin qua lại. Tương tự, với giao tiếp hai chiều trong Socket.IO, cả trình duyệt web và máy chủ đều có thể gửi và nhận dữ liệu, tạo ra một luồng thông tin hai chiều như một cuộc trò chuyện qua điện thoại.

Khởi tạo dự án:

npm init -y

cài thêm: nodemon và socket.io

npm i nodemon socket.io

Bổ sung: .gitignore để loại bỏ các file hay thư mục không cần thiết khi tải lên github

1. packages (gói)

2. Instances

3. Serving HTML File

4. Define a connection event handler

5. Start the server

```js
// console.log("Hello tuan")

// 1. packages (gói)
import express from "express"; // express: Một web framework cho Node.js, giúp xây dựng các ứng dụng web dễ dàng hơn.
import http from "http"; // http: Một module trong Node.js cung cấp các công cụ để làm việc với HTTP.
import { fileURLToPath } from "node:url"; //  Các hàm từ module node:url và node:path giúp làm việc với đường dẫn và URL.
import { dirname, join } from "node:path";
import { Server } from "socket.io"; // Server từ socket.io: Tạo một đối tượng server của Socket.IO để xử lý giao tiếp thời gian thực.
// 2. Instances (trường hợp)
const app = express(); // app: Thể hiện của Express, sẽ được sử dụng để định nghĩa các đường dẫn và xử lý các yêu cầu HTTP.
const server = http.createServer(app); // server: Một server HTTP được tạo bằng cách sử dụng http.createServer và chuyển vào app của Express.
const io = new Server(server); // io: Thể hiện chính của Socket.IO server được tạo bằng cách chuyển vào server.

// Tạo ra io dựa trên khung Server và làm việc trên máy chủ có tên là server. 

// 3. Serving HTML File ()
const __dirname = dirname(fileURLToPath(import.meta.url)); // __dirname: Lấy đường dẫn thư mục hiện tại của file đang thực thi.

// console.log(__dirname);
app.get("/", (req, res) => res.sendFile(join(__dirname, "index.html"))); // app.get(): Định nghĩa một đường dẫn (endpoint) cho HTTP GET request. Ở đây, khi truy cập '/' (root), server sẽ trả về file HTML.

// 4. Define a connection event handler

// 5. Start the server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
```

```js
io.on("connection", callback);
```

io.on is a method used to register event lisnteners for different events that occur on the server-side. The io object represents the main Socket.IO server instance.

io.on là một phương thức được sử dụng để đăng ký người nghe sự kiện (event listeners) cho các sự kiện khác nhau xảy ra ở phía máy chủ. Đối tượng io đại diện cho thể hiện chính của máy chủ Socket.IO.


When we call io.on("connection", callback), we're telling Socket.IO to listen for a connection event, which occurs whenever a new client establishes a connection with the server. The callback function will be called.inviked whenever this event occurs, and it will receive a socket object representing the connection to the client.

Similarly, we can use socket.on the socket object to listen for events specific to that individual client connection.

Khi chúng ta gọi io.on("connection", callback), chúng ta đang bảo cho Socket.IO nghe sự kiện kết nối (connection event), xảy ra mỗi khi một client mới thiết lập kết nối với máy chủ. Hàm gọi lại (callback) sẽ được gọi mỗi khi sự kiện này xảy ra, và nó sẽ nhận một đối tượng socket đại diện cho kết nối với client.

Tương tự, chúng ta có thể sử dụng socket.on trên đối tượng socket để nghe các sự kiện cụ thể cho kết nối client đó.

Connection event handler

```js
io.on("connection", (socket) => {
    console.log("User Connected to (Server)");
    console.log(socket);
})
```

Disconnect (client & server)

```js
io.on("connection", (socket => {
    console.log("User Connected To (Server)");

        // Handle disconnect event
        socket.on("disconnect", () => {
            console.log("User Disconnected From (Server)");
        });
    }
))
```

Emitting Events

Emitting Events allows us to send data from one side (client or server) to the other. It's a fundamental feature of real-time communication.

Phát các Sự kiện (Emitting Events) cho phép chúng ta gửi dữ liệu từ một bên (client hoặc server) sang bên kia. Đây là một tính năng cơ bản của giao tiếp thời gian thực.


```js
io.on("connection", ((socket) => {
        console.log("User Connected To (Server)");

        // Emit a 'message' event to the client
        // Phát đi một 'message' sự kiện đến client.
        socket.emit("message", "Welcome to the server!");

        // Handle disconnect event
        socket.on("disconnect", () => {
            console.log("User Disconnected From (Server)");
        });
    }
))
```

phía server thực hiện emit thì phía client thực on để lắng nghe và nhận được tên của emit, tham số thứ 2 trong ví dụ là chuỗi.






