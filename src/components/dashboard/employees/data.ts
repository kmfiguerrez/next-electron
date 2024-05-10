enum Gender {
  MALE = "Male",
  FEMALE = "Female"
}

export type TEmployee = {
  id: string
  birthDate: Date
  firstName: string
  lastName: string
  gender: Gender
  designation: string
  department: string
  hireDate: Date
  active: boolean
  email: string
}

export const employees: Array<TEmployee> = [
  {
    id: "rsrit001",
    firstName: "Kim",
    lastName: "Joon",
    email: "kmfiguerrez@gmail.com",
    gender: Gender.MALE,
    active: true,
    birthDate: new Date("1985-02-03"),
    department: "IT",
    designation: "Programmer",
    hireDate: new Date("2024-04-22")
  },
  {
    id: "rsrhr001",
    firstName: "Margot",
    lastName: "Robbie",
    email: "mrobbie@gmail.com",
    gender: Gender.FEMALE,
    active: true,
    birthDate: new Date("1990-07-02"),
    department: "HR",
    designation: "HR Supervisor",
    hireDate: new Date("2023-08-22")
  },
  {
    id: "rsract001",
    firstName: "Luna",
    lastName: "Freya",
    email: "lfreya@gmail.com",
    gender: Gender.FEMALE,
    active: true,
    birthDate: new Date("1995-07-02"),
    department: "Accounting",
    designation: "Accounting Supervisor",
    hireDate: new Date("2023-07-22")
  },
 { id: "123", birthDate: new Date("1990-05-15"), firstName: "John", lastName: "Doe", gender: Gender.MALE, designation: "Software Engineer", department: "Engineering", hireDate: new Date("2020-01-10"), active: true, email: "jdoe@gmail.com" },
 { id: "456", birthDate: new Date("1985-09-20"), firstName: "Jane", lastName: "Smith", gender: Gender.MALE, designation: "Product Manager", department: "Product", hireDate: new Date("2018-03-05"), active: true, email: "jsmith@gmail.com" },
 { id: "789", birthDate: new Date("1992-11-30"), firstName: "Alex", lastName: "Johnson", gender: Gender.MALE, designation: "UX Designer", department: "Design", hireDate: new Date("2021-07-20"), active: true, email: "ajohnson@gmail.com" },
 { id: "101", birthDate: new Date("1988-04-12"), firstName: "Michael", lastName: "Brown", gender: Gender.MALE, designation: "Data Analyst", department: "Analytics", hireDate: new Date("2019-11-15"), active: true, email: "mbrown@gmail.com" },
 { id: "202", birthDate: new Date("1995-08-05"), firstName: "Emily", lastName: "Lee", gender: Gender.FEMALE, designation: "Marketing Specialist", department: "Marketing", hireDate: new Date("2022-02-28"), active: true, email: "elee@gmail.com" },
 { id: "303", birthDate: new Date("1982-03-25"), firstName: "David", lastName: "Garcia", gender: Gender.MALE, designation: "Sales Representative", department: "Sales", hireDate: new Date("2017-06-10"), active: true, email: "dgarcia@gmail.com" },
 { id: "404", birthDate: new Date("1998-12-18"), firstName: "Sophia", lastName: "Nguyen", gender: Gender.FEMALE, designation: "HR Manager", department: "Human Resources", hireDate: new Date("2023-04-01"), active: true, email: "snguyen@gmail.com" },
 { id: "505", birthDate: new Date("1987-07-08"), firstName: "Daniel", lastName: "Kim", gender: Gender.MALE, designation: "Finance Analyst", department: "Finance", hireDate: new Date("2020-09-22"), active: true, email: "dkim@gmail.com" },
 { id: "606", birthDate: new Date("1993-02-14"), firstName: "Olivia", lastName: "Martinez", gender: Gender.FEMALE, designation: "Quality Assurance Engineer", department: "QA", hireDate: new Date("2021-01-05"), active: true, email: "omartinez@gmail.com" },
 { id: "707", birthDate: new Date("1984-06-28"), firstName: "William", lastName: "Taylor", gender: Gender.FEMALE, designation: "Project Manager", department: "Project Management", hireDate: new Date("2019-03-12"), active: true, email: "wtaylor@gmail.com" },
 { id: "808", birthDate: new Date("1991-09-10"), firstName: "Isabella", lastName: "Lopez", gender: Gender.FEMALE, designation: "Business Analyst", department: "Business", hireDate: new Date("2022-11-18"), active: true, email: "ilopez@gmail.com" },
 { id: "909", birthDate: new Date("1989-01-03"), firstName: "Ethan", lastName: "Wang", gender: Gender.MALE, designation: "Product Owner", department: "Product", hireDate: new Date("2020-07-05"), active: true, email: "ewang@gmail.com" },
 { id: "111", birthDate: new Date("1996-10-22"), firstName: "Ava", lastName: "Harris", gender: Gender.FEMALE, designation: "Software Developer", department: "Engineering", hireDate: new Date("2023-02-15"), active: true, email: "aharris@gmail.com" },
 { id: "121", birthDate: new Date("1983-11-05"), firstName: "James", lastName: "Jackson", gender: Gender.MALE, designation: "Data Scientist", department: "Analytics", hireDate: new Date("2018-08-30"), active: true, email: "jjackson@gmail.com" },
 { id: "131", birthDate: new Date("1997-07-01"), firstName: "Mia", lastName: "Adams", gender: Gender.FEMALE, designation: "Marketing Coordinator", department: "Marketing", hireDate: new Date("2022-05-10"), active: true, email: "madams@gmail.com" },

]
