import { getCourses, getSubjects } from "~/server/utils/courses";

export const loader = defineServerLoader(async (event) => {
  const [courses, subjects] = await Promise.all([getCourses(), getSubjects()]);
  return {
    courses,
    subjects,
  };
});

const validateCourses = async (formData: FormDataEntryValue[]) => {
  const toValidate = formData.filter((fd) => typeof fd === "string");
  const courses = await getCourses();
  return toValidate.filter(
    (course) => courses.findIndex((c) => c.id === course) !== -1,
  );
};

const validateSubjects = async (formData: FormDataEntryValue[]) => {
  const toValidate = formData.filter((fd) => typeof fd === "string");
  const subjects = await getSubjects();
  return toValidate.filter(
    (subject) => subjects.findIndex((s) => s.id === subject) !== -1,
  );
};

export default defineFormActions({
  default: async (event) => {
    const formData = await readFormData(event);
    const requestedCourses = await validateCourses(formData.getAll("courses"));
    const requestedSubjects = await validateSubjects(
      formData.getAll("subjects"),
    );
    console.log({ requestedCourses, requestedSubjects });
  },
});
