# InstaGhost [WIP]

Chrome extension that allows you to view instagram stories secretly.

## How does it work?

Well, Instagram uses GraphQL on the backend and when you get the story from there, it's not being marked as `seen`. In order to mark the story as viewed, instagram website sends a POST request to the `https://www.instagram.com/stories/reel/seen` endpoint. And basically, this extension simply blocks all requests to this endpoint which allows you to remain `invisible` while browsing other's stories :)

## Roadmap

- [x] View stories secretly
- [ ] Download stories videos
- [ ] Download photos from posts
- [ ] Download videos from posts 

## License

[MIT License](LICENSE)