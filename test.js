const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: String,
  scripts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Script' }],
});

const Author = mongoose.model('Author', authorSchema);

const scriptSchema = new mongoose.Schema({
  title: String,
  genre: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
});

const Script = mongoose.model('Script', scriptSchema);

async function connectMongoDB() {
  await mongoose
    .connect('mongodb://localhost:27017/belajar', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      try {
        // await Script.insertMany([
        //   {
        //     title: 'Bumi',
        //     genre: 'Fantasy',
        //   },
        //   {
        //     title: 'Bulan',
        //     genre: 'Fantasy',
        //   },
        //   {
        //     title: 'Rock',
        //     genre: 'Sureal',
        //   },
        //   {
        //     title: 'Bottom',
        //     genre: 'Sureal',
        //   },
        // ]);
        // await Author.insertMany([
        //   {
        //     name: 'Tere',
        //     scripts: [new mongoose.Types.ObjectId('650a6ef7e9f3d72cb884229d'), new mongoose.Types.ObjectId('650a6ef7e9f3d72cb884229e')],
        //   },
        //   {
        //     name: 'Liye',
        //     scripts: [new mongoose.Types.ObjectId('650a6ef7e9f3d72cb884229f'), new mongoose.Types.ObjectId('650a6ef7e9f3d72cb88422a0')],
        //   },
        // ]);
      } catch (error) {
        return error.message;
      }
      console.log('Berhasil terkoneksi mongodb');
    })
    .catch((err) => console.log(err.message));
}

connectMongoDB();

const genreToFilter = 'Fantasy'; // Replace with the genre you want to filter

Author.find({
//   scripts: {
//     $elemMatch: { genre: genreToFilter },
//   },
})
  .populate('scripts') // Optionally, populate the 'Scripts' field to get Script details
  .exec((err, authors) => {
    if (err) {
      console.error('Error:', err);
      return;
    }

    console.log('Authors who have written in the Fantasy genre:', authors);
  });
