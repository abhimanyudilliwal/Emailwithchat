const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://abhi123:Abhi123456@cluster0.et7kg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true,
}, (err) => {
   if (!err) {
      console.log('MongoDB Connection Succeeded.....')
   } else {
      console.log('Error in DB connection: ' + err)
   }
});
