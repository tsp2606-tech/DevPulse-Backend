import Resource from '../models/resourceModel.js';

export const createResource = (data) => Resource.create(data);

export const getResources = async (query) => {
  const { search, category, tag, sortBy } = query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { summary: { $regex: search, $options: 'i' } }
    ];
  }
  if (category) filter.category = category;
  if (tag) filter.tags = tag;

  let sort = { createdAt: -1 }; // Newest default
  if (sortBy === 'upvotes') {
    sort = { upvotes: -1, createdAt: -1 };
  }

  return Resource.find(filter).sort(sort);
};

export const updateResource = (id, data) => Resource.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const deleteResource = (id) => Resource.findByIdAndDelete(id);

export const upvoteResource = async (id, guestId) => {
  const resource = await Resource.findById(id);
  if (!resource) {
    const error = new Error('Không tìm thấy tài nguyên');
    error.status = 404;
    throw error;
  }
  
  const hasUpvoted = resource.upvotedBy.includes(guestId);
  
  if (hasUpvoted) {
    // Hủy upvote
    return Resource.findByIdAndUpdate(
      id,
      {
        $inc: { upvotes: -1 },
        $pull: { upvotedBy: guestId }
      },
      { new: true }
    );
  } else {
    // Thêm upvote
    return Resource.findByIdAndUpdate(
      id, 
      { 
        $inc: { upvotes: 1 },
        $addToSet: { upvotedBy: guestId }
      }, 
      { new: true }
    );
  }
};
