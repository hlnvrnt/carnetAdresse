USE carnetadresse; 

DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `contact`;

DROP TABLE IF EXISTS `user_contact`;

CREATE TABLE 
      user(
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        hashed_password VARCHAR(255) NOT NULL
      );

CREATE TABLE 
      contact(
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        birthday VARCHAR(255)  NULL,
        image VARCHAR(255) NOT NULL
      );

 /* ------------------ ICI LES INSERT ------------------- */
INSERT INTO
    user (
        email,
        name,
        hashed_password
    )
VALUES (
        'helene@email.com',
        'Hélène',
        '$argon2id$v=19$m=19456,t=2,p=1$890JsrrTy3gBSJRoilq/OA$2JzWY+chMUD+UiF21UERzX7ot2kQX94tdiPtJRpI52w'
    );     

INSERT INTO
    contact (
        name,
        email,
        phone_number,
        address,
        birthday,
        image
    )
VALUES (
        'Julie',
        'julie@email.com',
        '06.15.78.45.99',
        '25 bd de Bellevue, Ancenis',
        '7 janvier 1999',
        '/images/woman3.png'
    ),
    (
        'Nadine',
        'nadine@email.com',
        '06.23.45.78.94',
        '6 Avenue des Rosiers, Nantes',
        '25 septembre 1993',
        '/images/woman2.png'
    ),
    (
        'Irwin',
        'irwin@email.com',
        '06.98.74.12.36',
        '33 rue des Peupliers, Vertou',
        '15 mars 1992',
        '/images/boy.png'
    );

