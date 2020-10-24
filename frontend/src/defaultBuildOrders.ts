import {IBuildOrder} from "./types";

export const defaultBuildOrders:{[id:string]: IBuildOrder} = {
  "1": {
    name: "22 pop Scouts > Skirms",
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
        targetText: "2"
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
        kind:"move",
        from: "sheep",
        target: "farm",
        number: 4
      },
      {
        kind:"create",
        target: "farm",
        number: 8
      },
      {
        kind:"build",
        from: "builder",
        build: "range"
      },
      {
        kind:"build",
        from: "builder",
        build: "blacksmith"
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
        targetText: "2"
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
        target: "farm"
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
        kind: "build",
        from: "berries",
        build: "range",
        buildAmount: 2,
        number: 2,
        target: "gold"
      },
      {
        kind: "build",
        from: "builder",
        build: "blacksmith"
      },
      {
        kind:"create",
        target: "gold",
        number: 3
      },
      {
        kind: "move",
        from: "berries",
        target: "farm",
        number: 2
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
        number: 2
      },
      {
        kind: "age3"
      }
    ]
  },
  "3": {
    name: "22 pop M@A > Archers",
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
        targetText: "2"
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
        kind: "research",
        techs: ['doublebitaxe', 'manatarmsupgrade']
      },
      {
        kind: "move",
        target: "wood",
        from: "sheep",
        number: 3
      },
      {
        kind: "build",
        from: "berries",
        build: "range",
        buildAmount: 2,
        number: 2,
        target: "gold"
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
        build: "blacksmith"
      },
      {
        kind: "create",
        target: "wood"
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
        number: 3
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
        targetText: "2"
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
        kind: "move",
        from: "gold",
        target: "wood"
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
        number: 3
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
        kind: "research",
        techs: ['doublebitaxe', 'manatarmsupgrade']
      },
      {
        kind: "build",
        from: "berries",
        build: "range",
        buildAmount: 2,
        number: 2,
        target: "gold"
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
        build: "blacksmith"
      },
      {
        kind: "create",
        target: "gold",
        number: 2
      },
      {
        kind:"move",
        target: "farms",
        number: 2,
        from: "berries"
      },
      {
        kind:"create",
        target: "farm",
        number: 11
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
    name: "28 + 2 pop FC Knights",
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
        targetText: "2"
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
        target: "farm"
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
        kind: "build",
        from: "builder",
        build: "blacksmith"
      },
      {
        kind: "build",
        from: "builder",
        build: "stable"
      },
      {
        kind: "create",
        number: 2,
        target: "gold"
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
  }
};