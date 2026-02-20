import jwt from 'jsonwebtoken';

export const shouldBeLoggedIn = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not authorized" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }

    // only reach here if token is valid
    res.status(200).json({
      message: "You are an authorized user",
      userId: payload.id, // optional, shows who is logged in
    });
  });
};

export const shouldBeAdmin = (req,res) => {
      const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not authorized" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => { 
    if (err) return res.status(403).json({ message: "Token is not valid" });
    if (!payload) return res.status(403).json({ message: "Not Authorized" });
    

    // only reach here if token is valid
    res.status(200).json({
      message: "You are an authorized user" });
  });
};


