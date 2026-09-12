-- Aqua Cainta / cainta-web schema (reconstructed from API controllers)
-- Run this against your Aiven MySQL service (use the DB name from Aiven, often `defaultdb`)

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  img VARCHAR(255) NULL,
  UNIQUE KEY uq_users_username (username),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS posts (
  PostId INT AUTO_INCREMENT PRIMARY KEY,
  PostTitle VARCHAR(255) NULL,
  PostDesc LONGTEXT NULL,
  PostImg VARCHAR(255) NULL,
  PostCat VARCHAR(100) NULL,
  date DATETIME NULL,
  Post_Uid INT NULL,
  CONSTRAINT fk_posts_user FOREIGN KEY (Post_Uid) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS accommodations (
  Accommodation_Id VARCHAR(32) PRIMARY KEY,
  Accommodation_Title VARCHAR(255) NULL,
  Accommodation_Desc LONGTEXT NULL,
  Accommodation_Cap VARCHAR(50) NULL,
  Accommodation_Price VARCHAR(50) NULL,
  Accommodation_Unit VARCHAR(50) NULL,
  Accommodation_Type VARCHAR(50) NULL,
  Accommodation_Img VARCHAR(255) NULL,
  Accommodation_Date DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS facilities (
  Fac_Id VARCHAR(32) PRIMARY KEY,
  Fac_Title VARCHAR(255) NULL,
  Fac_Desc LONGTEXT NULL,
  Fac_Date DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS facility_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Fac_Id VARCHAR(32) NOT NULL,
  FacImg_Name VARCHAR(255) NOT NULL,
  Is_Featured TINYINT(1) NOT NULL DEFAULT 0,
  CONSTRAINT fk_facility_images_fac FOREIGN KEY (Fac_Id) REFERENCES facilities(Fac_Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS amenities (
  Amenity_Id VARCHAR(32) PRIMARY KEY,
  Amenity_Title VARCHAR(255) NULL,
  Amenity_Img VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS pages (
  PageId INT AUTO_INCREMENT PRIMARY KEY,
  Slug VARCHAR(100) NOT NULL,
  PageTitle VARCHAR(255) NULL,
  UNIQUE KEY uq_pages_slug (Slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS sections (
  SectionId INT AUTO_INCREMENT PRIMARY KEY,
  Page_Id INT NOT NULL,
  SectionHeading VARCHAR(255) NULL,
  SectionContent LONGTEXT NULL,
  SectionImage VARCHAR(255) NULL,
  CONSTRAINT fk_sections_page FOREIGN KEY (Page_Id) REFERENCES pages(PageId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contact_details (
  contact_id INT PRIMARY KEY,
  con_address TEXT NULL,
  con_email VARCHAR(255) NULL,
  con_telphone VARCHAR(50) NULL,
  con_cellphone VARCHAR(50) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
