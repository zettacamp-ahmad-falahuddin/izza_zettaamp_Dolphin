const mongoose = require('mongoose');
const Profile = require('./Profile');

async function connectMongoDB() {
  await mongoose
    .connect('mongodb://localhost:27017/belajar')
    .then(() => console.log('Berhasil terkoneksi mongodb'))
    .catch((err) => console.log(err.message));
}

async function readManyDocumentsDB(kota) {
  const profiles = await Profile.find({
    address: {
      kota: kota,
    },
  });
  console.log('profiles', profiles);
}

async function readOneDocumentDB(kota, provinsi, hobbies) {
  const profile = await Profile.findOne({
    address: {
      kota: kota,
      provinsi: provinsi,
    },
    hobbies: hobbies,
  });
  console.log('profile', profile);
}

async function addManyDocumentsDB() {
  await Profile.insertMany([
    {
      address: {
        kota: 'Palu',
        provinsi: 'Sulawesi Utara',
      },
      hobbies: ['Memasak', 'Bersepeda'],
    },
    {
      address: {
        kota: 'Sumba',
        provinsi: 'NTT',
      },
      hobbies: ['Memanah', 'Memancing'],
    },
    {
      address: {
        kota: 'Blitar',
        provinsi: 'Jawa Timur',
      },
      hobbies: ['Memahat', 'Berenang'],
    },
  ]);
  console.log('profiles created');
}

async function addOneDocumentDB(kota, provinsi, hobbies) {
  await Profile.create({
    address: {
      kota: kota,
      provinsi: provinsi,
    },
    hobbies: hobbies,
  });
  console.log('profile created');
}

async function updateManyDocumentsDB() {
  const profiles = await Profile.updateMany(
    {},
    {
      $set: {
        address: {
          kota: 'Bandung',
          provinsi: 'Jawa Barat',
        },
      },
    }
  );
  console.log('profiles', profiles);
}

async function updateOneDocumentDB(kota, provinsi) {
  const profile = await Profile.updateOne(
    {
      address: {
        kota: kota,
        provinsi: provinsi,
      },
    },
    {
      $set: {
        hobbies: ['Berlari', 'Naik Gunung'],
      },
    }
  );
  console.log('profile', profile);
}

async function deleteManyDocumentsDB() {
  await Profile.deleteMany({});
  console.log('users deleted');
}

async function deleteOneDocumentDB(hobbies) {
  await Profile.deleteOne({
    hobbies: hobbies,
  });
  console.log('user deleted');
}

connectMongoDB();
// readManyDocumentsDB();
// readOneDocumentDB('Semarang', 'Jawa Tengah', ['Berkuda', 'Bermain Game']);
addManyDocumentsDB();
// addOneDocumentDB('Semarang', 'Jawa Tengah', ['Berkuda', 'Bermain Game']);
// updateManyDocumentsDB();
// updateOneDocumentDB('Sumba', 'NTT');
// deleteManyDocumentsDB();
// deleteOneDocumentDB(['Memahat', 'Berenang']);
