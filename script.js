/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Way Down We Go",
          artist: "Kaleo",
          cover:
            "https://cdns-images.dzcdn.net/images/cover/35d2c62b9a4076c221756d86e80a6cd9/500x500.jpg",
          source: "way-down-we-go.mp3",
          url: "https://www.youtube.com/watch?v=0-7IHOXkiV8",
          favorited: false,
        },
        {
          name: "Fukk Sleep",
          artist: "A$ap Rocky,FKA Twigs",
          cover:
            "https://muzonovs.ru/uploads/posts/2018-03/medium/1520910571_whethan-feat_-skrillex-kiiara-friendship-www_muzonov_net.jpg",
          source:
            "twigs-Fukk-Sleep.mp3",
          url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
          favorited: true,
        },
        {
          name: "All for us",
          artist: "Labrinth",
          cover:
            "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4f/24/8d/4f248dcc-cc0a-485d-862a-bcbc6f054d1c/198001171857.png/400x400bb.jpeg",
          source:
            "all-for-us.mp3",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false,
        },
        {
          name: "Feel Like God",
          artist: "Gazzzy",
          cover:
            "https://i.scdn.co/image/ab67616d0000b2735a6d9ff1e993a9f0e087102a",
          source:
            "Feel-Like-God.mp3",
          url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
          favorited: false,
        },
        {
          name: "infinity",
          artist: "Jaymes Young",
          cover:
            "https://lastfm.freetls.fastly.net/i/u/ar0/7026efe7971fba52f75e8367a261c835.jpg",
          source:
            "Jaymes-Young-Infinity.mp3",
          url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
          favorited: true,
        },
        {
          name: "Flashing Lights ",
          artist: "Kanye West",
          cover:
            "https://m.media-amazon.com/images/I/71+JZba5PuL._SS500_.jpg",
          source:
            "Dwele-Flashing-Lights.mp3",
          url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
          favorited: false,
        },
        {
          name: "Radioactive",
          artist: "Imagine Dragons",
          cover:
            "https://cdns-images.dzcdn.net/images/cover/7e8314f4280cffde363547a495a260bc/350x350.jpg",
          source:
            "imagine-dragons-radioactive.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: true,
        },
       
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null,
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited =
        !this.tracks[this.currentTrackIndex].favorited;
    },
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement("link");
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image";
      document.head.appendChild(link);
    }
  },
});
