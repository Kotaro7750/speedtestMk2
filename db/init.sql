USE speedtest

CREATE TABLE place (
  id INT NOT NULL AUTO_INCREMENT,
  place TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE telemetry (
  id INT NOT NULL AUTO_INCREMENT,
  place INT NOT NULL,
  ping float NOT NULL,
  jitter float NOT NULL,
  upload float NOT NULL,
  download float NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX index_place(id),
  FOREIGN KEY telemetry_place_fk(place) REFERENCES place(id)
);

INSERT INTO place(place)
VALUES ("一号館");

INSERT INTO place(place)
VALUES ("二号館");
