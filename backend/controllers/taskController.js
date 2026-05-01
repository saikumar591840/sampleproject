const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Get all tasks for a project
// @route   GET /api/projects/:projectId/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is a member or Admin
    if (req.user.role !== 'Admin' && !project.teamMembers.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to view tasks for this project' });
    }

    const tasks = await Task.find({ projectId: req.params.projectId }).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks for user
// @route   GET /api/tasks/my-tasks
// @access  Private
exports.getMyTasks = async (req, res, next) => {
  try {
    let tasks;
    if (req.user.role === 'Admin') {
      tasks = await Task.find().populate('assignedTo', 'name email').populate('projectId', 'name');
    } else {
      tasks = await Task.find({ assignedTo: req.user._id }).populate('assignedTo', 'name email').populate('projectId', 'name');
    }
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a task (Admin only)
// @route   POST /api/projects/:projectId/tasks
// @access  Private/Admin
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, assignedTo, dueDate, status } = req.body;
    
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = await Task.create({
      title,
      description,
      projectId: req.params.projectId,
      assignedTo,
      dueDate,
      ...(status && { status })
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Member can only update assigned tasks. Admin can update any.
    if (req.user.role !== 'Admin') {
      if (!task.assignedTo || task.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this task' });
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task (Admin only)
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();

    res.json({ message: 'Task removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task statistics for dashboard
// @route   GET /api/tasks/stats
// @access  Private
exports.getTaskStats = async (req, res, next) => {
  try {
    let tasks;

    if (req.user.role === 'Admin') {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignedTo: req.user._id });
    }

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Done').length;
    const pending = total - completed;
    
    const now = new Date();
    const overdue = tasks.filter(t => {
      return t.status !== 'Done' && t.dueDate && new Date(t.dueDate) < now;
    }).length;

    res.json({
      total,
      completed,
      pending,
      overdue
    });

  } catch (error) {
    next(error);
  }
};
