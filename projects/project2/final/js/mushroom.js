


let mushroomSpecies =

[["Amanita",
["Muscaria", "Fly Agaric", "Toxic if raw", "Fields", "Red cap", "White spots", "White stem", "White gills"],
["Guessowii", "Yellow Fly Agaric", "Toxic if raw", "Fields", "Yellow cap", "White spots", "White stem", "White gills"],
["Pantherina", "Panther Cap", "Toxic if raw", "Fields", "Brown cap", "White spots", "White stem", "White gills"],
["Phalloides", "Death Cap", "Deadly", "Fields", "Yellow/brown cap", "White stem", "White gills"],
["Virosa", "Destroying Angel", "Deadly",  "Fields", "Purely white", "White stem", "White gills"]],

["Agaricus",
["Bisporus", "Button Mushroom", "Edible", "Fields", "Light brown cap", "Round when young", "Pinkish gills", "White stem"],
["Stropharia", "Wine Cap", "Edible", "Fields", "Pink cap", "Round when young", "Magenta gills","White stem" ],
["Campestris", "Field Mushroom", "Edible", "Fields", "Light brown cap", "Round when young", "Purple gills", "White stem"]],

["Cantharellus",
["Cibarius", "Golden Chantrelle", "Edible", "Fields", "Fully orange", "Forked gills","Smells like apricots"]],

["Polyporaceae",
["Laetiporus Sulphureus ", "Chicken of the Woods", "Edible", "Trees", "Yellow/orange", "Striped", "Grows in large brackets", "Smells like lemon"],
["Phaeolus Schweinitzii", "Velvet Top", "Toxic", "Trees", "Pinkish white", "Striped", "Grows in large brackets"],
["Grifola Frondosa", "Hen of the Woods", "Edible", "Trees", "Light brown and grey", "Striped", "Grows in small brackets"],
["Trametes Versicolor", "Turkey Tail", "Edible", "Trees", "Dark/light brown", "Striped", "Grows in small brackets"],
["Cerioporus Squamosus", "Pheasent Back", "Edible", "Trees", "Yellowish brown", "Spotted flesh", "Smells like cucumber"]],

["Pleurotus",
["Ostreatus", "Pearl Oyster"],
["Djamor", "Pink Oyster"],
["Columbinus", "Blue Oyster"],
["Citrinopileatus", "Golden Oyster"]],

["Marasmiaceae",
["Omphalotus Olearius", "Jack-O-Lantern"]],

["Physalacriaceae",
["Armillaria", "Honey Fungus"]],

["Hericiaceae",
["Hericium Erinaceus", "Lions Mane"]],

["Hymenogastraceae",
["Galerina Marginata", "Funeral Bell"]]]



// Mushrooms
class Mushroom extends Objects {
  constructor(x, y, genus, species) {
    super(x, y, genus);

    // Adds a random offset to the mushrooms
    this.x = x + floor(random(-8, 8));
    this.y = y + floor(random(-8, 8));
    this.genus = genus;
    this.species = species;
    this.show = true;

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
    if (this.show) {
      image(this.sprite, this.x, this.y, this.spriteSize, this.spriteSize, this.xIndex, this.yIndex, 8, 8);
    }
  }
}
