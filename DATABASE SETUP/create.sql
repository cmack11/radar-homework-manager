drop table if exists User;
drop table if exists Subject;
drop table if exists Task;

create table User (
	User_id INT(11) PRIMARY KEY,
	Name VARCHAR(50) NOT NULL,
	Email VARCHAR(150) NOT NULL,
	Password VARCHAR(50) NOT NULL,
	Creat_item TIMESTAMP
);

create table Subject (
	Subject_id INT(10) PRIMARY KEY,
	Name VARCHAR(50) NOT NULL,
	Color VARCHAR(50),
	Description VARCHAR(150),
	Primary_type VARCHAR(50) NOT NULL,
	User_id INT(11) NOT NULL,
	FOREIGN KEY (User_id) REFERENCES User(User_id) 
);

create table Task (
	Task_id INT(11) PRIMARY KEY,
	Name VARCHAR(50) NOT NULL,
	Description VARCHAR(150) NOT NULL,
	Type VARCHAR(50) NOT NULL,
	Deadline DATETIME NOT NULL,
	Progress INT(11),
	Date_complete DATETIME,
	Subject_id INT(10) NOT NULL,
	FOREIGN KEY (Subject_id) REFERENCES Subject(Subject_id) 
);

