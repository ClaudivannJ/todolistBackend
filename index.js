const express = require('express');
const cors = require('cors');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
