USE speedtest

CREATE TABLE place (
  id INT NOT NULL AUTO_INCREMENT,
  place TEXT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO place(place)
VALUES ("一号館");
