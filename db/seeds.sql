INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal"),
       (5, "Sales");
      
INSERT INTO role (title, salary, department_id)      
VALUES ("sales lead"), 10000,      
       ("salesperson", 11000),
        ("Lead engineer", 20000)      
      ("Software engineer", 15000);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, Sam, Jones, 1,NULL)
        (2, John, Doe, 2,3)
        (3, Jane, Kim, 3,4)
        (4, Sam, Smith, 4,5)
        (5, Grace, Johnson, 5,1)
      ;
       
