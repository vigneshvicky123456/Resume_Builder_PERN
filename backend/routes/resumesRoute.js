const express = require('express');
const router = express.Router();
const resumesModel = require("../models/resumesModal"); 
const contactModel = require('../models/contactModal');
const experienceModel = require("../models/experienceModal");
const educationModel = require("../models/educationModal");
const certificateModal = require("../models/certificateModal");
const skillModel = require("../models/certificateModal");
const summaryModel = require("../models/summaryModal");
const referenceModel = require("../models/referenceModal");

// Get All Resumes
router.get('/:accountUser_id', async (req, res) => {
    const { accountUser_id } = req.params;
  
    try {
      const resumes = await resumesModel.findAll({
        where: { accountUser_id },
        order: [['id', 'ASC']],
        include: [
          {
            model: contactModel,
            as: 'contactModel', 
          },
          {
            model: experienceModel,
            as: 'experienceModel', 
          },
        //   {
        //     model: educationModel,
        //     as: 'educationModel', 
        //   },
        //   {
        //     model: certificateModal,
        //     as: 'certificateModal',
        //   },
        //   {
        //     model: skillModel,
        //     as: 'skillModel', 
        //   },
        //   {
        //     model: summaryModel,
        //     as: 'summaryModel', 
        //   },
        //   {
        //     model: referenceModel,
        //     as: 'referenceModel', 
        //   },
          
        ],
      });
  
      if (resumes.length > 0) {
        res.status(200).json(resumes);  
      } else {
        res.status(404).json({ message: 'No resumes found for this accountUser_id' }); 
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
      res.status(500).json({ error: "Failed to Get All resumes" });
    }
  });
  

// Post Create Resumes
router.post('/', async (req, res) => {
  const { accountUser_id, resume_title, resume_template_id } = req.body;
  try {
    const newResume = await resumesModel.create({
      accountUser_id,
      resume_title,
      resume_template_id,
    });
    res.status(201).json(newResume);
  } catch (error) {
    res.status(400).json({ error: "Failed to create resume" });
  }
});

// last created resume
router.get('/lastCreated/:accountUser_id', async (req, res) => {
  const { accountUser_id } = req.params;
  try {
    const lastCreatedResume = await resumesModel.findOne({
      where: { accountUser_id }, 
      order: [['id', 'DESC']], 
      limit: 1, 
    });

    if (lastCreatedResume) {
      res.status(200).json(lastCreatedResume); 
    } else {
      res.status(404).json({ error: "No resumes found for the given accountUser_id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the last created ID" });
  }
});

// Get getResumeById
router.get('/:accountUser_id/:id', async (req, res) => {
  const { accountUser_id, id } = req.params;
  try {
    const resume = await resumesModel.findOne({
        where: { accountUser_id, id },
        include: [
            {
              model: contactModel,
              as: 'contactModel', 
            },
            {
              model: experienceModel,
              as: 'experienceModel',
            },
            // {
            //   model: educationModel,
            //   as: 'educationModel', 
            // },
            // {
            //   model: certificateModal,
            //   as: 'certificateModal',
            // },
            // {
            //   model: skillModel,
            //   as: 'skillModel', 
            // },
            // {
            //   model: summaryModel,
            //   as: 'summaryModel', 
            // },
            // {
            //   model: referenceModel,
            //   as: 'referenceModel', 
            // },
          ],
        });
         
    if (resume) {
      res.status(200).json(resume);
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to getResumeById" });
  }
});



// Put update Resumes
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { resume_title, resume_template_id } = req.body;
  try {
    const updated = await resumesModel.update(
      { resume_title, resume_template_id },
      { where: { id } }
    );
    if (updated[0] > 0) {
      res.status(200).json({ message: "Resume updated successfully" });
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update resume" });
  }
});

// Delete delete Resumes
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await resumesModel.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Resume deleted successfully" });
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete resume" });
  }
});

module.exports = router;
