// service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((reg) => {
      console.log("registered", reg);
    })
    .catch((err) => {
      console.log("didnt reg");
    });
}

// play
const playBtn = document.querySelector(".btn--play");
const playCard = document.querySelector(".play__intro");
// splash
const audio = document.querySelector("audio");
const splash = document.querySelector(".splash__intro");
playBtn.addEventListener("click", () => {
  playCard.classList.add("d-none");
  splash.classList.remove("d-none");
  audio.play();
  setTimeout(() => {
    splash.classList.add("display-none");
    optionsCard.classList.remove("d-none");
    splash.style.zIndex = "-100";
  }, 3000);
});
// document.addEventListener("DOMContentLoaded", (e) => {
//   setTimeout(() => {
//     splash.classList.add("display-none");
//     optionsCard.classList.remove("d-none");
//   }, 3000);
// });
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
  {
    roleName: "Cupidon",
    id: 7,
    desc: "Son objectif est d'éliminer tous les Loups-Garous. Dès le début de la partie, il doit former un couple de deux joueurs. Leur objectif sera de survivre ensemble, car si l'un d'eux meurt, l'autre se suicidera.",
  },
  {
    roleName: "Salvateur",
    id: 8,
    desc: "Son objectif est d'éliminer tous les Loups-Garous. Chaque nuit, il peut protéger quelqu'un de l'attaque des Loups-Garous...",
  },
  {
    roleName: "Père des Loups",
    id: 9,
    desc: "Son objectif est d'éliminer tous les innocents. il se réunit avec ses compères Loups pour décider d'une victime à éliminer... Une fois dans la partie, il peut transformer la victime en loup-garou !",
  },
  {
    roleName: "Corbeau",
    id: 10,
    desc: "Son objectif est d'éliminer tous les Loups-Garous. Chaque nuit, il peut désigner un joueur, qui se retrouvera le lendemain avec deux voix contre lui au vote",
  },
  {
    roleName: "Ancien",
    id: 11,
    desc: "Son objectif est d'éliminer tous les Loups-Garous.Il peut résister à la première attaque des loups.Mais s'il est tué par un ou des innocent(s),tous les innocents perdront leurs pouvoirs!",
  },
  {
    roleName: "Enfant Sauvage",
    id: 12,
    desc: "Son objectif est d'éliminer tous les Loups-Garous.Il choisit un modèle au début du jeu, si ce dernier meurt, il devient Loup-Garou et joue dans leur camp.",
  },
];
// submit options

const submitForm = document.querySelector("form");
const card = document.querySelector(".card");
const optionsCard = document.querySelector(".options__card");
const body = document.querySelector("body");
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
const usedRolesNames = [];
submitForm.addEventListener("submit", (e) => {
  body.style.height = "100vh";
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
  usedRoles.forEach((usedRole) => {
    usedRolesNames.push(usedRole.roleName);
  });
  console.log(usedRolesNames);
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
const rolesCard = document.querySelector(".roles__card");
const rolesCardList = document.querySelector(".roles__list");
hideBtn.addEventListener("click", () => {
  roleImage.src = `assets/hidden.png`;
  roleName.textContent = "Ton Rôle";
  roleDesc.textContent = "une description de votre rôle";
  button.classList.remove("d-none");
  hideBtn.classList.add("d-none");
  if (currentPlayerNumber === playersNumber) {
    card.classList.add("d-none");
    rolesCard.classList.remove("d-none");
    // delete duplicates
    const usedRolesNamesMin = [];
    for (let i = 0; i < usedRolesNames.length; i++) {
      if (usedRolesNamesMin.indexOf(usedRolesNames[i]) === -1) {
        usedRolesNamesMin.push(usedRolesNames[i]);
      }
    }
    usedRolesNamesMin.forEach((usedRolesName) => {
      rolesCardList.innerHTML += `<li>${usedRolesName}</li>`;
    });
  }
});
