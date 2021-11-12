
// let mushroomFamilies = {
//   pleurotaceae: 0,
//   amanita: 1,
//   agaricus: 2,
//   cantharellus: 3,
//   fomitopsidaceae: 4,
//   hericiaceae: 5,
//   polyporaceae: 6,
//   physalacriaceae: 7,
//   marasmiaceae: 8,
//   meripilaceae: 9,
// };


let mushroomSpecies = [["Pleurotus", ["Ostreatus", "Pearl Oyster"], ["Djamor", "Pink Oyster"], ["Columbinus", "Blue Oyster"], ["Citrinopileatus", "Golden Oyster"]],
                      ["Amanita", ["Muscaria", "Fly Agaric"], ["Guessowii", "Yellow Fly Agaric"], ["Pantherina", "Panther Cap"], ["Phalloides", "Death Cap"], ["Virosa", "Destroying Angel"]],
                      ["Agaricus", ["Bisporus", "Button Mushroom"], ["Arvensis", "Horse Mushroom"]],
                      ["Cantharellus", ["Cibarius", "Golden Chantrelle"]],
                      ["Polyporaceae", ["Laetiporus Sulphureus ", "Chicken of the Woods"], ["Phaeolus Schweinitzii", "Velvet Top"], ["Grifola Frondosa", "Hen of the Woods"], ["Trametes Versicolor", "Turkey Tail"], ["Cerioporus Squamosus", "Pheasent Back"]],
                      ["Hericiaceae", ["Hericium Erinaceus", "Lions Mane"]],
                      ["Physalacriaceae", ["Armillaria", "Honey Fungus"]],
                      ["Hymenogastraceae", ["Galerina Marginata", "Funeral Bell"]],
                      ["Marasmiaceae", ["Omphalotus Olearius", "Jack-O-Lantern"]],
                      ["Hygrophoropsidaceae", ["Hygrophoropsis Aurantiaca", "False Chantrelle"]]]


// Mushrooms
class Mushroom extends Objects {
  constructor(x, y, type) {
    super(x, y, type);
    this.xIndex = 0;
    this.yIndex = 0;
    this.sprite = spriteMushroom;
    this.spriteSize = 8 * tileScale;
  }

    display() {
      image(this.sprite, this.x, this.y, this.spriteSize, this.spriteSize, this.xIndex, this.yIndex, this.spriteSize, this.spriteSize);
    }
}
