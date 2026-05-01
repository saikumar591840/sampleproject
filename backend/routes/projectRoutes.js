const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember
} = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');

// Member can get projects, only Admins can create
router.route('/')
  .get(protect, getProjects)
  .post(protect, admin, createProject);

// Only Admins can update or delete projects
router.route('/:id')
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

// Only Admins can manage members
router.route('/:id/members')
  .post(protect, admin, addMember);

router.route('/:id/members/:userId')
  .delete(protect, admin, removeMember);

module.exports = router;
