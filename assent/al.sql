CREATE TABLE "orders" (
  "OlderiD" INT NOT NULL AUTO_INCREMENT,
  "Title" VARCHAR(45) NULL,
  "Type" VARCHAR(45) NULL,
  "Date" DATE NULL,
  "PordactId" INT NULL,
  "Status" INT NULL,
  "Isdarft" TINYINT NULL,
  PRIMARY KEY ("OlderiD"));


CREATE TABLE "olderpordact" (
  "OlderId" INT NOT NULL,
  "PordactId" VARCHAR(45) NOT NULL,
  "Sizes" VARCHAR(45) NULL,
  PRIMARY KEY ("OlderId"));

ALTER TABLE "orders" 
ADD CONSTRAINT "OlderId"
  FOREIGN KEY ("OlderiD")
  REFERENCES "olderpordact" ("OlderId")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
--------------------------------------------

CREATE TABLE "orders" (
  "OlderiD" INT IDENTITY(1,1) PRIMARY KEY,
  "Title" Nvarchar(Max) NULL,
  "Type" Nvarchar(Max) NULL,
  "Date" DATE NULL,
  "Status" INT NULL,
  "Isdarft" BIT NULL,
  );


CREATE TABLE "olderpordact" (
  "tranctionId" INT IDENTITY(1,1) PRIMARY KEY,
  "OlderId" INT NULL,
  "PordactId" int NULL,
  "Sizes" Nvarchar(Max) NULL,
  "quantity" int NULL,
);


CREATE TABLE "prodacts" (
  "prodactId" INT IDENTITY(1,1) PRIMARY KEY,
  "pordactName" NVARCHAR(Max) NULL,
  "prodactImage" NVARCHAR(Max) NULL,
  "typeSize" int NULL,
  "IsActive" BIT NULL,
);

CREATE TABLE "Users" (
  "UserId" INT IDENTITY(1,1) PRIMARY KEY,
  "fullName" NVARCHAR(Max) NULL,
  "ID" NVARCHAR(Max) NULL,
  "Email" NVARCHAR(Max) NULL,
  "phoneNumber" NVARCHAR(Max),
);
ALTER TABLE "orders" 
ADD CONSTRAINT "OlderId"
  FOREIGN KEY ("OlderiD")
  REFERENCES "olderpordact" ("OlderId")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
