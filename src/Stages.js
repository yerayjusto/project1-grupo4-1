const STAGES = {

  stage1: {
    player: {
      top: 150,
      left: 50
    },
    enemies: [
      {
        top: 400,
        left: 260,
        id: 'enemy1',
        cssClass: 'enemy01',
        distance: 3,
        path: [{ direction: 1, times: 120 }, { direction: 3, times: 120 }]
      }
    ],
    goal: {
      top: 300,
      left: 540,
      width: 60,
      height: 60
    },
    obstacles: [],
    time: 10
  },

  stage2: {
    player: {
      top: 300,
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
        path: [{ direction: 3, times: 100 }, { direction: 1, times: 100 }]
      },
      {
        top: 300,
        left: 500,
        id: 'enemy3',
        cssClass: 'enemy03',
        distance: 3,
        path: [{ direction: 4, times: 80 }, { direction: 2, times: 80 }]
      }
    ],
    goal: {
      top: 280,
      left: 556,
      width: 60,
      height: 60
    },
    obstacles: [
      {
        top: 0,
        left: 0,
        width: 600,
        height: 120,
        id: 'obstacle1',
        clase: 'obstacle01'
      },
      {
        top: 120,
        left: 520,
        width: 80,
        height: 40,
        id: 'obstacle2',
        clase: 'obstacle02'
      },
      {
        top: 400,
        left: 0,
        width: 640,
        height: 80,
        id: 'obstacle3',
        clase: 'obstacle04'
      }
    ],
    time: 20
  },

  stage3: {
    player: {
      top: 100,
      left: 500
    },
    enemies: [
      {
        top: 150,
        left: 150,
        id: 'enemy1',
        cssClass: 'enemy01',
        distance: 2,
        path: [{ direction: 4, times: 60 }, { direction: 3, times: 30 }, { direction: 2, times: 60 }, { direction: 1, times: 30 }]
      },
      {
        top: 40,
        left: 250,
        id: 'enemy2',
        cssClass: 'enemy02',
        distance: 3,
        path: [{ direction: 3, times: 55 }, { direction: 1, times: 55 }]
      },
      {
        top: 320,
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
        left: 300,
        width: 120,
        height: 120,
        id: 'obstacle1',
        clase: 'obstacle05'
      },
      {
        top: 400,
        left: 0,
        width: 640,
        height: 80,
        id: 'obstacle2',
        clase: 'obstacle07'
      }
    ],
    time: 30
  }
}
