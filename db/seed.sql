USE employees;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 160000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 130000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 126000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 260000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Davidson", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Noor", "Ria", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Katy", "Melon", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shivani", "Bettsy", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leam", "Neeson", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gerald", "Larry", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tim", "Jones", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Disney", "Channel", 1, 2);

