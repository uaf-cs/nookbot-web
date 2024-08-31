export type Course = {
  id: string;
  channel: string;
  subject: string;
  course: string;
  section: string;
  title: string;
  instructor: string;
};

export const loader = defineServerLoader(async () => {
  return {
    courses: await getCourses(),
    subjects: [
      { id: "802273626002948146", name: "Chemistry" },
      {
        id: "796320363587698709",
        name: "Mathematics and Statistics",
      },
      { id: "796320258302017546", name: "Computer Science" },
    ],
  };
});

const validateCourses = async (formData: FormDataEntryValue[]) => {
  const toValidate = formData.filter((fd) => typeof fd == "string");
  const courses = await getCourses();
  return toValidate.filter(
    (course) => courses.findIndex((c) => c.id === course) !== -1,
  );
};

export default defineFormActions({
  default: async (event) => {
    const formData = await readFormData(event);
    const requestedCourses = await validateCourses(formData.getAll("courses"));
    console.log(requestedCourses);
  },
});
