// generate a random number

const randomNumber = () => {
  return Math.floor(Math.random() * usedRoles.length);
};

// roles list

const rolesList = [
  {
    roleName: "Simple Villageois",
    id: 1,
    desc: "Son objectif est d'éliminer tous les Loups-Garous. Il ne dispose d'aucun pouvoir particulier : uniquement sa perspicacité et sa force de persuasion.",
  },
  {
    roleName: "Loup Garou",
    id: 2,
    desc: "Son objectif est d'éliminer tous les innocents (ceux qui ne sont pas Loups-Garous). Chaque nuit, il se réunit avec ses compères Loups pour décider d'une victime à éliminer...",
  },
  {
    roleName: "La Voyante",
    id: 3,
    desc: "Son objectif est d'éliminer tous les Loups-Garous. Chaque nuit, elle peut espionner un joueur et découvrir sa véritable identité...",
  },
  {
    roleName: "La Sorciere",
    id: 4,
    desc: "Son objectif est d'éliminer tous les Loups-Garous. Elle dispose de deux potions : une potion de vie pour sauver la victime des Loups, et une potion de mort pour assassiner quelqu'un.",
  },
  {
    roleName: "Chasseur",
    id: 5,
    desc: "Son objectif est d'éliminer tous les Loups-Garous. A sa mort, il doit éliminer un joueur en utilisant sa dernière balle...",
  },
  {
    roleName: "Voleur",
    id: 6,
    desc: "Son objectif n'est pas fixe : il peut choisir son rôle parmi les deux cartes qui n'ont pas encore été distribuées.",
  },
];
// submit options

const submitForm = document.querySelector("form");
const card = document.querySelector(".card");
const optionsCard = document.querySelector(".options__card");
const usedRolesId = [];
const usedRoles = [
  {
    roleName: "Simple Villageois",
    id: 1,
    desc: "Son objectif est d'éliminer tous les Loups-Garous. Il ne dispose d'aucun pouvoir particulier : uniquement sa perspicacité et sa force de persuasion.",
  },
  {
    roleName: "Loup Garou",
    id: 2,
    desc: "Son objectif est d'éliminer tous les innocents (ceux qui ne sont pas Loups-Garous). Chaque nuit, il se réunit avec ses compères Loups pour décider d'une victime à éliminer...",
  },
];
const counter = document.querySelector(".counter");
let playersNumber = 0;
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const checkboxArray = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  );
  checkboxArray.forEach((checked) => {
    usedRolesId.push(parseInt(checked.id));
  });
  const villagerNumber = parseInt(submitForm.role1.value);
  const werewolfNumber = parseInt(submitForm.role2.value);
  const powersNumber = checkboxArray.length;
  playersNumber = villagerNumber + werewolfNumber + powersNumber;
  card.classList.remove("d-none");
  optionsCard.classList.add("d-none");
  // filter roles
  usedRolesId.forEach((usedId) => {
    usedRoles.push(rolesList[usedId - 1]);
  }); // adds roles to usedRoles
  for (let i = 0; i < villagerNumber - 1; i++) {
    usedRoles.push(rolesList[0]);
  } // adds villagers to usedRoles
  for (let i = 0; i < werewolfNumber - 1; i++) {
    usedRoles.push(rolesList[1]);
  } // adds werewolfs to usedRoles
  console.log(usedRoles);
});

// generate random role
const generateRole = () => {
  const randomRole = usedRoles[randomNumber()];
  return randomRole;
};

// change role ( final step )

const roleImage = document.querySelector(".card__img img");
const button = document.querySelector(".role__btn");
const roleName = document.querySelector(".card__info-name");
const roleDesc = document.querySelector(".card__info-desc");
let currentPlayerNumber = 0;
button.addEventListener("click", () => {
  const randomRole = generateRole();
  usedRoles.splice(usedRoles.indexOf(randomRole), 1); // deletes role that pops
  roleImage.src = `assets/role${randomRole.id}.png`;
  roleName.textContent = randomRole.roleName;
  roleDesc.textContent = randomRole.desc;
  currentPlayerNumber++;
  counter.textContent = `${currentPlayerNumber} / ${playersNumber}`;
  button.classList.add("d-none");
  hideBtn.classList.remove("d-none");
});
// hide info
const hideBtn = document.querySelector(".hide__btn");
hideBtn.addEventListener("click", () => {
  roleImage.src = `assets/hidden.png`;
  roleName.textContent = "Ton Rôle";
  roleDesc.textContent = "une description de votre rôle";
  button.classList.remove("d-none");
  hideBtn.classList.add("d-none");
  if (currentPlayerNumber === playersNumber) {
    card.innerHTML = `<h1>Game started</h1>`;
  }
});
