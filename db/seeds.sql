INSERT INTO departments (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal"),
       (5, "Sales");
      
INSERT INTO roles (title, salary, departments_id)      
VALUES ("sales lead", 10000, 1),      
       ("salesperson", 11000, 2),
        ("Lead engineer", 20000, 3),
        ("Software engineer", 15000, 4),
        ("Legal team lead", 20000, 5);
     


INSERT INTO employees ( first_name, last_name, role_id, manager_id)
VALUES ( "Sam", "Jones", 1,NULL)
        ( "John", "Doe", 2,3)
        ( "Jane", "Kim", 3,4)
        ( "Sam", "Smith", 4,5)
        ( "55Grace", "Johnson", 5,1)
      ;
       
