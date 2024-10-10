import Post from "../database/models/post";

class postServices {
  async findUserPosts(userId: string) {
    const userPosts = await Post.findAll({ where: { userId } });
    return userPosts;
  }
  async findAllPosts() {
    const recomendedPosts = await Post.findAll();

    if (recomendedPosts.length === 0) {
      throw new Error(
        "The data base was empty,Please share any post for viewing"
      );
    }
    return recomendedPosts;
  }
}

export const postService = new postServices();
