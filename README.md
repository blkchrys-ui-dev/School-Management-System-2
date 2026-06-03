# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


```
School-Management-System
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  ├─ files
│  │  ├─ math-formula.jpg
│  │  ├─ ngo-pic.png
│  │  └─ student.jpg
│  ├─ icons.svg
│  └─ school.png
├─ README.md
├─ src
│  ├─ api
│  │  └─ axiosInstance.ts
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ boy-img.jpg
│  │  ├─ download.jpg
│  │  ├─ hero.png
│  │  ├─ login-icon.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ Example.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ PageLoader.tsx
│  │  ├─ ProtectedRoute.tsx
│  │  ├─ Sidebar.tsx
│  │  └─ StudentSidebar.tsx
│  ├─ context
│  │  └─ AuthContext.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ admin
│  │  │  ├─ AddTeacher.tsx
│  │  │  └─ AdminDashboard.tsx
│  │  ├─ Calendar.tsx
│  │  ├─ ForgotPassword.tsx
│  │  ├─ Login.tsx
│  │  ├─ student
│  │  │  ├─ AcademicCalendar.tsx
│  │  │  ├─ AcademicReport.tsx
│  │  │  ├─ Attendance.tsx
│  │  │  ├─ ClassDiary.tsx
│  │  │  ├─ ContactUs.tsx
│  │  │  ├─ FeeDetails.tsx
│  │  │  ├─ Homework.tsx
│  │  │  ├─ NoticeDetails.tsx
│  │  │  ├─ Notices.tsx
│  │  │  ├─ StudentDashboard.tsx
│  │  │  ├─ StudentProfile.tsx
│  │  │  └─ TimeTable.tsx
│  │  ├─ StudentDashboard.tsx
│  │  ├─ teacher
│  │  │  ├─ AddAcademicCalendar.tsx
│  │  │  ├─ AddAcademicReport.tsx
│  │  │  ├─ AddDiary.tsx
│  │  │  ├─ AddHomework.tsx
│  │  │  ├─ AddStudent.tsx
│  │  │  ├─ AttendanceTeach.tsx
│  │  │  ├─ EditContactUs.tsx
│  │  │  ├─ EditStudentProfile.tsx
│  │  │  ├─ ManageFeeDetails.tsx
│  │  │  ├─ NoticeTeacher.tsx
│  │  │  ├─ SetTimeTable.tsx
│  │  │  └─ TeacherDashboard.tsx
│  │  └─ TodaySchedule.tsx
│  ├─ principal
│  │  ├─ addteacher.css
│  │  ├─ principaldash.css
│  │  └─ PrincipalDash.tsx
│  ├─ styling
│  │  ├─ academicCalendar.css
│  │  ├─ academicReport.css
│  │  ├─ attendance.css
│  │  ├─ calendar.css
│  │  ├─ classDiary.css
│  │  ├─ contactUs.css
│  │  ├─ feeDetails.css
│  │  ├─ footer.css
│  │  ├─ forgotpassword.css
│  │  ├─ header.css
│  │  ├─ homework.css
│  │  ├─ login.css
│  │  ├─ notices.css
│  │  ├─ noticesDetails.css
│  │  ├─ sidebar.css
│  │  ├─ studentdashboard.css
│  │  ├─ studentProfile.css
│  │  ├─ style.css
│  │  ├─ timeTable.css
│  │  └─ TodaysSchedule.css
│  ├─ teacher
│  │  ├─ addacademiccalendar.css
│  │  ├─ addacademicreport.css
│  │  ├─ adddiary.css
│  │  ├─ addhomework.css
│  │  ├─ addstudent.css
│  │  ├─ attendanceteach.css
│  │  ├─ editcontactUs.css
│  │  ├─ editstudentprofile.css
│  │  ├─ managefeedetails.css
│  │  ├─ noticeteacher.css
│  │  ├─ settimetable.css
│  │  └─ teacherDash.css
│  └─ types
│     └─ auth.types.ts
├─ tsconfig.json
└─ vite.config.ts

```
```
School-Management-System
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  ├─ files
│  │  ├─ math-formula.jpg
│  │  ├─ ngo-pic.png
│  │  └─ student.jpg
│  ├─ icons.svg
│  └─ school.png
├─ README.md
├─ src
│  ├─ api
│  │  └─ axiosInstance.ts
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ boy-img.jpg
│  │  ├─ download.jpg
│  │  ├─ hero.png
│  │  ├─ login-icon.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ Example.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ PageLoader.tsx
│  │  ├─ ProtectedRoute.tsx
│  │  ├─ Sidebar.tsx
│  │  └─ StudentSidebar.tsx
│  ├─ context
│  │  └─ AuthContext.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ admin
│  │  │  ├─ AddTeacher.tsx
│  │  │  └─ AdminDashboard.tsx
│  │  ├─ Calendar.tsx
│  │  ├─ ForgotPassword.tsx
│  │  ├─ Login.tsx
│  │  ├─ student
│  │  │  ├─ AcademicCalendar.tsx
│  │  │  ├─ AcademicReport.tsx
│  │  │  ├─ Attendance.tsx
│  │  │  ├─ ClassDiary.tsx
│  │  │  ├─ ContactUs.tsx
│  │  │  ├─ FeeDetails.tsx
│  │  │  ├─ Homework.tsx
│  │  │  ├─ NoticeDetails.tsx
│  │  │  ├─ Notices.tsx
│  │  │  ├─ StudentDashboard.tsx
│  │  │  ├─ StudentProfile.tsx
│  │  │  └─ TimeTable.tsx
│  │  ├─ StudentDashboard.tsx
│  │  ├─ teacher
│  │  │  ├─ AddAcademicCalendar.tsx
│  │  │  ├─ AddAcademicReport.tsx
│  │  │  ├─ AddDiary.tsx
│  │  │  ├─ AddHomework.tsx
│  │  │  ├─ AddStudent.tsx
│  │  │  ├─ AttendanceTeach.tsx
│  │  │  ├─ EditContactUs.tsx
│  │  │  ├─ EditStudentProfile.tsx
│  │  │  ├─ ManageFeeDetails.tsx
│  │  │  ├─ NoticeTeacher.tsx
│  │  │  ├─ SetTimeTable.tsx
│  │  │  └─ TeacherDashboard.tsx
│  │  └─ TodaySchedule.tsx
│  ├─ principal
│  │  ├─ addteacher.css
│  │  ├─ principaldash.css
│  │  └─ PrincipalDash.tsx
│  ├─ styling
│  │  ├─ academicCalendar.css
│  │  ├─ academicReport.css
│  │  ├─ attendance.css
│  │  ├─ calendar.css
│  │  ├─ classDiary.css
│  │  ├─ contactUs.css
│  │  ├─ feeDetails.css
│  │  ├─ footer.css
│  │  ├─ forgotpassword.css
│  │  ├─ header.css
│  │  ├─ homework.css
│  │  ├─ login.css
│  │  ├─ notices.css
│  │  ├─ noticesDetails.css
│  │  ├─ pageLoader.css
│  │  ├─ sidebar.css
│  │  ├─ studentdashboard.css
│  │  ├─ studentProfile.css
│  │  ├─ style.css
│  │  ├─ timeTable.css
│  │  └─ TodaysSchedule.css
│  ├─ teacher
│  │  ├─ addacademiccalendar.css
│  │  ├─ addacademicreport.css
│  │  ├─ adddiary.css
│  │  ├─ addhomework.css
│  │  ├─ addstudent.css
│  │  ├─ attendanceteach.css
│  │  ├─ editcontactUs.css
│  │  ├─ editstudentprofile.css
│  │  ├─ managefeedetails.css
│  │  ├─ noticeteacher.css
│  │  ├─ settimetable.css
│  │  └─ teacherDash.css
│  └─ types
│     └─ auth.types.ts
├─ tsconfig.json
└─ vite.config.ts

```"# School-Management-System" 
"# School-Management-System" 
"# School-Management-System" 
"# School-Management-System-2" 
