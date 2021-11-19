


let mushroomSpecies = [["Amanita", ["Muscaria", "Fly Agaric"], ["Guessowii", "Yellow Fly Agaric"], ["Pantherina", "Panther Cap"], ["Phalloides", "Death Cap"], ["Virosa", "Destroying Angel"]],
                      ["Agaricus", ["Bisporus", "Button Mushroom"], ["Arvensis", "Horse Mushroom"], ["Campestris", "Field Mushroom"]],
                      ["Cantharellus", ["Cibarius", "Golden Chantrelle"]],
                      ["Pleurotus", ["Ostreatus", "Pearl Oyster"], ["Djamor", "Pink Oyster"], ["Columbinus", "Blue Oyster"], ["Citrinopileatus", "Golden Oyster"]],
                      ["Marasmiaceae", ["Omphalotus Olearius", "Jack-O-Lantern"]],
                      ["Physalacriaceae", ["Armillaria", "Honey Fungus"]],
                      ["Polyporaceae", ["Laetiporus Sulphureus ", "Chicken of the Woods"], ["Phaeolus Schweinitzii", "Velvet Top"], ["Grifola Frondosa", "Hen of the Woods"], ["Trametes Versicolor", "Turkey Tail"], ["Cerioporus Squamosus", "Pheasent Back"]],
                      ["Hericiaceae", ["Hericium Erinaceus", "Lions Mane"]],
                      ["Hymenogastraceae", ["Galerina Marginata", "Funeral Bell"]]]



// Mushrooms
class Mushroom extends Objects {
  constructor(x, y, genus, species) {
    super(x, y, genus);

    // Adds a random offset to the mushrooms
    this.x = x + floor(random(-8, 8));
    this.y = y + floor(random(-8, 8));

    // Stores the species name
    this.genus = genus;
    this.species = species;

    // Tile index
    this.xIndex = this.genus * 32 + (floor(random(4)) * 8);
    this.yIndex = this.species * 8;
    this.sprite = spriteMushroom;
    this.spriteSize = 8 * tileScale;
    this.objectType = 'mushroom';

    // Stores species names
    this.genusName = mushroomSpecies[this.genus][0];
    this.speciesName = mushroomSpecies[this.genus][this.species][0];
    this.commonName = mushroomSpecies[this.genus][this.species][1];
  }

    display() {
      image(this.sprite, this.x, this.y, this.spriteSize, this.spriteSize, this.xIndex, this.yIndex, 8, 8);
    }
}
