import { Course, Subject } from "~/types";

export const getCourses = async (): Promise<Course[]> => {
  return [
    {
      id: "1274536386728562708",
      channel: "1274536389014454283",
      subject: "STAT",
      course: "F698",
      section: "301",
      title: "Non-thesis Research/Project",
      instructor: "Julie Pilar McIntyre",
    },
    {
      id: "1274536382999822437",
      channel: "1274536384866025512",
      subject: "STAT",
      course: "F651",
      section: "701",
      title: "Statistical Theory I",
      instructor: "Julie Pilar McIntyre ",
    },
    {
      id: "1274536379035942984",
      channel: "1274536380843823214",
      subject: "STAT",
      course: "F641",
      section: "701",
      title: "Bayesian Statistics",
      instructor: "Margaret Short ",
    },
    {
      id: "1274536375336570931",
      channel: "1274536377165414572",
      subject: "STAT",
      course: "F602",
      section: "701",
      title: "Experimental Design",
      instructor: "Scott D Goddard ",
    },
    {
      id: "1274536371444514841",
      channel: "1274536373591736351",
      subject: "STAT",
      course: "F402",
      section: "901",
      title: "Scientific Sampling",
      instructor: "Julie Pilar McIntyre ",
    },
    {
      id: "1274536365878415382",
      channel: "1274536369036857457",
      subject: "STAT",
      course: "F401",
      section: "901",
      title: "Regression and Analysis of Variance",
      instructor: "Scott D Goddard ",
    },
    {
      id: "1274536359679492139",
      channel: "1274536361336111206",
      subject: "STAT",
      course: "F300",
      section: "901",
      title: "Statistics",
      instructor: "Margaret Short ",
    },
    {
      id: "1274536356047224883",
      channel: "1274536357816963166",
      subject: "STAT",
      course: "F200X",
      section: "1",
      title: "Elementary Statistics",
      instructor: "Emily Marie Richmond , John Jacob Egenolf ",
    },
    {
      id: "1274536111087157329",
      channel: "1274536114002202710",
      subject: "CHEM",
      course: "F699",
      section: "901",
      title: "Thesis",
      instructor: "William Robert Simpson",
    },
    {
      id: "1274536106662297664",
      channel: "1274536108629164163",
      subject: "CHEM",
      course: "F698",
      section: "901",
      title: "Non-thesis Research/Project",
      instructor: "William Robert Simpson ",
    },
    {
      id: "1274536103289946273",
      channel: "1274536105101758475",
      subject: "CHEM",
      course: "F688",
      section: "901",
      title: "Biochemical and Molecular Biology Seminar",
      instructor: "Kelly Drew ",
    },
    {
      id: "1274536093894836256",
      channel: "1274536101356507287",
      subject: "CHEM",
      course: "F674",
      section: "901",
      title: "Membrane Biochemistry and Biophysics",
      instructor: "Kriya Lee Dunlap ",
    },
    {
      id: "1274536088987369537",
      channel: "1274536091621523520",
      subject: "CHEM",
      course: "F655",
      section: "901",
      title: "Environmental Toxicology",
      instructor: "Sarah Ellen Johnston ",
    },
    {
      id: "1274536085778862080",
      channel: "1274536087347269672",
      subject: "CHEM",
      course: "F606",
      section: "901",
      title: "Atmospheric Chemistry",
      instructor: "Jingqiu Mao ",
    },
    {
      id: "1274536081953656892",
      channel: "1274536083878842398",
      subject: "CHEM",
      course: "F603",
      section: "901",
      title: "Biological Inorganic Chemistry",
      instructor: "William A Howard ",
    },
    {
      id: "1274536078514061406",
      channel: "1274536080258895892",
      subject: "CHEM",
      course: "F488",
      section: "901",
      title: "Undergraduate Chemistry and Biochemistry Research",
      instructor: "Maegan Marie Daniello Weltzin ",
    },
    {
      id: "1274536074110304316",
      channel: "1274536076261851219",
      subject: "CHEM",
      course: "F482",
      section: "901",
      title: "Seminar",
      instructor: "Scott Painter Jerome ",
    },
    {
      id: "1274536065834811414",
      channel: "1274536072013021205",
      subject: "CHEM",
      course: "F481",
      section: "901",
      title: "Seminar",
      instructor: "Scott Painter Jerome ",
    },
    {
      id: "1274536061770403930",
      channel: "1274536063511302249",
      subject: "CHEM",
      course: "F455",
      section: "901",
      title: "Environmental Toxicology",
      instructor: "Sarah Ellen Johnston ",
    },
    {
      id: "1274536057706381314",
      channel: "1274536059954528276",
      subject: "CHEM",
      course: "F450",
      section: "701",
      title: "Information Storage and Transfer: Molecules and Pathways",
      instructor: "Scott Painter Jerome ",
    },
    {
      id: "1274536053549563986",
      channel: "1274536055672012861",
      subject: "CHEM",
      course: "F403",
      section: "901",
      title: "Biological Inorganic Chemistry",
      instructor: "William A Howard ",
    },
    {
      id: "1274536049011331102",
      channel: "1274536050861150218",
      subject: "CHEM",
      course: "F360",
      section: "1",
      title: "Cell and Molecular Biology",
      instructor: "Abel Bult-Ito ",
    },
    {
      id: "1274536044888326194",
      channel: "1274536047102918737",
      subject: "CHEM",
      course: "F331",
      section: "901",
      title: "Physical Chemistry I",
      instructor: "William Robert Simpson ",
    },
    {
      id: "1274536040853405749",
      channel: "1274536042548039681",
      subject: "CHEM",
      course: "F325",
      section: "1",
      title: "Organic Chemistry II",
      instructor: "James Adrian McKee , Arianna Lynn Demmerly",
    },
    {
      id: "1274536037095575645",
      channel: "1274536038546800804",
      subject: "CHEM",
      course: "F321",
      section: "901",
      title: "Organic Chemistry I",
      instructor: "Kriya Lee Dunlap , Arianna Lynn Demmerly",
    },
    {
      id: "1274536032519327814",
      channel: "1274536034461548638",
      subject: "CHEM",
      course: "F212",
      section: "901",
      title: "Chemical Equilibrium and Analysis",
      instructor: "Brian T Rasley ",
    },
    {
      id: "1274536029008957441",
      channel: "1274536030875291698",
      subject: "CHEM",
      course: "F106X",
      section: "901",
      title: "General Chemistry II",
      instructor: "William A Howard ",
    },
    {
      id: "1274536023728197804",
      channel: "1274536026085265509",
      subject: "CHEM",
      course: "F105X",
      section: "5",
      title: "General Chemistry I",
      instructor: "Arianna Lynn Demmerly, Sarah Ellen Johnston",
    },
    {
      id: "1274536020200652963",
      channel: "1274536021928706070",
      subject: "CHEM",
      course: "F103X",
      section: "901",
      title: "Introduction to General Chemistry",
      instructor: "Scott Painter Jerome ",
    },
    {
      id: "1274536016388030476",
      channel: "1274536018523193387",
      subject: "CHEM",
      course: "F100X",
      section: "1",
      title: "Chemistry in Complex Systems",
      instructor: "Chris L Whittle ",
    },
    {
      id: "1274535516527788043",
      channel: "1274535518109171783",
      subject: "MATH",
      course: "F699",
      section: "301",
      title: "Thesis",
      instructor: "Leah Wrenn Berman Williams",
    },
    {
      id: "1274535513054904330",
      channel: "1274535514791346226",
      subject: "MATH",
      course: "F105N",
      section: "1",
      title: "Intensive Intermediate Algebra",
      instructor: "",
    },
    {
      id: "1274533995392012289",
      channel: "1274533997090705439",
      subject: "MATH",
      course: "F698",
      section: "301",
      title: "Non-thesis Research/Project",
      instructor: "Leah Wrenn Berman Williams",
    },
    {
      id: "1274533990102995048",
      channel: "1274533992686944419",
      subject: "MATH",
      course: "F692P",
      section: "701",
      title: "Control and Inverse Problems in Partial Differential Equations",
      instructor: "Sergei Anatolievich Avdonin ",
    },
    {
      id: "1274533986286440538",
      channel: "1274533988362616894",
      subject: "MATH",
      course: "F661",
      section: "701",
      title: "Optimization",
      instructor: "Edward Lee Bueler ",
    },
    {
      id: "1274533982284939465",
      channel: "1274533983891361853",
      subject: "MATH",
      course: "F631",
      section: "701",
      title: "Algebra I",
      instructor: "Gordon I Williams ",
    },
    {
      id: "1274533978879037510",
      channel: "1274533980594634792",
      subject: "MATH",
      course: "F600",
      section: "901",
      title: "Teaching Seminar",
      instructor: "Jill R Faudree ",
    },
    {
      id: "1274533974110244947",
      channel: "1274533976542941297",
      subject: "MATH",
      course: "F426",
      section: "701",
      title: "Numerical Analysis",
      instructor: "Edward Lee Bueler ",
    },
    {
      id: "1274533969999822932",
      channel: "1274533972277330022",
      subject: "MATH",
      course: "F404",
      section: "901",
      title: "Introduction to Topology",
      instructor: "John G Gimbel ",
    },
    {
      id: "1274533961435054090",
      channel: "1274533968628158484",
      subject: "MATH",
      course: "F401",
      section: "701",
      title: "Introduction to Real Analysis",
      instructor: "Sergei Anatolievich Avdonin ",
    },
    {
      id: "1274533952350191636",
      channel: "1274533959476314183",
      subject: "MATH",
      course: "F314",
      section: "901",
      title: "Linear Algebra",
      instructor: "Jill R Faudree ",
    },
    {
      id: "1274533947795050607",
      channel: "1274533950219620372",
      subject: "MATH",
      course: "F305",
      section: "501",
      title: "DS: Geometry",
      instructor: "Leah Wrenn Berman Williams ",
    },
    {
      id: "1274533943168729128",
      channel: "1274533945245171894",
      subject: "MATH",
      course: "F302",
      section: "901",
      title: "Differential Equations",
      instructor: "John G Gimbel ",
    },
    {
      id: "1274533939222155345",
      channel: "1274533940958330901",
      subject: "MATH",
      course: "F253X",
      section: "1",
      title: "Calculus III",
      instructor: "Sergei Anatolievich Avdonin , David A Maxwell ",
    },
    {
      id: "1274533935682158672",
      channel: "1274533937586241638",
      subject: "MATH",
      course: "F252X",
      section: "1",
      title: "Calculus II",
      instructor: "James Edward Gossell , Kevin Richard Meek ",
    },
    {
      id: "1274533932188041360",
      channel: "1274533933979013150",
      subject: "MATH",
      course: "F251X",
      section: "1",
      title: "Calculus I",
      instructor:
        "James Edward Gossell , Jill R Faudree , Leah Wrenn Berman Williams ",
    },
    {
      id: "1274533927658323968",
      channel: "1274533930170716245",
      subject: "MATH",
      course: "F211",
      section: "701",
      title: "Mathematics for Elementary School Teachers",
      instructor: "Anthony D Rickard ",
    },
    {
      id: "1274533923078144080",
      channel: "1274533925003329598",
      subject: "MATH",
      course: "F193",
      section: "901",
      title: "Late Start Quick Review",
      instructor: "Judith Ann Atkinson ",
    },
    {
      id: "1274533919131177010",
      channel: "1274533921048100958",
      subject: "MATH",
      course: "F186",
      section: "901",
      title: "Applied Engineering Mathematics",
      instructor: "UA Staff , David A Maxwell",
    },
    {
      id: "1274533914534481920",
      channel: "1274533916862054402",
      subject: "MATH",
      course: "F156X",
      section: "1",
      title: "Precalculus",
      instructor: "Latrice Nichelle Bowman , Levi James McClurg ",
    },
    {
      id: "1274533910872854588",
      channel: "1274533912810487848",
      subject: "MATH",
      course: "F152X",
      section: "1",
      title: "Trigonometry",
      instructor: "Jennifer Alaine Hill ",
    },
    {
      id: "1274533907148177532",
      channel: "1274533909056458792",
      subject: "MATH",
      course: "F151X",
      section: "1",
      title: "College Algebra for Calculus",
      instructor:
        "Latrice Nichelle Bowman , John Jacob Egenolf , Nina B Avdonina , Judith Ann Atkinson ",
    },
    {
      id: "1274533903259930634",
      channel: "1274533905382244353",
      subject: "MATH",
      course: "F122X",
      section: "1",
      title: "Essential Precalculus with Applications",
      instructor: "Jennifer Alaine Hill , Anthony D Rickard ",
    },
    {
      id: "1274533898797453393",
      channel: "1274533901204983869",
      subject: "MATH",
      course: "F113X",
      section: "2",
      title: "Numbers and Society",
      instructor:
        "Kevin Richard Meek , Sandra June Wildfeuer , Anthony D Rickard ",
    },
    {
      id: "1274533893718151240",
      channel: "1274533895760642130",
      subject: "MATH",
      course: "F068",
      section: "1",
      title: "Math Essentials",
      instructor:
        "Julie Ann Kitchens Maier , Joi Ashlyn Lockhart , Sandra June Wildfeuer ",
    },
    {
      id: "1274533889804599348",
      channel: "1274533891872657462",
      subject: "MATH",
      course: "F054",
      section: "1",
      title: "Prealgebra",
      instructor: "Julie Ann Kitchens Maier ",
    },
    {
      id: "1274532504203694151",
      channel: "1274532506179207199",
      subject: "CS",
      course: "F698",
      section: "301",
      title: "Non-thesis Research/Project",
      instructor: "UA Staff",
    },
    {
      id: "1274532499220861024",
      channel: "1274532501645430835",
      subject: "CS",
      course: "F690",
      section: "901",
      title: "Graduate Seminar and Project",
      instructor: "Orion Sky Lawlor ",
    },
    {
      id: "1274532496079327336",
      channel: "1274532497744592988",
      subject: "CS",
      course: "F686",
      section: "901",
      title: "Computer Graphics Animation and Simulation",
      instructor: "Orion Sky Lawlor ",
    },
    {
      id: "1274532492438933550",
      channel: "1274532494028439603",
      subject: "CS",
      course: "F680",
      section: "901",
      title: "Topics in Computer Science",
      instructor: "Arghya Kusum Das ",
    },
    {
      id: "1274532487263162368",
      channel: "1274532489674756161",
      subject: "CS",
      course: "F600",
      section: "901",
      title: "Professional Software Development",
      instructor: "Arghya Kusum Das ",
    },
    {
      id: "1274532483680964649",
      channel: "1274532485484515400",
      subject: "CS",
      course: "F486",
      section: "901",
      title: "Computer Graphics Animation and Simulation",
      instructor: "Orion Sky Lawlor ",
    },
    {
      id: "1274532479646306304",
      channel: "1274532481881735200",
      subject: "CS",
      course: "F480",
      section: "901",
      title: "Topics in Computer Science: Deep Learning",
      instructor: "Arghya Kusum Das ",
    },
    {
      id: "1274532475829354536",
      channel: "1274532477309947977",
      subject: "CS",
      course: "F471",
      section: "901",
      title: "Senior Capstone I",
      instructor: "Glenn Gilford Chappell ",
    },
    {
      id: "1274532472075452447",
      channel: "1274532473975607408",
      subject: "CS",
      course: "F425",
      section: "701",
      title: "Database Systems",
      instructor: "Jesse Dean Franklin ",
    },
    {
      id: "1274532467239550998",
      channel: "1274532470112522260",
      subject: "CS",
      course: "F411",
      section: "901",
      title: "Analysis of Algorithms",
      instructor: "Lane Oscar Schwartz ",
    },
    {
      id: "1274532464144027669",
      channel: "1274532465553182741",
      subject: "CS",
      course: "F371",
      section: "901",
      title: "Computer Ethics and Technical Communication",
      instructor: "Lane Oscar Schwartz ",
    },
    {
      id: "1274532460868403311",
      channel: "1274532462432620594",
      subject: "CS",
      course: "F311",
      section: "901",
      title: "Data Structures and Algorithms",
      instructor: "Glenn Gilford Chappell ",
    },
    {
      id: "1274532457122758716",
      channel: "1274532458729050217",
      subject: "CS",
      course: "F301",
      section: "901",
      title: "Assembly Language Programming",
      instructor: "Orion Sky Lawlor ",
    },
    {
      id: "1274532453695885376",
      channel: "1274532455021285398",
      subject: "CS",
      course: "F202",
      section: "901",
      title: "Computer Science II",
      instructor: "Lane Oscar Schwartz ",
    },
    {
      id: "1274532449879068672",
      channel: "1274532451456122912",
      subject: "CS",
      course: "F201",
      section: "901",
      title: "Computer Science I",
      instructor: "Lane Oscar Schwartz ",
    },
    {
      id: "1274532445458268193",
      channel: "1274532447782047744",
      subject: "CS",
      course: "F103",
      section: "1",
      title: "Introduction to Computer Programming",
      instructor: "Travis M Payton ",
    },
  ];
};

export const getSubjects = async (): Promise<Subject[]> => {
  return [
    { id: "802273626002948146", name: "Chemistry" },
    {
      id: "796320363587698709",
      name: "Mathematics and Statistics",
    },
    { id: "796320258302017546", name: "Computer Science" },
  ];
};
