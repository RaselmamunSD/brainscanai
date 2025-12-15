export interface TeamMember {
  id: string;
  name: string;
  studentId: string;
  role: "supervisor" | "member";
  designation?: string;
  university: string;
  email: string;
  image: string;
}

export const teamData: TeamMember[] = [
  {
    id: "1",
    name: "Mr. Ali Azgar",
    studentId: "PROF-001",
    role: "supervisor",
    designation: "Assistant Professor",
    university: "Bangladesh University of Business and Technology",
    email: "aliazgor@bubt.edu.bd",
    image: "",
  },
  {
    id: "2",
    name: "MD Rasel Mamun",
    studentId: "2CSE-222341",
    role: "member",
    university: "Bangladesh University of Business and Technology",
    email: "rasel@student.bubt.edu.bd",
    image: "/src/assets/Rasel Mamun.jpg",
  },
  {
    id: "3",
    name: "Omar Farque",
    studentId: "CSE-222341",
    role: "member",
    university: "Bangladesh University of Business and Technology",
    email: "omar@student.bubt.edu.bd",
    image: "",
  },
  {
    id: "4",
    name: "Abubakr Kazi",
    studentId: "CSE-222341",
    role: "member",
    university: "Bangladesh University of Business and Technology",
    email: "kazi@student.buet.edu.bd",
    image: "",
  },
  {
    id: "5",
    name: "Israt Zahan",
    studentId: "CSE-222341",
    role: "member",
    university: "Bangladesh University of Business and Technology",
    email: "israt@student.buet.edu.bd",
    image: "",
  },
  {
    id: "6",
    name: "Shahriar Mahmud shifat",
    studentId: "CSE-222341",
    role: "member",
    university: "Bangladesh University of Business and Technology",
    email: "shifat@student.buet.edu.bd",
    image: "",
  },
];
