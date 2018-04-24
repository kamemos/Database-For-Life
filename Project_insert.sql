insert into Nisit_type(Faculty, Degree, Course)
values ("Computer Engineering", "Bachelor", "Thai");

insert into Nisit_type(Faculty, Degree, Course)
values ("Civil Engineering", "Bachelor", "Thai");

insert into Nisit_type(Faculty, Degree, Course)
values ("Chemical Engineering", "Bachelor", "Thai");

insert into Nisit_type(Faculty, Degree, Course)
values ("Computer Engineering", "Master", "Thai");

insert into Nisit_type(Faculty, Degree, Course)
values ("Computer Engineering", "Doctoral", "Thai");

insert into Nisit_type(Faculty, Degree, Course)
values ("Aerospace Engineering", "Bachelor", "International");

insert into Nisit_type(Faculty, Degree, Course)
values ("Medicine", "Bachelor", "Thai");

insert into Nisit_type(Faculty, Degree, Course)
values ("Material Science", "Bachelor", "Thai");

insert into Nisit_type(Faculty, Degree, Course)
values ("Material Science", "Master", "Thai");

insert into Nisit_type(Faculty, Degree, Course)
values ("Material Science", "Doctoral", "Thai");

#----------------------------------------------------------------------

insert into Student(Sname, Sid, Syear, Faculty, State, Grade, Educational_level, Group_name, Acad_year, Cdept_name, Cacad_year, Tid, Nfaculty, Ndegree, Ncourse, Spassword)
values ("Natt", "5831016321", 3, "Faculty of Engineering", "N", 4.00, "Bachelor", "A", 2558, "Nothing", 2559, "1111111111", "Computer Engineering", "Bachelor", "Thai", "nattzaza007");

insert into Student(Sname, Sid, Syear, Faculty, State, Grade, Educational_level, Group_name, Acad_year, Cdept_name, Cacad_year, Tid, Nfaculty, Ndegree, Ncourse, Spassword)
values ("Mr. Burin Amornpaisannon", "5831035221", 3, "Faculty of Engineering", "N", 1.00, "Bachelor", "D", 2558, "Nothing", 2559, "1111111111", "Computer Engineering", "Bachelor", "Thai", "gamelovegay");

insert into Student(Sname, Sid, Syear, Faculty, State, Grade, Educational_level, Group_name, Acad_year, Cdept_name, Cacad_year, Tid, Nfaculty, Ndegree, Ncourse, Spassword)
values ("Mr. Korpong Sawataksornchuen", "5831004821", 3, "Faculty of Engineering", "N", 3.98, "Bachelor", "C", 2558, "Nothing", 2558, "1111111111", "Civil Engineering", "Bachelor", "Thai", "indybobo");

insert into Student(Sname, Sid, Syear, Faculty, State, Grade, Educational_level, Group_name, Acad_year, Cdept_name, Cacad_year, Tid, Nfaculty, Ndegree, Ncourse, Spassword)
values ("Gustavo", "5831029521", 3, "Faculty of Engineering", "N", 2.27, "Bachelor", "F", 2558, "Nothing", 2559, "1111111111", "Chemical Engineering", "Bachelor", "Thai", "gustavo2499");

insert into Student(Sname, Sid, Syear, Faculty, State, Grade, Educational_level, Group_name, Acad_year, Cdept_name, Cacad_year, Tid, Nfaculty, Ndegree, Ncourse, Spassword)
values ("Mos", "1111111121", 3, "Faculty of Engineering", "N", 0.00, "Bachelor", "G", 2558, "Nothing", 2558, "1111111111", "Chemical Engineering", "Bachelor", "Thai", "moszaretired");

#----------------------------------------------------------------------

insert into Teacher_education (Tid, Teducation)
values ("1111111111", "Doctor of Philosophy, Computer Engineering, Chulalongkorn University");

insert into Teacher_education (Tid, Teducation)
values ("2222222222", "Doctor of Philosophy, Civil Engineering, Tokyo Institute of Technology");

insert into Teacher_education (Tid, Teducation)
values ("3333333333", "Doctor of Medicine, Medicine, Nanyang Technological University");

insert into Teacher_education (Tid, Teducation)
values ("4444444444", "Doctor of Science, Biological Science, Nanyang Technological University");

insert into Teacher_education (Tid, Teducation)
values ("5555555555", "Doctor of Accounting, Commerce and Accountancy, Cambridge University");

#----------------------------------------------------------------------

insert into Student_group (Group_name, Acad_year)
values ("A", 2559);

insert into Student_group (Group_name, Acad_year)
values ("B", 2559);

insert into Student_group (Group_name, Acad_year)
values ("C", 2559);

insert into Student_group (Group_name, Acad_year)
values ("D", 2559);

insert into Student_group (Group_name, Acad_year)
values ("E", 2559);

insert into Student_group (Group_name, Acad_year)
values ("F", 2559);

insert into Student_group (Group_name, Acad_year)
values ("A", 2558);

insert into Student_group (Group_name, Acad_year)
values ("C", 2558);

insert into Student_group (Group_name, Acad_year)
values ("E", 2558);

insert into Student_group (Group_name, Acad_year)
values ("G", 2558);

#----------------------------------------------------------------------

insert into Central (Dept_name, Acad_year)
values ("Central", 2559);

insert into Central (Dept_name, Acad_year)
values ("Activity", 2559);

insert into Central (Dept_name, Acad_year)
values ("Place", 2559);

insert into Central (Dept_name, Acad_year)
values ("Central", 2558);

insert into Central (Dept_name, Acad_year)
values ("Activity", 2558);

insert into Central (Dept_name, Acad_year)
values ("Place", 2558);

#----------------------------------------------------------------------

insert into Department (Dept_code, Dept_name)
values ("CP", "Computer Engineering");

insert into Department (Dept_code, Dept_name)
values ("CE", "Civil Engineering");

insert into Department (Dept_code, Dept_name)
values ("CHE", "Chemical Engineering");

insert into Department (Dept_code, Dept_name)
values ("ME", "Mechanical Engineering");

insert into Department (Dept_code, Dept_name)
values ("ENV", "Environmental Engineering");

insert into Department (Dept_code, Dept_name)
values ("MED", "Medicine");

#------------------------------------------------------------------------

insert into Subjects (Sname, Scode, Scredit)
values ("DB MGMT", "2110422", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("PARAGRAPH WRITING", "0123101", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("COMP NETWORK I", "2110471", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("COMP SYS ARCH", "2110352", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("HW SYN LAB I", "2110363", 1);

insert into Subjects (Sname, Scode, Scredit)
values ("ENG DRAWING", "2103106", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("CALCULUS I", "2301107", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("GEN CHEM", "2302127", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("GEN CHEM LAB", "2302163", 1);

insert into Subjects (Sname, Scode, Scredit)
values ("GEN PHYS I", "2304107", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("GEN PHYS LAB I", "2304183", 1);

insert into Subjects (Sname, Scode, Scredit)
values ("EXP ENG I", "5500111", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("EXPL ENG WORLD", "2100111", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("ENG MATERIALS", "2109101", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("COM PROG", "2110101", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("CALCULUS II", "2301108", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("GEN PHYS II", "2304108", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("GEN PHYS LABII", "2304184", 1);

insert into Subjects (Sname, Scode, Scredit)
values ("PROG METH I", "2110215", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("DISCRETE STRUC", "2110200", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("COMP ELEC INTF", "2110253", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("DIG COMP LOGIC", "2110251", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("COMP ENG ESS", "2110221", 3);

insert into Subjects (Sname, Scode, Scredit)
values ("DIG LOGIC LAB I", "2110263", 1);

#------------------------------------------------------------------------

insert into Place (Pname, Address, Capacity)
values ("Larn Gear", "Faculty of Engineering", 200);

insert into Place (Pname, Address, Capacity)
values ("Building 3", "Faculty of Engineering", 100);

insert into Place (Pname, Address, Capacity)
values ("Suan Ruam Jai", "Faculty of Engineering", 100);

insert into Place (Pname, Address, Capacity)
values ("Conference Room", "Building 3, Faculty of Engineering", 300);

#------------------------------------------------------------------------

insert into Activity (Aname, Ayear)
values ("Dancing", 2559);

insert into Activity (Aname, Ayear)
values ("Baka", 2559);

insert into Activity (Aname, Ayear)
values ("Ice Breaking", 2559);

insert into Activity (Aname, Ayear)
values ("Watching Drama", 2558);

insert into Activity (Aname, Ayear)
values ("Seniors Time", 2558);


#------------------------------------------------------------------------

insert into Sponsor (Sname)
values ("Lactasoy");

insert into Sponsor (Sname)
values ("SCG");

insert into Sponsor (Sname)
values ("EGAT");

#------------------------------------------------------------------------

# weird orders of paynumbers hehe sorry lor paiseh paiseh
insert into Term_payment (Amount, Tyear, Tnumber, Paynumber, Sid)
values (21000, 2559, 2, 1, "5831035221");

insert into Term_payment (Amount, Tyear, Tnumber, Paynumber, Sid)
values (21000, 2559, 1, 6, "5831035221");

insert into Term_payment (Amount, Tyear, Tnumber, Paynumber, Sid)
values (19000, 2559, 1, 2, "5831029521");

insert into Term_payment (Amount, Tyear, Tnumber, Paynumber, Sid)
values (19000, 2558, 2, 7, "5831029521");

insert into Term_payment (Amount, Tyear, Tnumber, Paynumber, Sid)
values (63000, 2558, 2, 3, "5831016321");

insert into Term_payment (Amount, Tyear, Tnumber, Paynumber, Sid)
values (63000, 2559, 2, 4, "5831004821");

insert into Term_payment (Amount, Tyear, Tnumber, Paynumber, Sid)
values (63000, 2558, 1, 5, "1111111121");

#------------------------------------------------------------------------

insert into Teacher (Tname, Tid, Start_work_date, Birth_date, Dept_code, Scode)
values ("Assc.Prof. Dr. KULTIDA ROJVIBOONCHAI", "1111111111", "1996-01-01", "1970-01-01", "CP",2110471);

insert into Teacher (Tname, Tid, Start_work_date, Birth_date, Dept_code, Scode)
values ("Assc.Prof. Dr. TARATIP SUWANNASART", "2222222222", "1995-5-1", "1971-1-1", "CP", 2110422);

insert into Teacher (Tname, Tid, Start_work_date, Birth_date, Dept_code, Scode)
values ("Assc.Prof. Dr. WIWAT VATANAWOOD", "3333333333", "1993-10-1", "1972-1-1", "CP", 2110422);

insert into Teacher (Tname, Tid, Start_work_date, Birth_date, Dept_code, Scode)
values ("Asst.Prof. Dr. KRERK PIROMSOPA", "4444444444", "1998-8-1", "1969-1-1", "CP", 2110352);

insert into Teacher (Tname, Tid, Start_work_date, Birth_date, Dept_code, Scode)
values ("Dr. Pitchaya Sitthi-amorn", "5555555555", "2016-1-1", "1980-1-1", "CP", 2110363);

#------------------------------------------------------------------------

insert into Section (Sbuilding, Sroom_number, Syear, Ssemester, Ssection, Scode, Tid)
values ("ENG3", 201, 2559, 2, 1, 2110422, "2222222222");

insert into Section (Sbuilding, Sroom_number, Syear, Ssemester, Ssection, Scode, Tid)
values ("ENG3", 202, 2559, 2, 2, 2110422, "3333333333");

insert into Section (Sbuilding, Sroom_number, Syear, Ssemester, Ssection, Scode, Tid)
values ("100TH YEAR", 704, 2559, 2, 3, 2110352, "4444444444");

insert into Section (Sbuilding, Sroom_number, Syear, Ssemester, Ssection, Scode, Tid)
values ("100TH YEAR", 304, 2559, 1, 2, 2110352, "4444444444");

insert into Section (Sbuilding, Sroom_number, Syear, Ssemester, Ssection, Scode, Tid)
values ("ENG4", 1901, 2559, 2, 1, 2110363, "5555555555");

insert into Section (Sbuilding, Sroom_number, Syear, Ssemester, Ssection, Scode, Tid)
values ("ENG3", 201, 2558, 2, 2, 2110363, "5555555555");

#------------------------------------------------------------------------
insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 1, 1,"2103106", "D");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 1, 1,"2301107", "B");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 1, 1,"2302127", "B");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 1, 1,"2302163", "B+");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 1, 1,"2304107", "C");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 1, 1, "2304183", "A");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 1, 1, "5500111", "B");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 2, 1, "2100111", "A");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 2, 1, "2109101", "B");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 2, 1, "2110101", "A");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 2, 1, "2301108", "B");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 2, 1, "2304108", "A");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 2, 1, "2304184", "A");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2558, 2, 1, "5500112", "A");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2559, 1, 1, "2110215", "-");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2559, 1, 1, "2110200", "-");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2559, 1, 1, "2110253", "-");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2559, 1, 1, "2110251", "-");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2559, 1, 1, "2110221", "-");

insert into student_registers_in(Sid, Syear, Ssemester, Ssection, Scode, Sgrade)
values ("5831035221", 2559, 1, 1, "2110263", "-");

#------------------------------------------------------------------------