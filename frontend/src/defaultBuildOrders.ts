import {IBuildOrder} from "./types";

export const defaultBuildOrders:{[id:string]: IBuildOrder} = {
  "1": {
    name: "22 pop Scouts > Skirms",
    attribution: "Cicero",
    id: "1",
    icon: "scout",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 3
      },
      {
        kind: "create",
        target: "boar"
      },
      {
        kind: "create",
        target: "sheep"
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries"
      },
      {
        kind: "create",
        target: "boar",
        number: 2
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "wood",
        number: 3
      },
      {
        kind:"move",
        from: "boar",
        target: "farm",
        number: 2
      },
      {
        kind: "age2"
      },
      {
        kind: "build",
        build: "barracks",
        from: "sheep",
        target: "builder",
        duringPrevious: true
      },
      {
        kind: "research",
        techs: ['doublebitaxe', 'horsecollar']
      },
      {
        kind:"create",
        target: "farm",
        number: 8
      },
      {
        kind: "build",
        build: "stable",
        from: "builder",
        duringPrevious: true
      },
      {
        kind:"build",
        from: "builder",
        build: "range",
        duringPrevious: true
      },
      {
        kind:"build",
        from: "builder",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind:"move",
        from: "sheep",
        target: "farm",
        number: 4,
        duringPrevious: true
      },
      {
        kind:"create",
        target: "wood",
        number: 2
      },
      {
        kind:"create",
        target: "gold",
        number: 4
      },
      {
        kind: "wheelbarrow"
      },
      {
        kind:"create",
        target: "farm",
        number: 4
      },
      {
        kind: "age3"
      }
    ]
  },
  "2": {
    name: "23 pop Archers",
    attribution: "Cicero",
    id: "2",
    icon: "archer",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar"
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries"
      },
      {
        kind: "create",
        target: "boar",
        number: 2
      },
      {
        kind: "move",
        from: "boar",
        target: "farm",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "wood",
        number: 5
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "wood",
        number: 2
      },
      {
        kind:"move",
        from: "sheep",
        target: "gold",
        number: 3
      },
      {
        kind: "age2"
      },
      {
        kind: "build",
        build: "barracks",
        from: "wood",
        target: "builder",
        duringPrevious: true
      },
      {
        kind: "research",
        techs: ['doublebitaxe', 'horsecollar']
      },
      {
        kind:"create",
        target: "gold",
        number: 3
      },
      {
        kind: "build",
        from: "berries",
        build: "range",
        buildAmount: 2,
        number: 2,
        target: "gold",
        duringPrevious: true
      },
      {
        kind: "build",
        from: "builder",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind:"create",
        target: "farm",
        number: 10
      },
      {
        kind: "move",
        from: "berries",
        target: "farm",
        number: 2,
        duringPrevious: true
      },
      {
        kind:"wheelbarrow",
      },
      {
        kind:"create",
        target: "farm",
        number: 2
      },
      {
        kind: "age3"
      }
    ]
  },
  "3": {
    name: "22 pop M@A > Archers",
    attribution: "Cicero",
    id: "3",
    icon: "manatarms",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
        number: 1
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind: "create",
        target: "sheep",
        number: 2
      },
      {
        kind: "build",
        from: "villager",
        build: "barracks",
        target: "builder"
      },
      {
        kind: "build",
        build: "militia",
        from: "nothing",
        buildAmount: 3,
        duringPrevious: true
      },

      {
        kind: "build",
        from: "villager",
        build: "house",
        target: "gold"
      },
      {
        kind: "create",
        target: "gold"
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "wood",
        number: 4
      },
      {
        kind:"move",
        from: "sheep",
        target: "farm",
        number: 2
      },
      {
        kind: "age2"
      },
      {
        kind: "create",
        target: "wood"
      },
      {
        kind: "research",
        techs: ['doublebitaxe', 'manatarmsupgrade'],
        duringPrevious: true
      },
      {
        kind: "move",
        target: "wood",
        from: "sheep",
        number: 3,
        duringPrevious: true
      },
      {
        kind: "build",
        from: "berries",
        build: "range",
        buildAmount: 2,
        number: 2,
        target: "gold",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "archer",
        from: "range",
        buildAmount: 20,
        duringPrevious: true
      },
      {
        kind: "build",
        from: "builder",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind:"create",
        target: "gold",
        number: 4
      },
      {
        kind: "move",
        from: "berries",
        target: "farm",
        number: 3,
        duringPrevious: true
      },
      {
        kind:"create",
        target: "farm",
        number: 10
      },
      {
        kind:"wheelbarrow",
      },
      {
        kind:"create",
        target: "farm",
        number: 3
      },
      {
        kind: "age3"
      }
    ]
  },
  "4": {
    name: "28 pop Drush > Archers",
    attribution: "Cicero",
    id: "4",
    icon: "militia",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
        number: 1
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries"
      },
      {
        kind: "create",
        target: "gold",
        targetText: "10"
      },
      {
        kind: "build",
        build: "barracks",
        target: "builder",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "militia",
        from: "nothing",
        buildAmount: 3,
        duringPrevious: true
      },
      {
        kind: "move",
        from: "gold",
        target: "wood",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "sheep",
        number: 8
      },
      {
        kind: "move",
        target: "farm",
        from: "sheep",
        number: 3,
        duringPrevious: true
      },
      {
        kind: "loom"
      },
      {
        kind: "move",
        target: "wood",
        from: "sheep",
        number: 7
      },
      {
        kind: "move",
        target: "gold",
        from: "sheep",
        number: 4
      },
      {
        kind: "age2"
      },
      {
        kind: "create",
        target: "gold",
        number: 2
      },
      {
        kind: "research",
        techs: ['doublebitaxe', 'manatarmsupgrade'],
        duringPrevious: true
      },
      {
        kind: "build",
        from: "berries",
        build: "range",
        buildAmount: 2,
        number: 2,
        target: "gold",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "archer",
        from: "range",
        buildAmount: 20,
        duringPrevious: true
      },
      {
        kind: "build",
        from: "builder",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind:"create",
        target: "farm",
        number: 11
      },
      {
        kind:"move",
        target: "farms",
        number: 2,
        from: "berries",
        duringPrevious: true
      },
      {
        kind:"wheelbarrow",
      },
      {
        kind:"create",
        target: "farm",
        number: 2
      },
      {
        kind: "age3"
      }
    ]
  },
  "5":{
    name: "28+2 pop FC Knights",
    attribution: "Cicero",
    id: "5",
    icon: "knight",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
        number: 1
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries"
      },
      {
        kind: "create",
        target: "boar",
        number: 2
      },
      {
        kind: "move",
        number: 2,
        from: "boar",
        target: "farm",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 6,
        target: "wood"
      },
      {
        kind: "create",
        number: 3,
        target: "gold"
      },
      {
        kind: "loom"
      },
      {
        kind: "age2"
      },
      {
        kind: "move",
        target: "farm",
        from: "sheep",
        number: 7,
        duringPrevious: true
      },
      {
        kind: "build",
        from: "berries",
        build: "barracks",
        target: "builder",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 2,
        target: "gold"
      },
      {
        kind: "build",
        from: "builder",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "build",
        from: "builder",
        build: "stable",
        duringPrevious: true
      },
      {
        kind: "age3"
      },
      {
        kind: "move",
        from: "berries",
        number: 2,
        target: "farm",
        duringPrevious: true
      },
      {
        kind: "build",
        from: "builder",
        build: "stable",
        duringPrevious: true
      },

    ]
  },
  "6": {
    name: "22 pop M@A > Towers",
    attribution: "Cicero",
    id: "6",
    icon: "tower",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
        number: 1
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind: "create",
        target: "sheep",
        number: 3
      },
      {
        kind: "build",
        from: "villager",
        build: "barracks",
        target: "sheep"
      },
      {
        kind: "build",
        build: "militia",
        from: "nothing",
        buildAmount: 3,
        duringPrevious: true
      },

      {
        kind: "build",
        from: "villager",
        build: "house",
        target: "gold"
      },
      {
        kind: "create",
        target: "gold"
      },
      {
        kind: "loom"
      },
      {
        kind: "age2"
      },
      {
        kind:"move",
        from: "sheep",
        target: "stone",
        number: 5,
        duringPrevious: true
      },
      {
        kind:"move",
        from: "sheep",
        target: "tower",
        number: 3,
        duringPrevious: true
      },
      {
        kind:"move",
        from: "gold",
        target: "tower",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "research",
        techs: ['doublebitaxe', 'manatarmsupgrade']
      }
    ]
  },
  "7": {
    name: "26+2 pop Arena FC",
    attribution: "Cicero",
    id: "7",
    icon: "castle",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
        number: 1
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind: "create",
        target: "boar",
        number: 3
      },
      {
        kind: "move",
        target: "farm",
        from: "boar",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "move",
        target: "farm",
        from: "boar",
        number: 3,
        duringPrevious: true
      },
      {
        kind: "build",
        build: "house",
        duringPrevious: true
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        target: "gold"
      },
      {
        kind: "create",
        number: 2,
        target: "gold"
      },
      {
        kind: "age2"
      },
      {
        kind:"create",
        target: "farm",
        number: 2
      },
      {
        kind:"build",
        build: "market",
        duringPrevious: true
      },
      {
        kind:"build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "age3"
      }
    ]
  },
  "8": {
    name: "27+2 pop FC - Boom",
    attribution: "Cicero",
    id: "8",
    icon: "tc",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
        number: 1
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind: "create",
        target: "boar",
        number: 2
      },
      {
        kind: "move",
        target: "farm",
        from: "boar",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "create",
        target: "wood",
        number: 5
      },
      {
        kind: "build",
        build: "house",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 3,
        target: "gold"
      },
      {
        kind: "build",
        build: "house",
        duringPrevious: true
      },
      {
        kind: "age2"
      },
      {
        kind: "move",
        from: "sheep",
        target: "farm",
        number: 6,
        duringPrevious: true
      },
      {
        kind:"create",
        target: "wood",
        number: 2
      },
      {
        kind:"build",
        build: "market",
        duringPrevious: true
      },
      {
        kind:"build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "age3"
      },
      {
        kind: "move",
        from: "berries",
        target: "wood",
        number: 3,
        duringPrevious: true
      },
      {
        kind: "create",
        target: "farm",
        number: 20
      },
      {
        kind: "build",
        build: "tc",
        buildAmount: 2,
        duringPrevious: true
      },
    ]
  },
  "9": {
    name: "28+2 pop FC - Unique Unit",
    attribution: "Cicero",
    id: "9",
    icon: "unique",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
        number: 1
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind: "create",
        target: "boar",
        number: 2
      },
      {
        kind: "move",
        target: "farm",
        from: "boar",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "create",
        target: "wood",
        number: 5
      },
      {
        kind: "build",
        build: "house",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 3,
        target: "gold"
      },
      {
        kind: "build",
        build: "house",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 2,
        target: "stone"
      },
      {
        kind: "age2"
      },
      {
        kind: "move",
        from: "sheep",
        target: "farm",
        number: 5,
        duringPrevious: true
      },
      {
        kind: "move",
        from: "sheep",
        target: "stone",
        number: 2,
        duringPrevious: true
      },
      {
        kind:"create",
        target: "stone",
        number: 2
      },
      {
        kind:"build",
        build: "market",
        duringPrevious: true
      },
      {
        kind:"build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "age3"
      },
      {
        kind: "build",
        build: "castle"
      }
    ]
  },
  "10": {
    name: "18 pop Mongol Scouts",
    attribution: "Cicero",
    id: "10",
    icon: "scout",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 3
      },
      {
        kind: "create",
        target: "boar",
        number: 1
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind: "create",
        target: "boar",
        number: 3
      },
      {
        kind: "note",
        note: "Push deer 🦌",
        duringPrevious: true
      },
      {
        kind: "move",
        from: "sheep",
        target: "wood",
        number: 5
      },
      {
        kind: "age2"
      },
      {
        kind: "build",
        build: "barracks",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "house",
        duringPrevious: true
      },
      {
        kind:"create",
        target: "farm",
        number: 10
      },
      {
        kind: "build",
        build: "stable",
        duringPrevious: true
      },
      {
        kind: "note",
        note: "Attack ASAP",
        duringPrevious: true
      }
    ]
  },
  "11": {
    name: "22 pop Scouts > Castle",
    attribution: "Cicero",
    id: "11",
    icon: "scout",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 3
      },
      {
        kind: "create",
        target: "boar"
      },
      {
        kind: "create",
        target: "sheep"
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries"
      },
      {
        kind: "create",
        target: "boar",
        number: 2
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "wood",
        number: 3
      },
      {
        kind:"move",
        from: "boar",
        target: "farm",
        number: 2
      },
      {
        kind: "age2"
      },
      {
        kind: "build",
        build: "barracks",
        from: "sheep",
        target: "builder",
        duringPrevious: true
      },
      {
        kind: "research",
        techs: ['doublebitaxe', 'horsecollar']
      },
      {
        kind:"create",
        target: "farm",
        number: 6
      },
      {
        kind: "build",
        build: "stable",
        from: "builder",
        duringPrevious: true
      },
      {
        kind:"build",
        from: "builder",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind:"move",
        from: "sheep",
        target: "farm",
        number: 4,
        duringPrevious: true
      },
      {
        kind:"create",
        target: "gold",
        number: 5
      },
      {
        kind:"create",
        target: "farm",
        number: 2
      },
      {
        kind: "wheelbarrow"
      },
      {
        kind: "age3"
      }
    ]
  },
  "12": {
    name: "22 pop Scouts > Archers",
    attribution: "Cicero",
    id: "12",
    icon: "scout",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 3
      },
      {
        kind: "create",
        target: "boar"
      },
      {
        kind: "create",
        target: "sheep"
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries"
      },
      {
        kind: "create",
        target: "boar",
        number: 2
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "wood",
        number: 3
      },
      {
        kind:"move",
        from: "boar",
        target: "farm",
        number: 2
      },
      {
        kind: "age2"
      },
      {
        kind: "build",
        build: "barracks",
        from: "sheep",
        target: "builder",
        duringPrevious: true
      },
      {
        kind: "research",
        techs: ['doublebitaxe', 'horsecollar']
      },
      {
        kind:"create",
        target: "farm",
        number: 6
      },
      {
        kind: "build",
        build: "stable",
        from: "builder",
        duringPrevious: true
      },
      {
        kind:"move",
        from: "sheep",
        target: "farm",
        number: 4,
        duringPrevious: true
      },
      {
        kind:"create",
        target: "gold",
        number: 10
      },
      {
        kind:"build",
        from: "builder",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind:"build",
        from: "builder",
        build: "range",
        buildAmount: 2,
        duringPrevious: true
      },
      {
        kind:"create",
        target: "farm",
        number: 4
      },
      {
        kind: "wheelbarrow"
      },
      {
        kind: "age3"
      }
    ]
  },
  "13": {
    name: "28 pop drush > FC (archers)",
    attribution: "Cicero",
    id: "13",
    icon: "castle",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
        number: 2
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "build",
        from: "villager",
        build: "barracks",
        target: "gold",
        targetText: "10"
      },
      {
        kind: "create",
        target: "wood",
        number: 3
      },
      {
        kind: "move",
        from: "gold",
        target: "wood",
        note: "after collecting 10 gold, move the gold villager to wood",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind: "create",
        target: "sheep",
        number: 6
      },
      {
        kind: "move",
        from: "sheep",
        target: "farm",
        duringPrevious: true
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "gold",
        number: 4
      },
      {
        kind: "age2"
      },
      {
        kind:"create",
        target: "gold",
        number: 2
      },
      {
        kind: "build",
        build: "range",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "age3"
      },
      {
        kind: "move",
        from: "sheep",
        target: "gold",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "move",
        from: "berries",
        target: "wood",
        number: 4,
        duringPrevious: true
      },
      {
        kind: "move",
        from: "berries",
        target: "farm",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "build",
        build: "range",
        duringPrevious: true
      },
      {
        kind: "research",
        techs: ['fletching'],
        duringPrevious: true
      }
    ]
  },
  "14": {
    name: "Lithuanian 3 minute drush",
    attribution: "Hera",
    id: "14",
    icon: "militia",
    steps: [
      {
        kind: "build",
        build: "house",
        from: "nothing",
        number: 2,
        target: "tree"
      },
      {
        kind: "build",
        build: "barracks",
        from: "nothing",
        target: "sheep"
      },
      {
        kind: "create",
        number: 5,
        target: "sheep"
      },
      {
        kind: "note",
        note: "force drop off wood",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "house",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "militia",
        buildAmount: 2,
        duringPrevious: true
      },
      {
        kind: "create",
        target: "tree",
        number: 2
      },
      {
        kind: "build",
        build: "house",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "lumbercamp",
        duringPrevious: true
      }
    ]
  },
  "15": {
    name: "17 pop Khmer Scouts",
    attribution: "HumzaCrumza",
    id: "15",
    icon: "scout",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "boar",
        number: 2
      },
      {
        kind: "create",
        target: "sheep",
        number: 4
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind:"note",
        note: "push 2 deer",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 4,
        target: "sheep"
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "wood",
        number: 8
      },
      {
        kind: "age2"
      },
      {
        kind: "create",
        target: "wood",
        number: 2
      },
      {
        kind: "research",
        techs: ['doublebitaxe'],
        duringPrevious: true
      },
      {
        kind: "build",
        build: "stable",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "scout",
        buildAmount: 2,
        duringPrevious: true
      },
      {
        kind: "build",
        from: "sheep",
        build: "mill",
        target: "berries",
        number: 5,
        duringPrevious: true
      },
      {
        kind:"create",
        target: "farm",
        number: 11
      },
      {
        kind: "research",
        techs: ['horsecollar'],
        duringPrevious: true
      },
      {
        kind: "move",
        from: "sheep",
        target: "farm",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "move",
        from: "berries",
        target: "farm",
        number: 5,
        duringPrevious: true
      },
      {
        kind: "build",
        build: "stable",
        from: "builder",
        duringPrevious: true
      },
      {
        kind:"build",
        from: "builder",
        build: "range",
        duringPrevious: true
      },
      {
        kind:"create",
        target: "gold",
        number: 5
      },
      {
        kind:"wheelbarrow"
      },
      {
        kind:"build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "age3"
      }
    ]
  },
  "16": {
    name: "28 pop Malay Elephants",
    attribution: "Survivalist",
    id: "16",
    icon: "elephant",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 3
      },
      {
        kind: "create",
        target: "boar"
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind: "create",
        target: "wood"
      },
      {
        kind:"create",
        target: "boar",
        targetText: "2"
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind:"move",
        from: "sheep",
        target: "farm",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "create",
        number: 2,
        target: "gold"
      },
      {
        kind: "create",
        target: "sheep",
        number: 4
      },
      {
        kind: "move",
        from: "sheep",
        target: "farm",
        number: 5
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "wood",
        number: 5
      },
      {
        kind: "age2"
      },
      {
        kind: "build",
        build: "barracks",
        from: "sheep",
        target: "builder",
        duringPrevious: true
      },
      {
        kind:"create",
        target: "tree",
        number: 3
      },
      {
        kind: "research",
        techs: ['doublebitaxe'],
        duringPrevious: true
      },
      {
        kind: "build",
        build: "stable",
        duringPrevious: true
      },
      {
        kind:"build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "age3"
      },
      {
        kind: "move",
        from: "wood",
        target: "farm",
        number: 8,
        duringPrevious: true
      },
      {
        kind: "move",
        from: "berries",
        target: "gold",
        number: 4,
        duringPrevious: true
      },
      {
        kind: "move",
        from: "berries",
        target: "wood",
        number: 1,
        duringPrevious: true
      },
      {
        kind: "create",
        target: "wood"
      },
      {
        kind: "build",
        build: "elephant",
        buildAmount: 12,
        duringPrevious: true
      },
      {
        kind: "create",
        number: 3,
        target: "farm"
      },
      {
        kind: "note",
        note: "research bow saw and gold mining",
        duringPrevious: true
      }
    ]
  },
  "17": {
    name: "28 pop drush > FC (knights)",
    attribution: "Morley Games",
    id: "17",
    icon: "knight",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "build",
        from: "villager",
        build: "barracks",
        target: "gold",
        targetText: "10"
      },
      {
        kind: "create",
        target: "farm"
      },
      {
        kind: "build",
        build: "barracks",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "house",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "move",
        from: "gold",
        target: "wood",
        note: "after collecting 10 gold, move the gold villager to wood",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind: "create",
        target: "sheep",
        number: 5
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "gold",
        number: 4
      },
      {
        kind: "age2"
      },
      {
        kind: "move",
        from: "sheep",
        target: "farm",
        number: 9,
        duringPrevious: true
      },
      {
        kind:"create",
        target: "gold",
        number: 2
      },
      {
        kind: "build",
        build: "stable",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "age3"
      },
      {
        kind: "build",
        build: "stable",
        duringPrevious: true
      },
      {
        kind: "note",
        note: "research bloodlines and blacksmith upgrades",
        duringPrevious: true
      },
      {
        kind: "move",
        from: "sheep",
        target: "gold",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "create",
        target: "farm",
        number: 2
      },
      {
        kind: "research",
        techs: ['doublebitaxe'],
        duringPrevious: true
      },
      {
        kind: "move",
        from: "berries",
        target: "farm",
        number: 4,
        duringPrevious: true
      },
      {
        kind: "move",
        from: "berries",
        target: "gold",
        number: 2,
        duringPrevious: true
      }
    ]
  },
  "18": {
    name: "31+2+2 pop Fast Imp",
    attribution: "Cicero",
    id: "18",
    icon: "age4",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 5,
        target: "wood"
      },
      {
        kind: "create",
        number: 5,
        target: "sheep"
      },
      {
        kind: "move",
        number: 12,
        target: "farm",
        from: "sheep"
      },
      {
        kind: "create",
        target: "gold",
        number: 6
      },
      {
        kind: "loom"
      },
      {
        kind: "age2"
      },
      {
        kind:"create",
        target: "gold",
        number: 2
      },
      {
        kind: "build",
        build: "market",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "age3"
      },
      {
        kind: "research",
        techs: ["doublebitaxe"],
        duringPrevious: true
      },
      {
        kind: "create",
        target: "food",
        number: 2
      },
      {
        kind: "build",
        build: "monastery",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "siegeworkshop",
        duringPrevious: true
      }
    ]
  },
  "19": {
    name: "28+2+2 pop Byzantine Fast Imp",
    attribution: "Cicero",
    id: "19",
    icon: "age4",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        target: "berries",
        number: 2
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 5,
        target: "wood"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "move",
        number: 10,
        target: "farm",
        from: "sheep"
      },
      {
        kind: "create",
        target: "gold",
        number: 4
      },
      {
        kind: "loom"
      },
      {
        kind: "age2"
      },
      {
        kind:"create",
        target: "gold",
        number: 2
      },
      {
        kind: "build",
        build: "market",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "age3"
      },
      {
        kind: "research",
        techs: ["doublebitaxe"],
        duringPrevious: true
      },
      {
        kind: "create",
        target: "food",
        number: 2
      },
      {
        kind: "build",
        build: "monastery",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "siegeworkshop",
        duringPrevious: true
      }
    ]
  },
  "20": {
    name: "26 pop Fire Galleys",
    attribution: "Cicero",
    id: "20",
    icon: "fireship",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
      },
      {
        kind: "build",
        from: "villager",
        build: "dock",
        target: "builder"
      },
      {
        kind: "create",
        number: 2,
        target: "wood"
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 7,
        target: "sheep"
      },
      {
        kind: "build",
        build: "fishingship",
        buildAmount: 4,
        duringPrevious: true
      },
      {
        kind: "loom"
      },
      {
        kind: "age2"
      },
      {
        kind: "move",
        from: "sheep",
        number: 9,
        target: "wood",
        duringPrevious: true
      },
      {
        kind: "move",
        from: "sheep",
        number: 5,
        target: "gold",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "dock",
        duringPrevious: true
      },
      {
        kind: "research",
        techs: ["doublebitaxe"]
      },
      {
        kind:"create",
        target: "gold",
        number: 6
      },
      {
        kind: "build",
        build: "dock",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "berries",
        number: 6
      },
      {
        kind: "build",
        build: "mill",
        duringPrevious: true
      },
      {
        kind: "create",
        target: "farm",
        number: 8
      }
    ]
  },
  "21": {
    name: "22 pop Eagle Scouts",
    attribution: "Cicero",
    id: "21",
    icon: "eagle",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        target: "boar",
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        buildAmount: 2,
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        number: 2,
        target: "berries",
      },
      {
        kind:"move",
        from: "boar",
        target: "boar",
        targetText: "2",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 3,
        target: "boar"
      },
      {
        kind:"move",
        from: "boar",
        target: "farm",
        number: 2,
        duringPrevious: true
      },
      {
        kind: "create",
        number: 3,
        target: "wood"
      },
      {
        kind: "loom"
      },
      {
        kind: "age2"
      },
      {
        kind: "move",
        from: "sheep",
        number: 4,
        target: "gold",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "barracks",
        buildAmount: 2,
        duringPrevious: true
      },
      {
        kind: "research",
        techs: ["doublebitaxe", "horsecollar"]
      },
      {
        kind: "create",
        number: 3,
        target: "wood"
      },
      {
        kind: "build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind:"create",
        target: "gold",
        number: 6
      },
      {
        kind:"create",
        target: "farm",
        number: 10
      }
    ]
  },
  "22": {
    name: "22 + 2 Italian FC",
    attribution: "Morley Games",
    id: "22",
    icon: "castle",
    steps: [
      {
        kind: "build",
        build: "house",
        buildAmount: 2,
        from: "nothing",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        number: 3,
        target: "sheep"
      },
      {
        kind: "create",
        target: "tree",
        number: 1
      },
      {
        kind: "build",
        from: "villager",
        build: "house",
        target: "berries"
      },
      {
        kind: "build",
        from: "villager",
        build: "mill",
        target: "berries"
      },
      {
        kind: "create",
        number: 1,
        target: "berries",
      },
      {
        kind:"create",
        target: "boar",
        targetText: "2"
      },
      {
        kind: "create",
        number: 2,
        target: "tree"
      },
      {
        kind: "build",
        build: "house",
        duringPrevious: true
      },
      {
        kind:"create",
        target: "wood",
        number: 4
      },
      {
        kind: "create",
        number: 2,
        target: "boar"
      },
      {
        kind: "move",
        number: 2,
        from: "boar",
        target: "farm",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 2,
        target: "gold"
      },
      {
        kind: "loom"
      },
      {
        kind: "age2"
      },
      {
        kind: "move",
        from: "sheep",
        number: 4,
        target: "gold",
        duringPrevious: true
      },
      {
        kind: "create",
        number: 2,
        target: "wood"
      },
      {
        kind: "build",
        build: "blacksmith",
        duringPrevious: true
      },
      {
        kind: "build",
        build: "market",
        duringPrevious: true
      },
      {
        kind: "age3"
      },
      {
        kind: "research",
        techs: ["horsecollar","doublebitaxe"],
        duringPrevious: true
      },
      {
        kind:"create",
        target: "farm",
        number: 20
      },
      {
        kind: "build",
        build: "tc",
        buildAmount: 2,
        duringPrevious: true
      }
    ]
  }
};
