import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [teachers, setTeachers] = useState(() => {
  const saved = localStorage.getItem("teachers");
  return saved ? JSON.parse(saved) : [];
});

const [teacherName, setTeacherName] = useState("");
const [teacherEmail, setTeacherEmail] = useState("");
const [teacherSubject, setTeacherSubject] = useState("");
const [teacherPhone, setTeacherPhone] = useState("");
const [teacherPhoto, setTeacherPhoto] = useState("");
const [searchTerm, setSearchTerm] = useState("");
const [editingId, setEditingId] = useState(null);


const [studentName, setStudentName] = useState("");
const [studentRoll, setStudentRoll] = useState("");
const [studentDepartment, setStudentDepartment] = useState("");
const [studentSemester, setStudentSemester] = useState("");
const [studentParent, setStudentParent] = useState("");
const [studentPhone, setStudentPhone] = useState("");
const [studentEmail, setStudentEmail] = useState("");
const [searchStudent, setSearchStudent] = useState("");
const [editingStudentId, setEditingStudentId] = useState(null);
const [students, setStudents] = useState(() => {
  const saved = localStorage.getItem("students");
  return saved ? JSON.parse(saved) : [];
});



useEffect(() => {
  localStorage.setItem("teachers", JSON.stringify(teachers));
}, [teachers]);
useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
}, [students]);
  const menuItems = [
    "Dashboard",
    "Teachers",
    "Students",
    
    "Attendance",
    "Assignments",
    "Study Materials",
    "Results",
    "Settings"
  ];
const handlePhotoChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setTeacherPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  }
};
const handleTeacherSubmit = (e) => {
  e.preventDefault();

  const teacherData = {
    id: editingId || Date.now(),
    name: teacherName,
    email: teacherEmail,
    subject: teacherSubject,
    phone: teacherPhone
  };

  if (editingId) {
    setTeachers(teachers.map((teacher) =>
      teacher.id === editingId ? teacherData : teacher
    ));
  } else {
    setTeachers([...teachers, teacherData]);
  }

  resetForm();
};

const resetForm = () => {
  setTeacherName("");
  setTeacherEmail("");
  setTeacherSubject("");
  setTeacherPhone("");
  setEditingId(null);
};

const editTeacher = (teacher) => {
  setTeacherName(teacher.name);
  setTeacherEmail(teacher.email);
  setTeacherSubject(teacher.subject);
  setTeacherPhone(teacher.phone);
  setEditingId(teacher.id);
};

const deleteTeacher = (id) => {
  setTeachers(teachers.filter((teacher) =>
    teacher.id !== id
  ));
};

const filteredTeachers = teachers.filter((teacher) =>
  `${teacher.name} ${teacher.email} ${teacher.subject}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <h2>Edu<span>Manage</span></h2>
          <p>Teacher Portal</p>
        </div>

        <p className="menu-title">MAIN MENU</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={
                activePage === item ? "menu-link active" : "menu-link"
              }
              onClick={() => setActivePage(item)}
            >
              {item === "Dashboard" && "▦"}
              {item === "Teachers" && "♙"}
              {item === "Students" && "♧"}
              {item === "My Classes" && "▣"}
              {item === "Attendance" && "✓"}
              {item === "Assignments" && "▤"}
              {item === "Study Materials" && "▱"}
              {item === "Results" && "★"}
              {item === "Settings" && "⚙"}
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="profile-icon">T</div>
            <div>
              <h4>Teacher</h4>
              <p>Teacher Account</p>
            </div>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        <header className="topbar">
          <div>
            <h1>{activePage}</h1>
            <p>Welcome back! Here's your overview.</p>
          </div>

          <div className="topbar-right">
            <span className="notification">♧</span>
            <div className="top-profile">T</div>
          </div>
        </header>

        {activePage === "Dashboard" ? (
          <>
            {/* Welcome Banner */}
            <section className="welcome-banner">
              <div>
                <h2>Welcome to EduManage!</h2>
                <p>
                  Manage your classes, students and daily activities
                  from one place.
                </p>
              </div>
              <div className="banner-icon">✦</div>
            </section>

            {/* Statistics */}
            <section className="stats-grid">

              <div className="stat-card">
                <div className="stat-icon blue">♙</div>
                <p>Total Students</p>
                <h2>120</h2>
                <small>Students registered</small>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple">▣</div>
                <p>My Classes</p>
                <h2>06</h2>
                <small>Assigned classes</small>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">▤</div>
                <p>Assignments</p>
                <h2>18</h2>
                <small>Total assignments</small>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">✓</div>
                <p>Present Today</p>
                <h2>108</h2>
                <small>Students present</small>
              </div>

            </section>

            {/* Bottom Section */}
            <section className="dashboard-grid">

              <div className="content-card">
                <h3>Recent Activities</h3>

                <div className="activity">
                  <span className="activity-dot blue-dot"></span>
                  <div>
                    <h4>New assignment created</h4>
                    <p>Mathematics - Class 10</p>
                  </div>
                  <small>Today</small>
                </div>

                <div className="activity">
                  <span className="activity-dot green-dot"></span>
                  <div>
                    <h4>Attendance completed</h4>
                    <p>Class 10 - Section A</p>
                  </div>
                  <small>Today</small>
                </div>

                <div className="activity">
                  <span className="activity-dot orange-dot"></span>
                  <div>
                    <h4>Study material uploaded</h4>
                    <p>Science - Class 9</p>
                  </div>
                  <small>Yesterday</small>
                </div>
              </div>

              <div className="content-card overview">
                <h3>Quick Overview</h3>

                <div className="overview-item">
                  <span>Students</span>
                  <strong>120</strong>
                </div>

                <div className="overview-item">
                  <span>Classes</span>
                  <strong>06</strong>
                </div>

                <div className="overview-item">
                  <span>Assignments</span>
                  <strong>18</strong>
                </div>

                <div className="overview-item">
                  <span>Attendance</span>
                  <strong>90%</strong>
                </div>
              </div>

            </section>
          </>
        ) : activePage === "Teachers" ? (

  <div className="teacher-section">

    <div className="teacher-stats">
      <div className="teacher-stat-card">
        <h3>{teachers.length}</h3>
        <p>Total Teachers</p>
      </div>

      <div className="teacher-stat-card">
        <h3>{new Set(teachers.map(t => t.subject)).size}</h3>
        <p>Total Subjects</p>
      </div>
    </div>

    <div className="content-card">
      <h2>{editingId ? "Edit Teacher" : "Add New Teacher"}</h2>

      <form onSubmit={handleTeacherSubmit} className="teacher-form">

        <input
          type="text"
          placeholder="Teacher Name"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={teacherEmail}
          onChange={(e) => setTeacherEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Subject"
          value={teacherSubject}
          onChange={(e) => setTeacherSubject(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={teacherPhone}
          onChange={(e) => setTeacherPhone(e.target.value)}
          required
        />

        <button type="submit" className="add-teacher-btn">
          {editingId ? "Update Teacher" : "+ Add Teacher"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}

      </form>
    </div>

    <div className="content-card">
      <h2>Teacher List</h2>

      <input
        type="text"
        placeholder="Search teachers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="teacher-table-wrapper">
        <table className="teacher-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.phone}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => editTeacher(teacher)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTeacher(teacher.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No teachers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  </div>

) : activePage === "Students" ? (
  <div className="students-page">

    <div className="content-card">
      <h2>{editingStudentId !== null ? "Edit Student" : "Add Student"}</h2>

      <form
  className="student-form"
  onSubmit={(e) => {
          e.preventDefault();

          if (
            !studentName.trim() ||
            !studentRoll.trim() ||
            !studentDepartment.trim() ||
            !studentSemester.trim() ||
            !studentEmail.trim()
          ) {
            alert("Please fill all student details.");
            return;
          }

          const studentData = {
            id: editingStudentId !== null
              ? editingStudentId
              : Date.now(),
            name: studentName.trim(),
            roll: studentRoll.trim(),
            department: studentDepartment.trim(),
            semester: studentSemester.trim(),
            email: studentEmail.trim()
          };

          if (editingStudentId !== null) {
            setStudents((prev) =>
              prev.map((s) =>
                s.id === editingStudentId ? studentData : s
              )
            );
          } else {
            setStudents((prev) => [...prev, studentData]);
          }

          setStudentName("");
          setStudentRoll("");
          setStudentDepartment("");
          setStudentSemester("");
          setStudentEmail("");
          setEditingStudentId(null);
        }}
      >

        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={studentRoll}
          onChange={(e) => setStudentRoll(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Department"
          value={studentDepartment}
          onChange={(e) => setStudentDepartment(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Semester"
          value={studentSemester}
          onChange={(e) => setStudentSemester(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Student Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          required
        />

        <button type="submit" className="add-student-btn">
          {editingStudentId !== null ? "Update Student" : "Add Student"}
        </button>

        {editingStudentId !== null && (
          <button
            type="button"
            onClick={() => {
              setStudentName("");
              setStudentRoll("");
              setStudentDepartment("");
              setStudentSemester("");
              setStudentEmail("");
              setEditingStudentId(null);
            }}
          >
            Cancel
          </button>
        )}

      </form>
    </div>

    <div className="content-card">

      <h2>Student List</h2>

      <input
        type="text"
        placeholder="Search Student..."
        value={searchStudent}
        onChange={(e) => setSearchStudent(e.target.value)}
      />

      <div className="teacher-table-wrapper">
        <table className="teacher-table">

          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.filter((student) =>
              [
                student.name,
                student.roll,
                student.department,
                student.semester,
                student.email
              ].some((value) =>
                String(value || "")
                  .toLowerCase()
                  .includes(searchStudent.toLowerCase())
              )
            ).length > 0 ? (

              students.filter((student) =>
                [
                  student.name,
                  student.roll,
                  student.department,
                  student.semester,
                  student.email
                ].some((value) =>
                  String(value || "")
                    .toLowerCase()
                    .includes(searchStudent.toLowerCase())
                )
              ).map((student) => (

                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.department}</td>
                  <td>{student.semester}</td>
                  <td>{student.email}</td>

                  <td>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => {
                        setStudentName(student.name);
                        setStudentRoll(student.roll);
                        setStudentDepartment(student.department);
                        setStudentSemester(student.semester);
                        setStudentEmail(student.email);
                        setEditingStudentId(student.id);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => {
                        if (window.confirm("Delete this student?")) {
                          setStudents((prev) =>
                            prev.filter((s) => s.id !== student.id)
                          );
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

              ))

            ) : (
              <tr>
                <td colSpan="6">No students found.</td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

    </div>

  </div>

) : (
  <section className="content-card coming-soon">
    <h2>{activePage}</h2>
    <p>This section will be developed in the next steps.</p>
  </section>
)}
      </main>
    </div>
  );
}

export default App;