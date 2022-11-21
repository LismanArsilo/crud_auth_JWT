import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registrasi
const registrasi = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const createStudent = await req.context.models.students.create({
      nim: req.body.nim,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      teacher_id: req.body.teacher_id,
      major_id: req.body.major_id,
      isadmin: req.body.isadmin,
      password: hash,
    });
    return res.status(200).json({ message: "Registrasi Success" });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const student = await req.context.models.students.findOne({
      where: { nim: req.body.nim },
    });
    if (!student)
      return res.status(404).json({ message: "User Or Password Not Valid " });
    const isPassword = await bcrypt.compare(
      req.body.password,
      student.password
    );
    if (!isPassword)
      return res.status(404).json({ message: "User Or Password Not Valid " });
    const token = jwt.sign(
      {
        id: student.student_id,
        isadmin: student.isadmin,
      },
      process.env.JWT
    );
    const { password, isadmin, ...otherDetails } = student.dataValues;
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ data: { ...otherDetails }, message: "Login Success" });
  } catch (error) {
    next(error);
  }
};

export default {
  registrasi,
  login,
};
