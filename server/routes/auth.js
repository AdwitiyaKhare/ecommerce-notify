import express from "express";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Route to start Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback handler
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/`,
    successRedirect: `${process.env.CLIENT_URL}/`,
    session: true, // explicitly state this if session is used
  })
);

// Logout the user and destroy the session
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // optional but useful
      res.redirect(`${process.env.CLIENT_URL}`);
    });
  });
});

// Return user info for frontend auth check
router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  res.json(req.user);
});

export default router;
