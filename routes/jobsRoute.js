import express from "express";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
   postApplicationController,
  updateJobController,
  filterJob,
  getMyJobsController,
  JobIdController,
  getPhotoController,
  searchJobController,
getApplicationController,
getApplicantController,
getMatchedJobsController
} from "../controllers/jobsController.js";
import {isAdmin, userAuth,isUser} from "../middelwares/authMiddleware.js";

const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-job", userAuth,isAdmin, createJobController);

//GET JOBS || GET
router.get("/get-job", getAllJobsController);
router.get("/get-matching-jobs",userAuth,isUser,getMatchedJobsController);
router.post("/get-photo", getPhotoController);
router.get("/get-myjob", userAuth,isAdmin, getMyJobsController);

//UPDATE JOBS ||  PATCH
router.patch("/update-job/:id", userAuth,isAdmin, updateJobController);
router.get("/match-job/:id", userAuth,isAdmin, JobIdController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth,isAdmin, deleteJobController);

router.post("/filter-job",filterJob)
router.post("/search-job",searchJobController)
router.post("/send-app",userAuth,isUser,postApplicationController)
router.get("/get-myapp",userAuth,isUser,getApplicationController)
router.get("/get-applicant/:id",userAuth,isAdmin,getApplicantController)

// JOBS STATS FILTER || GET
// router.get("/job-stats", userAuth, jobStatsController);

export default router;
