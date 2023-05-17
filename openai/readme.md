# Source

The template for this app was first inspired by [this example](https://lab.arts.ac.uk/books/web-technology/page/web-app-template-for-beginners), and completed by the following resources:

- The official Socket.io [Get started](https://socket.io/get-started/chat), [Server](https://socket.io/docs/v4/server-api/) and [Client](https://socket.io/docs/v4/client-api/) pages;
- The lovely tutorial by [Dan Shiffman](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6b36TzJidYfIYwTFEq3K5qH).

See also the [OpenAI API reference](https://platform.openai.com/docs/libraries).

---

Secret API key in `secret.txt` (see `server.js`).

If you wish to use the file, paste the key into it and save it.

It is then recommended to tell Git to ignore this file and keep its content unchanged, so that you don't add it by mistake to your fork:

```bash
git update-index --skip-worktree openai/secret.txt
```
