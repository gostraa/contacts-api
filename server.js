const express = require('express');
const app = express();
const port = 3000;
const contactRoutes = require('./routes/contactRoutes');  
const cors = require('cors');
app.use(cors());
app.use(express.json()); 
app.use('/api/contacts', contactRoutes);


const PORT = process.env.PORT || port;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
