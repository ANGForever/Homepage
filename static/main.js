var windowWidth = $(window).width();
layer.config({
  extend: 'kzhomepage/style.css',
  skin: 'layer-ext-kzhomepage'
});

// Nav buttons
$('.kz-nav-btn').on('click', function() {
  let btn = $(this);
  let type = btn.data('window') // pop current newtab
  let content = btn.data('href')
  switch (type) {
    case 'pop':
      let title = btn.data('title')
      let shadeClose = btn.data('shade') === 'true' ? false : true
      let anim = btn.data('anim') ? btn.data('anim')*1 : 4
      let area_w = btn.data('area-w') ? btn.data('area-w') : '80%'
      let area_h = btn.data('area-h') ? btn.data('area-h') : '90%'
      layer.open({
          type: 2,
          title: title,
          shadeClose: shadeClose,
          anim: anim,
          closeBtn: 2,
          isOutAnim: false,
          area: [area_w, area_h],
          content: content
      });
      break;
    case 'current':
      window.location = content;
      break;
    case 'newtab':
      window.open(content, '_blank');
      break;
  }
});

// Music Player Configuration
const meting_music_api = playerConfig.api || "https://api.mizore.cn/meting/api.php";
const music_server = playerConfig.server;
const music_type = playerConfig.type;
const music_id = playerConfig.id;
const music_order = playerConfig.order;
const music_mini = playerConfig.mini;
const music_fixed = playerConfig.fixed;
const music_volume = playerConfig.volume;
const music_autoplay = playerConfig.autoplay;
const music_loop = playerConfig.loop;

// Initialize Music Player
$.ajax({
  url: meting_music_api,
  data: {
    server: music_server,
    type: music_type,
    id: music_id
  },
  dataType: "json",
  success: function (audio) {
    const ap = new APlayer({
      container: music_fixed === false ? document.getElementById('aplayer-inner') : document.getElementById('aplayer-fixed'),
      audio: audio,
      fixed: music_fixed === false ? false : true,
      autoplay: music_autoplay,
      order: music_order,
      listFolded: true,
      volume: music_volume,
      mini: music_fixed === true ? true : music_mini,
      lrcType: 3,
      preload: "auto",
      loop: music_loop
    });
  },
  error: function(xhr, status, error) {
    console.error('Music player initialization failed:', error);
  }
});

// Fetch Hitokoto
fetch('https://v1.hitokoto.cn')
  .then(response => response.json())
  .then(data => {
    const hitokoto = document.getElementById('hitokoto_text');
    hitokoto.innerText = data.hitokoto;
    hitokoto.style.cursor = 'pointer';
    hitokoto.onclick = () => {
      window.open('https://hitokoto.cn/?uuid=' + data.uuid, '_blank', 'noopener');
    };
  })
  .catch(error => {
    console.error('Hitokoto fetch failed:', error);
    const hitokoto = document.getElementById('hitokoto_text');
    hitokoto.innerText = '生命的意义不在繁华，而在于淡泊。';
  });