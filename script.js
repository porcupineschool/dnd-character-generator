(function () {
  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    var el = byId(id);
    if (el) {
      el.textContent = value;
    }
  }

  function fillList(id, items) {
    var el = byId(id);
    if (!el) {
      return;
    }

    el.innerHTML = "";
    for (var i = 0; i < items.length; i++) {
      var li = document.createElement("li");
      li.textContent = items[i];
      el.appendChild(li);
    }
  }

  function showError(message) {
    var panel = byId("error-panel");
    if (!panel) {
      return;
    }

    panel.hidden = false;
    panel.innerHTML = "<strong>Character generator error</strong><p class=\"small\">" + message + "</p>";
  }

  function clearError() {
    var panel = byId("error-panel");
    if (!panel) {
      return;
    }

    panel.hidden = true;
    panel.innerHTML = "";
  }

  function randomOf(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function shuffle(list) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function uniquePush(target, values) {
    for (var i = 0; i < values.length; i++) {
      if (target.indexOf(values[i]) === -1) {
        target.push(values[i]);
      }
    }
    return target;
  }

  function formatModifier(mod) {
    return (mod >= 0 ? "+" : "") + mod;
  }

  function statBlock(score) {
    return {
      score: score,
      mod: Math.floor((score - 10) / 2)
    };
  }

  function rollStatArray() {
    var scores = [];
    for (var i = 0; i < 6; i++) {
      var rolls = [];
      for (var d = 0; d < 4; d++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
      }
      rolls.sort(function (a, b) { return a - b; });
      scores.push(rolls[1] + rolls[2] + rolls[3]);
    }
    return scores.sort(function (a, b) { return b - a; });
  }

  var names = {
    given: ["Aelar", "Bryn", "Caelynn", "Doran", "Elira", "Fen", "Garrick", "Hale", "Iria", "Joran", "Kaelin", "Liora", "Marek", "Nessa", "Orin", "Perrin", "Quill", "Rhea", "Sylas", "Tarin", "Una", "Varek", "Wren", "Ysra", "Agate", "Alaric", "Alaron", "Alynd", "Alyvia", "Arabeth", "Ardra", "Asgoth", "Berryn", "Brenna", "Caryne", "Dasi", "Derrib", "Derris", "Dynie", "Errine", "Eryk", "Eryke", "Evo", "Farale", "Fausto", "Gavin", "Gavina", "Glynna", "Gorth", "Jarak", "Jasek", "Karran", "Kierst", "Kira", "Kurn", "Kyale", "Ladia", "Lan", "Ledo", "Lor", "Mavel", "Milandro", "Mora", "Moriana", "Quiss", "Sadi", "Salina", "Samia", "Sandar", "Sephya", "Sharn", "Shaundra", "Siveth", "Tarran", "Thana", "Thane", "Topaz", "Tor", "Torc", "Travys", "Trebor", "Tylien", "Valiah", "Vicart", "Zelda", "Zircon", "Kevin", "Adam", "Mark", "Rickey", "Matt", "Trouf", "Vinchy", "Ianweth", "Haneri", "Gril", "Gaphann", "Arrined", "Eldeton", "Dalcha", "Vaton", "Artonll", "Nondd", "Conton", "Dondri", "Don", "Dontto", "Wentolk", "Isstt", "Aren", "Wancke", "Keche", "Eldend", "Lyado", "Alyvot", "Asth", "Rierst", "Dyndab", "Mick", "Garr", "Sanda", "Sarr", "Seth", "Glinan", "Salera", "Var", "Zia", "Mirara", "Serc", "Tyvist", "Mamiak", "Kuisth", "Mamive", "Tynar", "Homant", "Contoo", "Eronnt", "Chas", "Menarlef", "Danord", "Brman", "Liari", "Danto", "Ederel", "Emian", "Lonrys", "Etthlyl", "Milli", "Evays", "Avanr", "Olie", "Arilac", "Jarpett", "Harayd", "Wielil", "Arianay", "Alila", "Elyahiz", "Chathab", "Daxoe", "Emeri", "Helll", "Elonri", "Olenr", "Mict", "Elone", "Amiza", "Jary", "Hendily", "Beyasoper", "Zoeri", "Lenja", "Jab", "Gare Bodvison", "Eriot", "Thugi Asvanson", "Sigfi Bardison", "Leivi", "Ostik", "Salmi", "Hari", "Munde Lifrison", "Skalfri Mundison", "Ricio", "Balda", "Conbehrt", "Munda", "Adwic", "Eardred", "Inrid", "Wine", "Beorhtio", "Aereth", "Erurh", "Gythuia", "Hilda", "Wlfricta", "Ellurh", "Elfgith", "Witha", "Eangyth", "Burga", "Wychtleue", "Raha", "Jara", "Domil", "Bora", "Ziva", "Zlada", "Bomil", "Mira", "Vlava", "Vluda", "Brichye Hyne", "Artin", "Andres Exleyth", "Edmugh", "Richye", "Groguy", "Narder", "Charder", "Groge Arkes", "Abucham", "Namhazzuu", "Arsilit", "Ninabi", "Bazzi", "Baalima", "Asmar", "Abdilin", "Biluna", "Suilitu", "Adon", "Aeris", "Afia", "Agama", "Agro", "Anika", "Annihya", "Antia", "Arlo", "Asralyn ", "Azamarr ", "Baakshi ", "Baashar ", "Barak", "Barton", "Basak", "Baske", "Baxar", "Beatha ", "Beela", "Belen", "Blaiz ", "Braithe", "Caelan", "Cassian", "Ciscra", "Clawsen", "Colborn", "Dagfinn", "Dagrod ", "Desmina", "Dessa", "Dimian", "Domnhar", "Drusila", "Ebraheim", "Eldermar", "Elysa", "Embre", "Esdel", "Esmee", "Esther", "Estyn", "Eune ", "Everen", "Fangar", "Favroe", "Feron", "Feston", "Fidess", "Fintis", "Gatlen", "Gatlin", "Gentar", "Gethrod", "Graff", "Gunnar", "Hagalbar", "Hagar", "Harper", "Hartie", "Hawke", "Hemm", "Henndar", "Heron", "Herra", "Hezra", "Hodus", "Ibera", "Indie", "Ishmael", "Jakrin", "Jareth", "Jaris", "Jather ", "Jerrick", "Jesi", "Jessop", "Jinto", "Jonna", "Joz", "Kadric", "Kagran", "Kent", "Kessa", "Ketra", "Khron", "Kontas", "Kory", "Krinn", "Krynna", "Kye", "Larke", "Lassona", "Lassrin ", "Lenox", "Leska", "Liris", "Lothe", "Lunex", "Lustros", "Lydan", "Lyla", "Lynorr", "Lynx", "Maarika", "Maeve", "Magaltie", "Mavrek", "Merula", "Minha", "Moki", "Morwena", "Naima", "Naphtalia", "Nazim", "Nesso", "Ophni", "Orett", "Pakker", "Palra", "Paquin", "Partha", "Paskel", "Pekka ", "Phlox", "Phressa", "Pike", "Pret", "Ptorik", "Quintis", "Ralia", "Rankar", "Rasy ", "Razra ", "Rei", "Renalee ", "Renham", "Resha", "Reslyn", "Revvyn", "Rhays", "Rhiannon", "Riordan", "Rivik", "Rourke", "Roux", "Rydna ", "Ryven", "Sage", "Sarkin", "Semet", "Shike", "Silene", "Soko", "Sonali", "Sparrow", "Straus", "Surane", "Syrana", "Syrin", "Taewen", "Talis", "Talon", "Tamrin", "Tekren ", "Temy", "Tessel", "Tez", "Tezani", "Thesra ", "Tisette", "Tiv", "Turi", "Turrek", "Tyvrik ", "Vadim", "Vale", "Varin", "Varog", "Vemery ", "Verssek", "Vita", "Vixra", "Weston", "Whit", "Wren", "Wulfe", "Xavia", "Yarri", "Yelina", "Yorjan", "Yuni", "Zaden", "Zagaroth", "Zara", "Zenner", "Zet"],
    family: ["Amberhide", "Briarfen", "Caskbow", "Dawnmere", "Emberfall", "Fenbrook", "Glimmershade", "Harth", "Ironroot", "Jadeeye", "Keenwhistle", "Larkspur", "Moonvale", "Netherstep", "Oakstride", "Pineward", "Quickwater", "Ravencrest", "Stonemere", "Thistleby", "Umbermoor", "Vale", "Westerglen", "Yarrow", "Agate", "Alaric", "Alaron", "Alynd", "Alyvia", "Arabeth", "Ardra", "Asgoth", "Berryn", "Brenna", "Caryne", "Dasi", "Derrib", "Derris", "Dynie", "Errine", "Eryk", "Eryke", "Evo", "Farale", "Fausto", "Gavin", "Gavina", "Glynna", "Gorth", "Jarak", "Jasek", "Karran", "Kierst", "Kira", "Kurn", "Kyale", "Ladia", "Lan", "Ledo", "Lor", "Mavel", "Milandro", "Mora", "Moriana", "Quiss", "Sadi", "Salina", "Samia", "Sandar", "Sephya", "Sharn", "Shaundra", "Siveth", "Tarran", "Thana", "Thane", "Topaz", "Tor", "Torc", "Travys", "Trebor", "Tylien", "Valiah", "Vicart", "Zelda", "Zircon", "Kevin", "Adam", "Mark", "Rickey", "Matt", "Trouf", "Vinchy", "Ianweth", "Haneri", "Gril", "Gaphann", "Arrined", "Eldeton", "Dalcha", "Vaton", "Artonll", "Nondd", "Conton", "Dondri", "Don", "Dontto", "Wentolk", "Isstt", "Aren", "Wancke", "Keche", "Eldend", "Lyado", "Alyvot", "Asth", "Rierst", "Dyndab", "Mick", "Garr", "Sanda", "Sarr", "Seth", "Glinan", "Salera", "Var", "Zia", "Mirara", "Serc", "Tyvist", "Mamiak", "Kuisth", "Mamive", "Tynar", "Homant", "Contoo", "Eronnt", "Chas", "Menarlef", "Danord", "Brman", "Liari", "Danto", "Ederel", "Emian", "Lonrys", "Etthlyl", "Milli", "Evays", "Avanr", "Olie", "Arilac", "Jarpett", "Harayd", "Wielil", "Arianay", "Alila", "Elyahiz", "Chathab", "Daxoe", "Emeri", "Helll", "Elonri", "Olenr", "Mict", "Elone", "Amiza", "Jary", "Hendily", "Beyasoper", "Zoeri", "Lenja", "Jab", "Gare Bodvison", "Eriot", "Thugi Asvanson", "Sigfi Bardison", "Leivi", "Ostik", "Salmi", "Hari", "Munde Lifrison", "Skalfri Mundison", "Ricio", "Balda", "Conbehrt", "Munda", "Adwic", "Eardred", "Inrid", "Wine", "Beorhtio", "Aereth", "Erurh", "Gythuia", "Hilda", "Wlfricta", "Ellurh", "Elfgith", "Witha", "Eangyth", "Burga", "Wychtleue", "Raha", "Jara", "Domil", "Bora", "Ziva", "Zlada", "Bomil", "Mira", "Vlava", "Vluda", "Brichye Hyne", "Artin", "Andres Exleyth", "Edmugh", "Richye", "Groguy", "Narder", "Charder", "Groge Arkes", "Abucham", "Namhazzuu", "Arsilit", "Ninabi", "Bazzi", "Baalima", "Asmar", "Abdilin", "Biluna", "Suilitu", "Adon", "Aeris", "Afia", "Agama", "Agro", "Anika", "Annihya", "Antia", "Arlo", "Asralyn ", "Azamarr ", "Baakshi ", "Baashar ", "Barak", "Barton", "Basak", "Baske", "Baxar", "Beatha ", "Beela", "Belen", "Blaiz ", "Braithe", "Caelan", "Cassian", "Ciscra", "Clawsen", "Colborn", "Dagfinn", "Dagrod ", "Desmina", "Dessa", "Dimian", "Domnhar", "Drusila", "Ebraheim", "Eldermar", "Elysa", "Embre", "Esdel", "Esmee", "Esther", "Estyn", "Eune ", "Everen", "Fangar", "Favroe", "Feron", "Feston", "Fidess", "Fintis", "Gatlen", "Gatlin", "Gentar", "Gethrod", "Graff", "Gunnar", "Hagalbar", "Hagar", "Harper", "Hartie", "Hawke", "Hemm", "Henndar", "Heron", "Herra", "Hezra", "Hodus", "Ibera", "Indie", "Ishmael", "Jakrin", "Jareth", "Jaris", "Jather ", "Jerrick", "Jesi", "Jessop", "Jinto", "Jonna", "Joz", "Kadric", "Kagran", "Kent", "Kessa", "Ketra", "Khron", "Kontas", "Kory", "Krinn", "Krynna", "Kye", "Larke", "Lassona", "Lassrin ", "Lenox", "Leska", "Liris", "Lothe", "Lunex", "Lustros", "Lydan", "Lyla", "Lynorr", "Lynx", "Maarika", "Maeve", "Magaltie", "Mavrek", "Merula", "Minha", "Moki", "Morwena", "Naima", "Naphtalia", "Nazim", "Nesso", "Ophni", "Orett", "Pakker", "Palra", "Paquin", "Partha", "Paskel", "Pekka ", "Phlox", "Phressa", "Pike", "Pret", "Ptorik", "Quintis", "Ralia", "Rankar", "Rasy ", "Razra ", "Rei", "Renalee ", "Renham", "Resha", "Reslyn", "Revvyn", "Rhays", "Rhiannon", "Riordan", "Rivik", "Rourke", "Roux", "Rydna ", "Ryven", "Sage", "Sarkin", "Semet", "Shike", "Silene", "Soko", "Sonali", "Sparrow", "Straus", "Surane", "Syrana", "Syrin", "Taewen", "Talis", "Talon", "Tamrin", "Tekren ", "Temy", "Tessel", "Tez", "Tezani", "Thesra ", "Tisette", "Tiv", "Turi", "Turrek", "Tyvrik ", "Vadim", "Vale", "Varin", "Varog", "Vemery ", "Verssek", "Vita", "Vixra", "Weston", "Whit", "Wren", "Wulfe", "Xavia", "Yarri", "Yelina", "Yorjan", "Yuni", "Zaden", "Zagaroth", "Zara", "Zenner", "Zet"]
  };

  var species = [
    { name: "Human", speed: 30, size: "Medium", traits: ["Resourceful", "Versatile outlook", "One extra language"], bonusSkills: 1 },
    { name: "Dwarf", speed: 25, size: "Medium", traits: ["Darkvision", "Dwarven resilience", "Stonecunning instinct"], resistances: ["Poison"] },
    { name: "Elf", speed: 30, size: "Medium", traits: ["Darkvision", "Fey ancestry", "Keen senses", "Trance"], bonusSkills: 1 },
    { name: "Halfling", speed: 25, size: "Small", traits: ["Brave", "Halfling nimbleness", "Lucky"] },
    { name: "Gnome", speed: 25, size: "Small", traits: ["Darkvision", "Gnome cunning"], bonusSkills: 1 },
    { name: "Half-Orc", speed: 30, size: "Medium", traits: ["Darkvision", "Relentless endurance", "Savage attacks", "Intimidating presence"] },
    { name: "Tiefling", speed: 30, size: "Medium", traits: ["Darkvision", "Hellish resistance", "Thaumaturgic flair"], resistances: ["Fire"] },
    { name: "Dragonborn", speed: 30, size: "Medium", traits: ["Draconic ancestry", "Breath weapon", "Damage resistance"], resistances: ["Elemental damage from ancestry"] }
  ];

  var backgrounds = [
    { name: "Acolyte", skillProficiencies: ["Insight", "Religion"], languages: 2, gear: ["Holy symbol", "Prayer book", "Vestments", "5 sticks of incense"], hook: "A temple raised you to believe every stranger might be a test of your character." },
    { name: "Criminal", skillProficiencies: ["Deception", "Stealth"], tools: ["Thieves' tools"], gear: ["Dark clothes", "Crowbar", "Hidden pouch"], hook: "You know how quickly trouble spreads through alleys and taverns." },
    { name: "Entertainer", skillProficiencies: ["Acrobatics", "Performance"], tools: ["Disguise kit", "Musical instrument"], gear: ["Costume", "Favor from an admirer", "Instrument"], hook: "Every room is a stage, and you refuse to waste an audience." },
    { name: "Folk Hero", skillProficiencies: ["Animal Handling", "Survival"], tools: ["Artisan's tools", "Vehicles (land)"], gear: ["Shovel", "Iron pot", "Common clothes"], hook: "Ordinary people trust you because you once stood up when nobody else would." },
    { name: "Sage", skillProficiencies: ["Arcana", "History"], languages: 2, gear: ["Bottle of ink", "Quill", "Small knife", "Letter from a colleague"], hook: "Knowledge is never just trivia to you; it is leverage." },
    { name: "Soldier", skillProficiencies: ["Athletics", "Intimidation"], tools: ["Gaming set", "Vehicles (land)"], gear: ["Insignia", "Bone dice", "Common clothes"], hook: "You measure chaos by who keeps moving when the plan falls apart." }
  ];

  var classes = [
    { name: "Barbarian", primary: ["Strength", "Constitution"], savingThrows: ["Strength", "Constitution"], armor: ["Light armor", "Medium armor", "Shields"], weapons: ["Simple weapons", "Martial weapons"], skillChoices: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"], chooseSkills: 2, equipment: ["Greataxe", "Two handaxes", "Explorer's pack", "Four javelins"], features: ["Rage (2/day)", "Unarmored Defense"], attacks: ["Greataxe +5 to hit, 1d12 + STR slashing", "Javelin +5 to hit, 1d6 + STR piercing (30/120)"], ac: function (stats) { return Math.max(10 + stats.Dexterity.mod + stats.Constitution.mod, 14); }, hp: function (stats) { return 12 + stats.Constitution.mod; } },
    { name: "Bard", primary: ["Charisma", "Dexterity"], savingThrows: ["Dexterity", "Charisma"], armor: ["Light armor"], weapons: ["Simple weapons", "Hand crossbows", "Longswords", "Rapiers", "Shortswords"], skillChoices: ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"], chooseSkills: 3, equipment: ["Rapier", "Dagger", "Lute", "Entertainer's pack", "Leather armor"], features: ["Bardic Inspiration (d6, 3/day)", "Spellcasting"], attacks: ["Rapier +4 to hit, 1d8 + DEX piercing", "Dagger +4 to hit, 1d4 + DEX piercing (20/60)"], spells: ["Cantrips: Vicious Mockery, Mage Hand", "1st level: Cure Wounds, Dissonant Whispers, Faerie Fire, Healing Word"], ac: function (stats) { return 11 + stats.Dexterity.mod; }, hp: function (stats) { return 8 + stats.Constitution.mod; } },
    { name: "Cleric", primary: ["Wisdom", "Constitution"], savingThrows: ["Wisdom", "Charisma"], armor: ["Light armor", "Medium armor", "Shields"], weapons: ["Simple weapons"], skillChoices: ["History", "Insight", "Medicine", "Persuasion", "Religion"], chooseSkills: 2, equipment: ["Mace", "Scale mail", "Shield", "Holy symbol", "Priest's pack"], features: ["Spellcasting", "Divine Domain"], attacks: ["Mace +4 to hit, 1d6 + STR bludgeoning", "Sacred Flame, DC 13 Dexterity save"], spells: ["Cantrips: Guidance, Sacred Flame, Thaumaturgy", "Prepared: Bless, Cure Wounds, Guiding Bolt, Healing Word, Sanctuary"], ac: function () { return 18; }, hp: function (stats) { return 8 + stats.Constitution.mod; } },
    { name: "Fighter", primary: ["Strength", "Constitution"], savingThrows: ["Strength", "Constitution"], armor: ["All armor", "Shields"], weapons: ["Simple weapons", "Martial weapons"], skillChoices: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"], chooseSkills: 2, equipment: ["Chain mail", "Shield", "Longsword", "Light crossbow", "Dungeoneer's pack"], features: ["Fighting Style (Defense)", "Second Wind"], attacks: ["Longsword +5 to hit, 1d8 + STR slashing", "Light crossbow +3 to hit, 1d8 + DEX piercing (80/320)"], ac: function () { return 19; }, hp: function (stats) { return 10 + stats.Constitution.mod; } },
    { name: "Rogue", primary: ["Dexterity", "Charisma"], savingThrows: ["Dexterity", "Intelligence"], armor: ["Light armor"], weapons: ["Simple weapons", "Hand crossbows", "Longswords", "Rapiers", "Shortswords"], skillChoices: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"], chooseSkills: 4, equipment: ["Rapier", "Shortbow", "Quiver with 20 arrows", "Thieves' tools", "Burglar's pack", "Leather armor"], features: ["Expertise", "Sneak Attack (1d6)", "Thieves' Cant"], attacks: ["Rapier +5 to hit, 1d8 + DEX piercing", "Shortbow +5 to hit, 1d6 + DEX piercing (80/320)"], ac: function (stats) { return 11 + stats.Dexterity.mod; }, hp: function (stats) { return 8 + stats.Constitution.mod; } },
    { name: "Wizard", primary: ["Intelligence", "Dexterity"], savingThrows: ["Intelligence", "Wisdom"], armor: ["None"], weapons: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light crossbows"], skillChoices: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"], chooseSkills: 2, equipment: ["Quarterstaff", "Spellbook", "Arcane focus", "Scholar's pack"], features: ["Spellcasting", "Arcane Recovery"], attacks: ["Quarterstaff +2 to hit, 1d6 bludgeoning", "Fire Bolt +5 to hit, 1d10 fire"], spells: ["Cantrips: Fire Bolt, Mage Hand, Minor Illusion", "Prepared: Detect Magic, Mage Armor, Magic Missile, Shield, Sleep, Thunderwave"], ac: function (stats) { return Math.max(10 + stats.Dexterity.mod, 13 + stats.Dexterity.mod); }, hp: function (stats) { return 6 + stats.Constitution.mod; } }
  ];

  var allSkills = ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"];
  var latestSummary = "";

  function determineClass() {
    return randomOf(classes);
  }

  function assignScores(baseScores, chosenClass) {
    var priority = chosenClass.primary.concat(["Dexterity", "Wisdom", "Constitution", "Charisma", "Intelligence", "Strength"]);
    var order = [];
    uniquePush(order, priority);
    uniquePush(order, ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]);

    var assigned = {};
    for (var i = 0; i < order.length; i++) {
      assigned[order[i]] = statBlock(baseScores[i]);
    }
    return assigned;
  }

  function chooseSkills(chosenClass, background, chosenSpecies) {
    var picked = [];
    uniquePush(picked, background.skillProficiencies);
    var classPool = shuffle(chosenClass.skillChoices);
    for (var i = 0; i < classPool.length && picked.length < background.skillProficiencies.length + chosenClass.chooseSkills; i++) {
      uniquePush(picked, [classPool[i]]);
    }

    if (chosenSpecies.bonusSkills) {
      var extraPool = shuffle(allSkills.filter(function (skill) {
        return picked.indexOf(skill) === -1;
      }));
      for (var j = 0; j < chosenSpecies.bonusSkills && j < extraPool.length; j++) {
        uniquePush(picked, [extraPool[j]]);
      }
    }

    return picked.sort();
  }

  function languageCount(background, chosenSpecies) {
    return (background.languages || 0) + (chosenSpecies.name === "Human" ? 1 : 0) + 1;
  }

  function passivePerception(skills, stats) {
    return 10 + stats.Wisdom.mod + (skills.indexOf("Perception") >= 0 ? 2 : 0);
  }

  function proficiencySummary(skills, chosenClass, background) {
    var lines = [];
    lines.push("Armor: " + chosenClass.armor.join(", "));
    lines.push("Weapons: " + chosenClass.weapons.join(", "));
    if (background.tools && background.tools.length) {
      lines.push("Tools: " + background.tools.join(", "));
    }
    lines.push("Saving Throws: " + chosenClass.savingThrows.join(", "));
    lines.push("Skills: " + skills.join(", "));
    return lines;
  }

  function buildCharacter() {
    var baseScores = rollStatArray();
    var chosenClass = determineClass();
    var chosenSpecies = randomOf(species);
    var background = randomOf(backgrounds);
    var stats = assignScores(baseScores, chosenClass);
    var skills = chooseSkills(chosenClass, background, chosenSpecies);
    var hp = Math.max(1, chosenClass.hp(stats));
    var ac = chosenClass.ac(stats);
    var initiative = stats.Dexterity.mod;
    var name = randomOf(names.given) + " " + randomOf(names.family);
    var detailHook = randomOf([
      "Quietly collecting debts from a promise made long ago.",
      "Trying to prove a family legend was true all along.",
      "Certain that one strange omen means destiny has started moving.",
      "Adventuring to pay back the people who once sheltered you.",
      "Looking for a missing mentor whose last letter made no sense.",
      "Convinced your talents should matter for more than survival."
    ]);

    return {
      name: name,
      level: 1,
      ancestry: chosenSpecies,
      roleClass: chosenClass,
      background: background,
      stats: stats,
      skills: skills,
      hp: hp,
      ac: ac,
      speed: chosenSpecies.speed,
      initiative: initiative,
      proficiencyBonus: 2,
      languages: languageCount(background, chosenSpecies),
      passivePerception: passivePerception(skills, stats),
      proficiencies: proficiencySummary(skills, chosenClass, background),
      gear: uniquePush([], chosenClass.equipment.concat(background.gear || [])),
      traits: uniquePush([], chosenSpecies.traits.concat(chosenClass.features)),
      attacks: chosenClass.attacks,
      spells: chosenClass.spells || [],
      summary: background.hook + " " + detailHook
    };
  }

  function render(character) {
    clearError();

    var crest = {
      Barbarian: "Axe",
      Bard: "Lyre",
      Cleric: "Sun",
      Fighter: "Blade",
      Rogue: "Dagger",
      Wizard: "Star"
    }[character.roleClass.name] || "d20";

    setText("character-meta-top", "Level " + character.level + " " + character.ancestry.name);
    setText("character-name", character.name);
    setText("character-tagline", character.roleClass.name + " • " + character.background.name + " • " + character.ancestry.size + " • " + character.speed + " ft. speed");
    setText("character-crest", crest);

    setText("hp-value", String(character.hp));
    setText("ac-value", String(character.ac));
    setText("initiative-value", formatModifier(character.initiative));
    setText("passive-value", String(character.passivePerception));

    setText("str-score", String(character.stats.Strength.score));
    setText("str-mod", "Mod " + formatModifier(character.stats.Strength.mod));
    setText("dex-score", String(character.stats.Dexterity.score));
    setText("dex-mod", "Mod " + formatModifier(character.stats.Dexterity.mod));
    setText("con-score", String(character.stats.Constitution.score));
    setText("con-mod", "Mod " + formatModifier(character.stats.Constitution.mod));
    setText("int-score", String(character.stats.Intelligence.score));
    setText("int-mod", "Mod " + formatModifier(character.stats.Intelligence.mod));
    setText("wis-score", String(character.stats.Wisdom.score));
    setText("wis-mod", "Mod " + formatModifier(character.stats.Wisdom.mod));
    setText("cha-score", String(character.stats.Charisma.score));
    setText("cha-mod", "Mod " + formatModifier(character.stats.Charisma.mod));

    setText("proficiency-bonus", "+" + character.proficiencyBonus);
    setText("languages-total", character.languages + " total");
    setText("saving-throws", character.roleClass.savingThrows.join(", "));
    setText("resistances", (character.ancestry.resistances || ["None"]).join(", "));
    setText("character-hook", character.summary);

    fillList("traits-list", character.traits);
    fillList("attacks-list", character.attacks);
    fillList("proficiencies-list", character.proficiencies);
    fillList("gear-list", character.gear);
    fillList("skills-list", character.skills);

    var spellsList = byId("spells-list");
    var noSpells = byId("no-spells-message");
    if (character.spells.length) {
      fillList("spells-list", character.spells);
      if (noSpells) {
        noSpells.hidden = true;
      }
      if (spellsList) {
        spellsList.hidden = false;
      }
    } else {
      fillList("spells-list", []);
      if (spellsList) {
        spellsList.hidden = true;
      }
      if (noSpells) {
        noSpells.hidden = false;
      }
    }

    latestSummary = [
      character.name + " - Level 1 " + character.ancestry.name + " " + character.roleClass.name,
      "Background: " + character.background.name,
      "HP " + character.hp + " | AC " + character.ac + " | Speed " + character.speed + " ft. | Initiative " + formatModifier(character.initiative),
      "STR " + character.stats.Strength.score + " (" + formatModifier(character.stats.Strength.mod) + "), DEX " + character.stats.Dexterity.score + " (" + formatModifier(character.stats.Dexterity.mod) + "), CON " + character.stats.Constitution.score + " (" + formatModifier(character.stats.Constitution.mod) + "), INT " + character.stats.Intelligence.score + " (" + formatModifier(character.stats.Intelligence.mod) + "), WIS " + character.stats.Wisdom.score + " (" + formatModifier(character.stats.Wisdom.mod) + "), CHA " + character.stats.Charisma.score + " (" + formatModifier(character.stats.Charisma.mod) + ")",
      "Skills: " + character.skills.join(", "),
      "Features: " + character.traits.join(", "),
      "Attacks: " + character.attacks.join(" | "),
      (character.spells.length ? "Spells: " + character.spells.join(" | ") : "Spells: none"),
      "Gear: " + character.gear.join(", "),
      "Hook: " + character.summary
    ].join("\n");

    setText("summary-box", latestSummary);
  }

  function copySummary() {
    var button = byId("copy-btn");
    if (!latestSummary || !navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(latestSummary).then(function () {
      if (!button) {
        return;
      }
      button.textContent = "Copied";
      setTimeout(function () {
        button.textContent = "Copy Summary";
      }, 1400);
    });
  }

  function setup() {
    try {
      var generateButton = byId("generate-btn");
      var copyButton = byId("copy-btn");

      if (generateButton) {
        generateButton.addEventListener("click", function () {
          render(buildCharacter());
        });
      }

      if (copyButton) {
        copyButton.addEventListener("click", copySummary);
      }

      render(buildCharacter());
    } catch (error) {
      showError(error && error.message ? error.message : "Unknown JavaScript error.");
      if (window.console && console.error) {
        console.error("D&D character generator failed to render.", error);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
