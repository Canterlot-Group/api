# Yanghuan API

### What is Yanghuan?
Yanghuan is a streaming service project, where internet radio stations and
internet media can share their stream using a modern and function-rich tool.
By using it, listeners have the choice as to what station to listen, since
all stations are united under one website on the Yanghuan instance.

### Features
- Audio and video streaming with multiple channels
- Reencoding to different stream with different options (eg. lower quality option for listeners with slow internet)
- Smart "what to play" selection algorithm
- Bumpers
- Live streaming with compatibility with Icecast-supporting software
- Podcasts
- Playlists
- Chat
- Optional song ordering by listeners
- Playback history
- User accounts with possible upgrade to "artist" rank
- User achievements/badges
- User-made playlists
- Timestamp-based user comments (like Soundcloud)
- Favourite songs

### Setting it up
##### Prerequisites
- Working PostgreSQL server
- Docker, or Ubuntu/Snap

##### Docker image (recommended way)
- `git clone https://github.com/canterlot-group/api.git yanghuan-api`
- `cd yanghuan-api`
- `docker build -t canterlotgroup/yanghuan-api .`
- `docker run --name yanghuan-api -v config.json:/app/dist/config/default.json -p 8123:8123 -d canterlotgroup/yanghuan-api`

##### On the OS
- `sudo snap install --classic --channel=14 node`
- `git clone https://github.com/canterlot-group/api.git yanghuan-api`
- `cd yanghuan-api`
- `npm i`
- `npm start`

### Configuration
Soon

### Documentation
Soon

---
Made by, originally, [Las Pegasus Radio](https://laspegas.us) team.
