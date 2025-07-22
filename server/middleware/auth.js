import { clerkClient } from '@clerk/express';

export const auth = async (req, res, next) => {
  try {
    const { userId } = await req.auth();
    //console.log("👤 User ID:", userId);

    const user = await clerkClient.users.getUser(userId);
    const plan = user.privateMetadata.plan || 'free';
    const hasPremiumPlan = plan === 'premium';

    //console.log("📦 Clerk Plan in Metadata:", plan);

    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      // ✅ Fix here: merge metadata to preserve plan
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...user.privateMetadata,
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? 'premium' : 'free';
    next();
  } catch (error) {
    //console.error("❌ Auth Middleware Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
