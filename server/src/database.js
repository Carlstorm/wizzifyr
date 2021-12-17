import mongoose from "mongoose";
import User from "./models/userModel.js";
import Wish from "./models/wishModel.js";
import bcrypt from "bcrypt";

export async function connectDatabase() {
  const connectionString = process.env.MONGODB_URL;

  if (!connectionString) {
    throw new Error(
      "MONGODB_URL not set as environment variable. Please configure it in an .env file."
    );
  }

  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function seedWishes() {
  const wishCount = await Wish.countDocuments();
  if (wishCount === 0) {
    const defaultWishes = [
    {
      name: "Lenovo ThinkPad E15 Gen",
      details: `Core i5 1135G7 / 2.4 GHz, Win 10 Pro 64-bit, 8 GB RAM, 256 GB SSD NVMe, 15.6" IPS 1920 x 1080 (Full HD), Iris Xe Graphics, Wi-Fi 6, Bluetooth, sort, kbd: Nordisk, med Co2 Offset 0.5 ton`,
      img: "https://www.proshop.dk/Images/300x251/2909807_837d9e518b09.jpg",
      links: ["https://www.proshop.dk/Baerbar/Lenovo-ThinkPad-E15-Gen-2-Intel-Core-i5-1135G7-8-GB-RAM/2909807"],
      liked: false,
      received: false,
      date: new Date(),
      comments: [{author: "a person who comments", comment: "meget fin", date: new Date()}]
    },
    {
      name: "Lenovo ThinkCentre M715q Tiny Refurbished",
      details: `Lille, A10 8730B / 2.4 GHz, RAM 8 GB, SSD 256 GB, Radeon 530, GigE, WLAN: 802.11a/b/g/n/ac, Bluetooth 4.2, Win 10 Pro, skærm: ingen, sort, istandsat`,
      img: "https://www.proshop.dk/Images/300x251/2935561_4cc3b32e5d85.jpg",
      links: ["https://www.proshop.dk/Stationaer-PC-Mac/Lenovo-ThinkCentre-M715q-Tiny-Refurbished-8-GB-RAM-256GB-SSD/2935561"],
      liked: false,
      received: false,
      date: new Date(),
      comments: [{author: "a person who comments", comment: "meget fin og godt", date: new Date()}]
    },
    {
      name: "WMF Provence Grydesæt",
      details: `Sættet indeholder 9 dele inkl. låg: Lav gryde (Ø20 cm. / 3 liter) med glaslåg, høj gryde (Ø16 cm. / 2 liter) med glaslåg, høj gryde (Ø20 cm. / 3,5 liter) med glaslåg, høj gryde (Ø24 cm. / 6 liter) med glaslåg og kasserolle (Ø16 cm. / 1,5 liter), Egnet til ceran-, gas-, elektriske og induktionskomfurer, Varmebestandig op til 250 °C (på komfur) og 70 °C (i ovn)
      Gryderne i serien Provence Plus fra WMF, som er forsynet med gennemsigtigt låg, egner sig perfekt til madlavning, hvor du både kan spare på vandet og energien. Cromargan®-kogegrejet indeholder mange brugskvaliteter. Det rustfrie kvalitetsstål Cromargan® bliver ved med at være robust - også selvom det bruges hver dag - det er modstandsdygtigt over for både ridser og stød, det er smagsneutralt, let at vedligeholde, kan tåle opvaskemaskine og er ligeledes yderst hygiejnisk. Gryderne er gennemført helt ned til mindste detalje, og de er forsynet med TransTherm®-universalbund, som er egnet til alle typer komfurer, inkl. induktion. De ergonomiske greb af rustfrit stål og deres moderne design passer ind i ethvert køkken. Endelig sikrer beskyttelseskanten, at du kan hælde væsken fra uden problemer.`,
      img: "https://www.proshop.dk/Images/300x251/2675732_8d7d9beaaaa7.jpg",
      links: ["https://www.proshop.dk/Gryder/WMF-Provence-Grydesaet/2675732?cid=62d8c20a-ecfb-4d79-881c-da70c96ae80f"],
      liked: false,
      received: false,
      date: new Date(),
      comments: [{author: "a person who comments", comment: "meget fin og godt og dejlig", date: new Date()}]
    },
    {
      name: "Apple iPad Wi-Fi 256 GB - Space Grey",
      details: `Powerfuld. Nem at bruge. Og klar til det hele. Den nye iPad har en smuk 10,2" Retina-skærm, en stærk A13 Bionic-chip, et forsidekamera med ultravidvinkel og I fokus-funktion, og så virker den med Apple Pencil og Smart Keyboard.`,
      img: "https://sg-dam.imgix.net/services/assets.img/id/b3ca7f91-73ea-4099-a2e1-9e68f01794c7/size/original?w=900&h=900&auto=format&fm=jpg&q=60",
      links: ["https://www.foetex.dk/produkter/apple-ipad-wi-fi-256-gb-space-grey/200055042/"],
      liked: false,
      received: false,
      date: new Date(),
      comments: [{author: "a person who comments", comment: "meget fin og godt og dejlig og rar", date: new Date()}]
    },
    {
      name: "Electrolux ESP72DB støvsuger, 600W",
      details: `Electrolux SilentPerformer er designet med fokus på lydsvaghed og med Dustpro silent mundstykke sikres en yderst lydsvag rengøring. Med ekstra lang ledning på 9 meter, kan du rengøre flere rum på én gang. Fremragende støvoptag på hårde gulve. - Silence Pro System™`,
      img: "https://sg-dam.imgix.net/services/assets.img/id/0f31108c-4109-4e62-abf2-5c13daf1ea85/size/original?w=100&h=100&auto=format&fm=jpg&q=60",
      links: ["https://www.foetex.dk/produkter/electrolux-esp72db-stoevsuger-600w/100311181/"],
      liked: false,
      received: false,
      date: new Date(),
      comments: [{author: "a person who comments", comment: "meget fin og godt og dejlig og rar og nice", date: new Date()}]
    },
    {
      name: "lazyitem1",
      details: "lazyitem1 details",
      img: "",
      links: [],
      liked: false,
      date: new Date(),
      comments: []
    },
    {
      name: "lazyitem2",
      details: "lazyitem2 details",
      img: "",
      links: [],
      liked: false,
      date: new Date(),
      comments: []
    },
    {
      name: "lazyitem3",
      details: "lazyitem3 details",
      img: "",
      links: [],
      liked: false,
      date: new Date(),
      comments: []
    },
    {
      name: "lazyitem4",
      details: "lazyitem4 details",
      img: "",
      links: [],
      liked: false,
      date: new Date(),
      comments: []
    },
    {
      name: "lazyitem5",
      details: "lazyitem5 details",
      img: "",
      links: [],
      liked: false,
      date: new Date(),
      comments: []
    },
  
    ];
    await Wish.create(...defaultWishes)
    console.log("Seeding database with wishes:", defaultWishes.length+" wishes")
  } else {
    console.log("Wish seeding not needed")
  }
}

export async function seedUsers() {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    async function hashpassword(password) {
      const hashpass = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) reject(err);
          else resolve(hash);
        });
      })
      return hashpass;
    }

    const defaultUsers = [
    {
      username: "username",
      chosenone: true,
      hash: await hashpassword("password")
    },
    ];
    await User.create(...defaultUsers)
    console.log("Seeding database with users:", defaultUsers.length+" users")
  } else {
    console.log("User seeding not needed")
  }
}
