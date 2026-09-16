import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  url: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ["Frontend", "Backend", "DevOps", "AI", "Mobile", "UI/UX"]
  },
  tags: { 
    type: [String], 
    validate: [v => v.length > 0 && v.length <= 5, 'Tags must have between 1 and 5 items']
  },
  summary: { type: String, maxLength: 300 },
  upvotes: { type: Number, default: 0 },
  upvotedBy: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model('Resource', resourceSchema);
