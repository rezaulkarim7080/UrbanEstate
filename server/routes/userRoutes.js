import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import { getUserDetails, loginUser, logoutUser, registerUser, } from "../controllers/userController.js";



const router = express.Router();



// main parts 
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/me", isAuthenticatedUser, getUserDetails);




// main parts 
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/password/forgot", forgotPassword);
// router.patch("/password/reset/:token", resetPassword);
// router.put("/password/update", isAuthenticatedUser, updatePassword);
// router.get("/logout", logoutUser);
// router.get("/me", isAuthenticatedUser, getUserDetails);
// router.put("/me/update", isAuthenticatedUser, updateProfile);
// router.get("/admin/users", isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
// router.get("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);
// router.put("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);
// router.delete("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


export default router;
