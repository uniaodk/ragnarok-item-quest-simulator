const db = {};

db.BASE_EXP = {
  normal: [9, 16, 25, 36, 77, 112, 153, 200, 253, 320, 385, 490, 585, 700, 830, 970, 1120, 1260, 1420, 1620, 1860, 1990, 2240, 2504, 2950, 3426, 3934, 4474, 6889, 7995, 9174, 10425, 11748, 13967, 15775, 17678, 19677, 21773, 30543, 34212, 38065, 42102, 46323, 53026, 58419, 64041, 69892, 75973, 102468, 115254, 128692, 142784, 157528, 178184, 196300, 215198, 234879, 255341, 330188, 365914, 403224, 442116, 482590, 536948, 585191, 635278, 687211, 740988, 925400, 1473746, 1594058, 1718928, 1848355, 1982340, 2230113, 2386162, 2547417, 2713878, 3206160, 3681024, 4022472, 4377024, 4744680, 5125440, 5767272, 6204000, 6655464, 7121664, 7602600, 9738720, 11649960, 13643520, 18339300, 23836800, 35658000, 48687000, 58135000, 99999998],
  transcendent: [10, 18, 28, 40, 85, 123, 168, 220, 278, 400, 481, 613, 731, 875, 1038, 1213, 1400, 1575, 1775, 2268, 2604, 2786, 3136, 3506, 4130, 4796, 5508, 6264, 9645, 12392, 14220, 16159, 18209, 21649, 24451, 27401, 30499, 33748, 47342, 58160, 64711, 71573, 78749, 90144, 99312, 108870, 118816, 129154, 174196, 213220, 238080, 264150, 291427, 329640, 363155, 398116, 434526, 472381, 610848, 731828, 806448, 884232, 965180, 1073896, 1170382, 1270556, 1374422, 1481976, 1850800, 3389616, 3666333, 3953534, 4251217, 4559382, 5129260, 5488173, 5859059, 6241919, 7374168, 9570662, 10458427, 11380262, 12336168, 13326144, 14994907, 16130400, 17304206, 18516326, 19766760, 29216160, 34949880, 40930560, 55017900, 71510400, 106974000, 146061000, 174405000, 343210000]
};

db.ITEMS_QUEST = [
  { id: 915, index: 0, name: "Chrysalis", exp: 385, amount: 25, minLvl: 2, maxLvl: 20, questLocation: "gef_fild04 191/54" },
  { id: 914, index: 1, name: "Fluff", exp: 385, amount: 25, minLvl: 1, maxLvl: 20, questLocation: "gef_fild07 321/193" },
  { id: 924, index: 2, name: "Powder of Butterfly", exp: 2950, amount: 25, minLvl: 15, maxLvl: 44, questLocation: "prt_fild04 356/148" },
  { id: 1026, index: 3, name: "Acorn", exp: 3600, amount: 25, minLvl: 18, maxLvl: 59, zeny: 100, buyLocation: "moscovia 208/182", questLocation: "mjolnir_01 293/20" },
  { id: 925, index: 4, name: "Bill of Birds", exp: 4000, amount: 25, minLvl: 10, maxLvl: 30, questLocation: "moc_fild11 144/237" },
  { id: 1027, index: 5, name: "Porcupine Quill", exp: 10425, amount: 25, minLvl: 24, maxLvl: 60, questLocation: "mjolnir_01 296/29" },
  { id: 953, index: 6, name: "Stone Heart", exp: 14000, amount: 25, minLvl: 25, maxLvl: 60, questLocation: "moc_fild02 163/297" },
  { id: 1055, index: 7, name: "Earthworm Peeling", exp: 15775, amount: 25, minLvl: 25, maxLvl: 60, questLocation: "moc_fild17 208/346" },
  { id: 7198, index: 8, name: "Huge Leaf", exp: 25740, amount: 50, minLvl: 36, maxLvl: 65, questLocation: "ayo_fild01 44/241" },
  { id: 1012, index: 9, name: "Frill", exp: 30000, amount: 25, minLvl: 30, maxLvl: 65, questLocation: "moc_fild17 66/273" },
  { id: 1021, index: 10, name: "Dokebi Horn", exp: 42000, amount: 50, minLvl: 35, maxLvl: 70, questLocation: "pay_fild10 108/357" },
  { id: 7003, index: 11, name: "Anolian Skin", exp: 68950, amount: 20, minLvl: 45, maxLvl: 80, questLocation: "cmd_fild01 362/256" },
  { id: 7119, index: 12, name: "Bacillus", exp: 250266, amount: 20, minLvl: 60, maxLvl: 74, questLocation: "ein_fild01 43/249" },
  { id: 7106, index: 13, name: "Antelope Horn", exp: 258490, amount: 50, minLvl: 70, maxLvl: 84, zeny: 510, buyLocation: "nif_in 145/23", questLocation: "ein_fild06 82/171" },
  { id: 7100, index: 14, name: "Sharp Leaf", exp: 262485, amount: 50, minLvl: 60, maxLvl: 85, questLocation: "um_fild01 34/281" },
]

db.DEFAULT_ITEMS = [1026, 7106, 7100];