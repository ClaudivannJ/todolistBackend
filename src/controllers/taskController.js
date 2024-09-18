const taskModel = require('../models/taskModel');

const getTasks = (req, res) => {
  taskModel.getAllTasks((err, tasks) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
    } else {
      res.json({ tasks });
    }
  });
};

const createTask = (req, res) => {
  const { title, due_date } = req.body;
  taskModel.addTask(title, due_date, (err, task) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao adicionar tarefa' });
    } else {
      res.status(201).json(task);
    }
  });
};

const editTask = (req, res) => {
  const { id } = req.params;
  const { title, due_date } = req.body;
  taskModel.editTask(id, title, due_date, (err) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao editar tarefa' });
    } else {
      res.status(200).json({ message: 'Tarefa editada com sucesso' });
    }
  });
};

const updateTaskStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  taskModel.updateTaskStatus(id, status, (err) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao atualizar status da tarefa' });
    } else {
      res.status(200).json({ message: 'Status atualizado com sucesso' });
    }
  });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  taskModel.deleteTask(id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao deletar tarefa' });
    } else {
      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    }
  });
};

module.exports = { getTasks, createTask, editTask, updateTaskStatus, deleteTask };
