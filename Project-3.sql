set foreign_key_checks=0;
#SHOW ENGINE INNODB STATUS;

create database project;

use project; 

create table Subjects(
	Sname varchar(255) not null,
	Scode varchar(255) not null, # PLEASE NOTE THIS IS LENGTH 7
    Scredit int not null,
	primary key(Scode)
); # fin

create table Section( # This is a weak entity la guys
	Sbuilding varchar(255) not null, # a part of Splace
    Sroom_number varchar(255) not null, # a part of Splace
    Syear int not null,
    Ssemester int not null,
    Ssection int not null,
    Scode varchar(7) not null,# This is from the entity Subjects
    Tid varchar(10),
    primary key(Syear, Ssemester, Ssection, Scode),
    constraint fk_Section_subjects foreign key (Scode) references Subjects(Scode) on update cascade,
    constraint fk_Section_teacher foreign key (Tid) references Teacher(Tid) on update cascade
); # fin

create table Place (
	Pname 		VARCHAR(255) NOT NULL,
	Address 	VARCHAR(255) NOT NULL,
    Capacity 	INT(5) NOT NULL,
    PRIMARY KEY (Pname)
); # fin

CREATE TABLE Activity (
	Aname		VARCHAR(255) NOT NULL,
    Ayear 		INT(5) NOT NULL,
    PRIMARY KEY (Aname, Ayear)
); # fin

create table Held_by_group (
	Aname varchar(255) not null,
    Ayear int(5) not null,
    Group_name varchar(255) not null,
    Acad_year int(4) not null,
	
    primary key (Aname, Ayear, Group_name, Acad_year),
    constraint fk_Held_by_group_activity foreign key (Aname, Ayear) references Activity (Aname, Ayear) on update cascade,
    constraint fk_Held_by_group_student_group foreign key (Group_name, Acad_year) references Student_group (Group_name, Acad_year) on update cascade
);

create table Held_by_central (
	Aname varchar(255) not null,
    Ayear int(5) not null,
    Dept_name varchar(255) not null,
	Acad_year int(4) not null,
    
    primary key (Aname, Ayear, Dept_name, Acad_year),
    constraint fk_Held_by_central_activity foreign key (Aname, Ayear) references Activity (Aname, Ayear) on update cascade,
    constraint fk_Held_by_central_central foreign key (Dept_name, Acad_year) references Central (Dept_name, Acad_year) on update cascade
);

CREATE TABLE Held_at (
	Pname 			VARCHAR(255) NOT NULL,
    Aname			VARCHAR(255) NOT NULL,
    Ayear 			INT(5) NOT NULL,
	Hdate			VARCHAR(255) NOT NULL,
    Begin_time 		time,
    End_time		time,
    PRIMARY KEY (Pname, Aname, Ayear),
	CONSTRAINT fk_Held_at_Pname 
	FOREIGN KEY Held_at(Pname) 
	REFERENCES Place(Pname) on update cascade,
    
	CONSTRAINT fk_Held_at_activity foreign key (Aname, Ayear) references Activity (Aname, Ayear) on update cascade
);

CREATE TABLE Things (
	Tnumber		INT(5) NOT NULL,
    Ttype 		VARCHAR(255) NOT NULL,
    Quantity	INT(5) NOT NULL,
    Detail		VARCHAR(255),
    Sname		VARCHAR(255),
    Aname		VARCHAR(255),
    Ayear 		INT(5),
    PRIMARY KEY (Tnumber),
    
	CONSTRAINT fk_Things_sponsor foreign key (Sname) references Sponsor(Sname) on update cascade,
    
	CONSTRAINT fk_Things_activity foreign key (Aname, Ayear) references Activity (Aname, Ayear) on update cascade
);

CREATE TABLE Sponsor (
	Sname		VARCHAR(255) NOT NULL,
    PRIMARY KEY (Sname)
); # fin

create table Term_grade (
	Tyear int not null,
    Tnumber int not null,
    Sid varchar(10) not null,
    Grade varchar(2) not null,
    
    primary key (Tyear, Tnumber, Sid),
    constraint fk_Term_grade_term foreign key (Tyear, Tnumber) references Term (Tyear, Tnumber) on update cascade,
    constraint fk_Term_grade_student foreign key (Sid) references Student (Sid) on update cascade
);

create table Student(
	Sname varchar(255) not null,
    Sid varchar(10) not null,
    Syear int(1) not null,
    Faculty varchar(255) not null,
    State varchar(1) not null,
    Grade float(2) not null,
    Educational_level varchar(255) not null,
    Group_name varchar(255) not null,
    Acad_year int(4) not null,
    Cdept_name varchar(255) not null,
	Cacad_year int(4) not null,
    Tid varchar(10) not null,
    Nfaculty varchar(255) not null,
    Ndegree varchar(255) not null,
    Ncourse varchar(255) not null,
    Spassword varchar(255) not null,
    
    primary key(Sid),
    constraint fk_Student_student_group foreign key (Group_name,Acad_year) references Student_group(Group_name,Acad_year) on update cascade,
	constraint fk_Student_central foreign key (Cdept_name, Cacad_year) references Central (Dept_name, Acad_year) on update cascade,
    constraint fk_Student_teacher foreign key (Tid) references Teacher(Tid) on update cascade,
    constraint fk_Student_nisit_type foreign key (Nfaculty, Ndegree, Ncourse) references Nisit_type(Faculty, Degree, Course) on update cascade
); # fin

create table Activity_participation(
	Sid varchar(10) not null,
	Aname varchar(255) not null,
    Ayear int(5) not null,
    
    primary key (SID, Aname, Ayear),
	constraint fk_Activity_participation_student foreign key (SID) references Student (SID) on update cascade,
    constraint fk_Activity_participation_activity foreign key (Aname, Ayear) references Activity (Aname, Ayear) on update cascade
);

create table Student_registers_in(
	Sid varchar(10) not null,
    Syear int not null,
    Ssemester int not null,
    Ssection int not null,
    Scode varchar(7) not null,
    Sgrade varchar(2) not null,
    
    primary key (Sid, Syear, Ssemester, Ssection, Scode),
    constraint fk_Register_student foreign key (Sid) references Student (Sid) on update cascade,
    constraint fk_Register_section foreign key (Syear, Ssemester, Ssection, Scode) references Section (Syear, Ssemester, Ssection, Scode) on update cascade
); # fin

create table Student_activities(
	Sactivities varchar(255) not null,
    Sid varchar(10) not null,
    
    primary key (Sid,Sactivities),
	constraint fk_Student_activities_student foreign key (Sid) references Student(Sid) on update cascade
);

create table Student_punishments(
	Spunishments varchar(255) not null,
    Sid varchar(10) not null,
    
    primary key (Sid, Spunishments),
    constraint fk_Student_punishments_student foreign key (Sid) references Student(Sid) on update cascade
);

create table Student_winnings(
	Swinnings varchar(255) not null,
    Sid varchar(10) not null,
    
    primary key (Sid, Swinnings),
    constraint fk_Student_winnings_student foreign key (Sid) references Student(Sid) on update cascade
);

create table Teacher(
	Tname varchar(255) not null,
    Tid varchar(10) not null,
    Start_work_date date not null,
    Birth_date date not null,
    Dept_code varchar(3) not null,
    Scode varchar(7) not null,
    
    primary key (Tid),
    constraint fk_Teacher_department foreign key (Dept_code) references Department(Dept_code) on update cascade,
	constraint fk_Teacher_subjects foreign key (Scode) references Subjects (Scode) on update cascade
); # fin

create table Teacher_education(
	Tid varchar(10) not null,
    Teducation varchar(255) not null,
    
    primary key (Tid, Teducation),
    constraint fk_Teacher_education_teacher foreign key (Tid) references Teacher (Tid) on update cascade
); # fin

create table Nisit_type(
	Faculty  varchar(255) not null,
    Degree varchar(255) not null,
    Course varchar(255) not null,
    primary key (Faculty,Degree,Course)
); # fin

create table Term(
	Tyear int not null,
    Tstart date not null,
    Tend date not null,
    Twithdraw date not null,
    Tdrop date not null,
    Tnumber int not null,
    primary key (Tyear,Tnumber)
); # weird

create table Term_payment(
	Amount int not null,
    Tyear int not null,
    Tnumber int not null,
    Paynumber int not null,
    Sid varchar(10) not null,
    
    primary key(Paynumber),
    constraint fk_Term_payment_term foreign key (Tyear,Tnumber) references Term(Tyear,Tnumber) on update cascade,
    constraint fk_Term_payment_student foreign key (Sid) references Student (Sid) on update cascade
); # fin

create table Nisit_In_Term(
	Amount int not null,
	Faculty  varchar(255) not null,
    Degree varchar(255) not null,
    Course varchar(255) not null,
    Tyear int not null,
    Tnumber int not null,
    primary key (Faculty,Degree,Course,Tyear,Tnumber),
    constraint fk_to_Nisit_type foreign key (Faculty,Degree,Course) references Nisit_type(Faculty,Degree,Course) on update cascade,
    constraint fk_to_Term foreign key (Tyear, Tnumber) references Term(Tyear, Tnumber) on update cascade
);

create table Student_group (
	Group_name varchar(255) not null,
    Acad_year int(4) not null,
    primary key (Group_name, Acad_year)
); # fin

create table Central (
	Dept_name varchar(255) not null,
	Acad_year int(4) not null,
    primary key (Dept_name, Acad_year)
); # fin

create table Department (
	Dept_code varchar(3) not null,
    Dept_name varchar(255) not null,
    primary key (Dept_code)
); # fin


