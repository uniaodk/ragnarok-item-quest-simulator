in18 = {};

const TRANSLATE = {
  ptBR: {
    "Chrysalis": "Crisálida",
    "Fluff": "Felpa",
    "Powder of Butterfly": "Pó de Borboleta",
    "Acorn": "Avelã",
    "Bill of Birds": "Bico de Ave",
    "Porcupine Quill": "Espinho de Porco-Espinho",
    "Stone Heart": "Coração de Pedra",
    "Earthworm Peeling": "Pele de Minhoca",
    "Huge Leaf": "Folha Gigante",
    "Frill": "Brasão",
    "Dokebi Horn": "Chifre de Dokebi",
    "Anolian Skin": "Pele de Anolian",
    "Bacillus": "Bactérias",
    "Antelope Horn": "Chifre de Bode",
    "Sharp Leaf": "Folha Afiada"
  }
}

in18.translate = (text, language = "ptBR") => TRANSLATE[language][text];