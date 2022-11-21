import bcrypt from "bcrypt";

const findAll = async (req, res, next) => {
  try {
    const student = await req.context.models.students.findAll();
    if (!student) return res.status(404).json({ message: "Data Not Found" });
    return res
      .status(200)
      .json({ data: student, message: "Get All Student Success" });
  } catch (error) {
    next(error);
  }
};
const findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await req.context.models.students.findByPk(id);
    if (!student) return res.status(404).json({ message: "Data Not Found" });
    return res.status(200).json({ data: student, message: "Get Data Success" });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const student = await req.context.models.students.update(
      {
        nim: req.body.nim,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        teacher_id: req.body.teacher_id,
        major_id: req.body.major_id,
        isadmin: req.body.isadmin,
        password: hash,
      },
      { returning: true, where: { student_id: req.params.id } }
    );
    return res.status(200).json({ data: student, message: "Get Data Success" });
  } catch (error) {
    next(error);
  }
};

const countStudent = async (req, res) => {
  try {
    const countStudent = await req.context.models.students.findAndCountAll({
      limit: 2,
    });
    return res
      .status(200)
      .json({ data: countStudent, message: "Get Total Student" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default {
  findAll,
  findOne,
  updateStudent,
  countStudent,
};
