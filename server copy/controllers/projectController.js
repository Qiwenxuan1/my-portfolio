const Project = require('../models/Project');

const getProjects = async (req, res, next) => {
  try { const projects = await Project.find(); res.json(projects); } catch (error) { next(error); }
};
const getProjectById = async (req, res, next) => {
  try { const project = await Project.findById(req.params.id); if (project) res.json(project); else res.status(404).json({ message: 'Project not found' }); } catch (error) { next(error); }
};
const createProject = async (req, res, next) => {
  try {
    const project = new Project({ ...req.body, user: req.user._id });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) { next(error); }
};
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      Object.assign(project, req.body);
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else res.status(404).json({ message: 'Project not found' });
  } catch (error) { next(error); }
};
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) { await project.deleteOne(); res.json({ message: 'Project removed' }); } else res.status(404).json({ message: 'Project not found' });
  } catch (error) { next(error); }
};
module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };