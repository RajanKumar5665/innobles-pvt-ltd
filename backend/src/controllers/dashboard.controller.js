import Blog from "../models/Blog.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import Career from "../models/Career.js";
import Contact from "../models/Contact.js";
import JobApplication from "../models/JobApplication.js";
import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";

const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalBlogs,
    publishedBlogs,
    draftBlogs,
    totalProducts,
    publishedProducts,
    draftProducts,
    totalServices,
    publishedServices,
    draftServices,
    totalCareers,
    openCareers,
    closedCareers,
    totalContacts,
    unreadContacts,
    readContacts,
    totalApplications,
    newApplications,
    reviewingApplications,
    shortlistedApplications,
    rejectedApplications,
  ] = await Promise.all([
    Blog.countDocuments(),
    Blog.countDocuments({ status: "published" }),
    Blog.countDocuments({ status: "draft" }),
    Product.countDocuments(),
    Product.countDocuments({ status: "published" }),
    Product.countDocuments({ status: "draft" }),
    Service.countDocuments(),
    Service.countDocuments({ status: "published" }),
    Service.countDocuments({ status: "draft" }),
    Career.countDocuments(),
    Career.countDocuments({ status: "open" }),
    Career.countDocuments({ status: "closed" }),
    Contact.countDocuments(),
    Contact.countDocuments({ status: "unread" }),
    Contact.countDocuments({ status: "read" }),
    JobApplication.countDocuments(),
    JobApplication.countDocuments({ status: "new" }),
    JobApplication.countDocuments({ status: "reviewing" }),
    JobApplication.countDocuments({ status: "shortlisted" }),
    JobApplication.countDocuments({ status: "rejected" }),
  ]);

  const [recentBlogs, recentApplications, recentContacts] = await Promise.all([
    Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status createdAt updatedAt")
      .lean(),
    JobApplication.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("careerId", "title department")
      .select("name email status createdAt")
      .lean(),
    Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email status createdAt")
      .lean(),
  ]);

  const stats = {
    blogs: { total: totalBlogs, published: publishedBlogs, draft: draftBlogs },
    products: {
      total: totalProducts,
      published: publishedProducts,
      draft: draftProducts,
    },
    services: {
      total: totalServices,
      published: publishedServices,
      draft: draftServices,
    },
    careers: { total: totalCareers, open: openCareers, closed: closedCareers },
    contacts: {
      total: totalContacts,
      unread: unreadContacts,
      read: readContacts,
    },
    applications: {
      total: totalApplications,
      new: newApplications,
      reviewing: reviewingApplications,
      shortlisted: shortlistedApplications,
      rejected: rejectedApplications,
    },
    recentBlogs,
    recentApplications,
    recentContacts,
  };

  return success(res, stats, "Dashboard stats retrieved");
});

export default { getDashboardStats };
