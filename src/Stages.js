// STAGES!
const STAGES = {

  stage1: {
    player: {
      top: 50,
      left: 50
    },
    enemies: [
      {
        top: 380,
        left: 260,
        id: 'enemy1',
        cssClass: 'enemy01',
        distance: 3,
        path: [{ direction: 1, times: 90 }, { direction: 3, times: 90 }]
      }
    ],
    goal: {
      top: 300,
      left: 540,
      width: 60,
      height: 60
    },
    obstacles: [
      {
        top: 30,
        left: 250,
        width: 80,
        height: 80,
        id: 'obstacle1',
        clase: 'obstacle01'
      },
      {
        top: 120,
        left: 470,
        width: 80,
        height: 80,
        id: 'obstacle2',
        clase: 'obstacle02'
      }
    ],
    time: 10
  },

  stage2: {
    player: {
      top: 400,
      left: 50
    },
    enemies: [
      {
        top: 150,
        left: 150,
        id: 'enemy1',
        cssClass: 'enemy02',
        distance: 1,
        path: [{ direction: 4, times: 150 }, { direction: 2, times: 150 }]
      },
      {

        top: 120,
        left: 250,
        id: 'enemy2',
        cssClass: 'enemy01',
        distance: 1,
        path: [{ direction: 3, times: 110 }, { direction: 1, times: 110 }]
      },
      {
        top: 310,
        left: 500,
        id: 'enemy3',
        cssClass: 'enemy03',
        distance: 3,
        path: [{ direction: 4, times: 80 }, { direction: 2, times: 80 }]
      }
    ],
    goal: {
      top: 40,
      left: 550,
      width: 60,
      height: 60
    },
    obstacles: [
      {
        top: 0,
        left: 0,
        width: 400,
        height: 120,
        id: 'obstacle1',
        clase: 'obstacle01'
      },
      {
        top: 120,
        left: 470,
        width: 80,
        height: 80,
        id: 'obstacle2',
        clase: 'obstacle02'
      },
      {
        top: 400,
        left: 120,
        width: 520,
        height: 80,
        id: 'obstacle3',
        clase: 'obstacle04'
      }
    ],
    time: 20
  },

  stage3: {
    player: {
      top: 420,
      left: 580
    },
    enemies: [
      {
        top: 100,
        left: 180,
        id: 'enemy1',
        cssClass: 'enemy01',
        distance: 2,
        path: [{ direction: 4, times: 80 }, { direction: 3, times: 40 }, { direction: 2, times: 80 }, { direction: 1, times: 40 }]
      },
      {
        top: 30,
        left: 280,
        id: 'enemy2',
        cssClass: 'enemy02',
        distance: 4,
        path: [{ direction: 3, times: 50 }, { direction: 1, times: 50 }]
      },
      {
        top: 350,
        left: 370,
        id: 'enemy3',
        cssClass: 'enemy03',
        distance: 2,
        path: [{ direction: 4, times: 110 }, { direction: 2, times: 110 }]
      }
    ],
    goal: {
      top: 300,
      left: 30,
      width: 20,
      height: 60
    },
    obstacles: [
      {
        top: 100,
        left: 360,
        width: 120,
        height: 120,
        id: 'obstacle1',
        clase: 'obstacle05'
      },
      {
        top: 400,
        left: 0,
        width: 540,
        height: 80,
        id: 'obstacle2',
        clase: 'obstacle07'
      },
      {
        top: 250,
        left: 200,
        width: 80,
        height: 80,
        id: 'obstacle3',
        clase: 'obstacle04'
      }
    ],
    time: 30
  }
}
