const Project = require('../models/Project');
/**
 * GET /project
 * Contact form page.
 */
exports.getProjects = (req, res, next) => {
  // must be logged in
  if (!req.user) {
    return res.redirect('/');
  }

  Project.find({user:req.user.id}, function(err, docs){
      res.render('project/list', {
        title: 'Projects',
        projects: docs,
        errors: err
      });
  });
};

exports.addProject = (req, res, next) => {
  req.assert('name', 'Project name cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors){
    req.flash('errors', errors);
    return res.redirect('/project');
  }

  const project = new Project({name: req.body.name, user: req.user});

  project.save(function(err, proj){
    if (err){
      req.flash('errors', err);
    } else {
      return res.redirect('/project');
    }
  });
};