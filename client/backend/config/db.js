const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://lakkadiabhigna:wYFIepB0pdYBApvD@replatedb.dehgox7.mongodb.net/replateDb?retryWrites=true&w=majority&appName=replateDb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
