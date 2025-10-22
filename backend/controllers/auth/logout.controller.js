

export default function Logout(req, res){
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true
  });
  return res.status(200).json({ message: "Logged out successfully" });
};
