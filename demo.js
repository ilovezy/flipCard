function shuffle() {
  var j;
  var t;

  var orgArr = ['fu1.png', 'fu2.png', 'fu3.png', 'fu4.png', 'fu5.png', 'fu6.png']

  var sameleArr = _.sample(orgArr, 4);

  var tempArr = []
  sameleArr.map(function (value) {
    for (var i = 0; i < 4; i++){
      tempArr.push(value)
    }
  })

  var tempObjArr = []
  tempArr.map(function (item) {
    tempObjArr.push({
      type: item,
      isOpen: false,
      isRemoved: false
    })
  })

  for (i = 0; i < 16; i++) {
    j = Math.floor(Math.random() * (i + 1));
    t = tempObjArr[i];
    tempObjArr[i] = tempObjArr[j];
    tempObjArr[j] = t;
  }
  return tempObjArr;
}

var tileList = shuffle()
var app = new Vue({
  el: '#app',

  data: {
    tileList: tileList,

    openTile: null, // 打开的那张牌
    lastTile: null,

    pairCount: 0,
    tileCount: 0,
  },

  mounted: function () {

  },

  methods: {
    replay: function () {
      this.tileList = shuffle();
      this.openTile = null;
      this.lastTile = null;
      this.pairCount = 0;
      this.tileCount = 0;
    },

    flipTile: function (item, i) {
      if (item.isRemoved) {
        return
      }
      var self = this
      self.tileList[i].isOpen = true
      self.openTile = i

      if (self.tileCount == 1) {
        if (i != self.lastTile
          && self.tileList[i].type == self.tileList[self.lastTile].type) {
            self.tileList[i].isRemoved = true
            self.tileList[self.lastTile].isRemoved = true

            self.pairCount++

            if (self.pairCount == 8) {
              alert('Fuck yeah!!!') // success
            }
        } else {
          self.removeDelay(self.openTile, self.lastTile)
        }

        self.tileCount = 0;
      } else {
        self.lastTile = i
        self.tileCount++
      }
    },

    removeDelay: function (first, second) {
      var self = this
      setTimeout(function () {
        self.removeSelect(first)
        self.removeSelect(second)
      }, 800);
    },

    removeSelect: function (i) {
      this.tileList[i].isOpen = false
    }
  }
})