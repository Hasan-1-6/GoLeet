

export default function Logout(req, res){
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: true
  });
  return res.status(200).json({ message: "Logged out successfully" });
};
