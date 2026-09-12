-- Minimal seed so About / Contact / admin flows work
-- Edit the placeholder text/images after the app is running

INSERT INTO contact_details (contact_id, con_address, con_email, con_telphone, con_cellphone)
VALUES (
  1,
  'Cainta, Rizal, Philippines',
  'info@aquacainta.example',
  '(02) 0000-0000',
  '09XX XXX XXXX'
)
ON DUPLICATE KEY UPDATE contact_id = contact_id;

INSERT INTO pages (PageId, Slug, PageTitle)
VALUES (1, 'about-us', 'About Us')
ON DUPLICATE KEY UPDATE PageTitle = VALUES(PageTitle);

INSERT INTO sections (SectionId, Page_Id, SectionHeading, SectionContent, SectionImage)
VALUES
  (1, 1, 'Our Story', '<p>Welcome to Aqua Cainta. Update this section from the admin dashboard.</p>', NULL),
  (2, 1, 'Our Mission', '<p>Share what makes your resort special. Edit this in Pages &gt; About Us.</p>', NULL)
ON DUPLICATE KEY UPDATE
  SectionHeading = VALUES(SectionHeading),
  SectionContent = VALUES(SectionContent);

-- Sample amenities (no create API exists — seed here or insert manually)
INSERT INTO amenities (Amenity_Id, Amenity_Title, Amenity_Img) VALUES
  ('A1', 'Free WiFi', NULL),
  ('A2', 'Parking', NULL),
  ('A3', 'Pool Access', NULL)
ON DUPLICATE KEY UPDATE Amenity_Title = VALUES(Amenity_Title);
