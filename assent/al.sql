CREATE TABLE "oldersystem"."orders" (
  "OlderiD" INT NOT NULL AUTO_INCREMENT,
  "Title" VARCHAR(45) NULL,
  "Type" VARCHAR(45) NULL,
  "Date" DATE NULL,
  "PordactId" INT NULL,
  "Status" INT NULL,
  "Isdarft" TINYINT NULL,
  PRIMARY KEY ("OlderiD"));


CREATE TABLE "oldersystem"."olderpordact" (
  "OlderId" INT NOT NULL,
  "PordactId" VARCHAR(45) NOT NULL,
  "Sizes" VARCHAR(45) NULL,
  PRIMARY KEY ("OlderId"));

ALTER TABLE "oldersystem"."orders" 
ADD CONSTRAINT "OlderId"
  FOREIGN KEY ("OlderiD")
  REFERENCES "oldersystem"."olderpordact" ("OlderId")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
--------------------------------------------

CREATE TABLE "oldersystem"."orders" (
  "OlderiD" INT IDENTITY(1,1) PRIMARY KEY,
  "Title" VARCHAR(45) NULL,
  "Type" VARCHAR(45) NULL,
  "Date" DATE NULL,
  "PordactId" INT NULL,
  "Status" INT NULL,
  "Isdarft" TINYINT NULL,
  );


CREATE TABLE "oldersystem"."olderpordact" (
  "OlderId" INT NOT NULL PRIMARY KEY,
  "PordactId" int NOT NULL PRIMARY KEY,
  "Sizes" VARCHAR(45) NULL,
);

ALTER TABLE "oldersystem"."orders" 
ADD CONSTRAINT "OlderId"
  FOREIGN KEY ("OlderiD")
  REFERENCES "olderpordact" ("OlderId")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
