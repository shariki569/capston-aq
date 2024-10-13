import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  SectionHeading: { type: String, required: true },
  SectionContent: { type: String, required: true },
  Page_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
});

const PageSchema = new mongoose.Schema(
  {
    Slug: { type: String, required: true, unique: true },
    PageTitle: { type: String, required: true },
    sections: [SectionSchema], // Embedded array of sections
  },
  { timestamps: true }
);

export const Page = mongoose.model('Page', PageSchema);
export const Section = mongoose.model('Section', SectionSchema);
