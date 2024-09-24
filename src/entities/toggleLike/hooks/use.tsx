import { IPost } from 'entities/post/model/PostModel';
import { IUser } from 'entities/user/model/userModel';
import { useUser } from 'features/auth/useUser';
import { useQueryClient } from 'react-query';

interface ToggleLikePostContext {
  previousPosts?: IPost[];
}

const updateLikes = (post: IPost, currentUser: IUser): IPost => {
  const userLiked = post.likes.some(
    (user) => user.objectId === currentUser.objectId,
  );
  const updatedLikes = userLiked
    ? post.likes.filter((user) => user.objectId !== currentUser.objectId)
    : [...post.likes, currentUser];

  return {
    ...post,
    likes: updatedLikes,
    likesCount: userLiked ? post.likesCount! - 1 : (post.likesCount || 0) + 1,
  };
};

export const useToggleLikePost = (
  mutationFn: (postId: string) => Promise<void>,
) => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useUser();

  const mutation = useMutation<void, unknown, string>(
    async (postId: string) => {
      await queryClient.cancelQueries([QUERY_KEY.posts]);

      queryClient.setQueryData<IPost[]>([QUERY_KEY.posts], (oldPosts) => {
        if (!oldPosts) return [];
        return oldPosts.map((post) =>
          post.objectId === postId ? updateLikes(post, currentUser) : post,
        );
      });

      await mutationFn(postId);
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries([QUERY_KEY.posts]);
        const previousPosts = queryClient.getQueryData<IPost[]>([
          QUERY_KEY.posts,
        ]);
        return { previousPosts } as ToggleLikePostContext;
      },
      onSuccess: () => {
        queryClient.invalidateQueries([
          QUERY_KEY.posts,
          QUERY_KEY.filteredPosts,
          QUERY_KEY.userPosts,
          QUERY_KEY.post,
        ]);
      },
      onError: (err, postId, context) => {
        const ctx = context as ToggleLikePostContext;
        if (ctx?.previousPosts) {
          queryClient.setQueryData<IPost[]>(
            [QUERY_KEY.posts],
            ctx.previousPosts,
          );
        }
        console.error(err);
      },
      onSettled: () => {
        queryClient.invalidateQueries([QUERY_KEY.posts]);
      },
    },
  );

  return useMemo(
    () => ({
      mutate: mutation.mutate,
      isLoading: mutation.isLoading,
    }),
    [mutation.mutate, mutation.isLoading],
  );
};

interface ILike {
  objectId: string;
}

interface ILikeButton {
  post: IPost;
  currentUser: IUser;
}

export const LikeButton: FC<ILikeButton> = ({ post, currentUser }) => {
  const { objectId: postId, likes = [] } = post;
  const isLiked = likes.some(
    (like: ILike) => like.objectId === currentUser?.objectId,
  );
  const { mutate: toggleLike, isLoading: isLikeLoading } = useToggleLikePost(
    isLiked ? removeLikePostFn : likePostFn,
  );

  const handleToggleLike = useCallback(() => {
    if (!isLikeLoading) {
      toggleLike(postId);
    }
  }, [toggleLike, postId, isLikeLoading]);

  return (
    <>
      <button
        className={styles.like}
        onClick={handleToggleLike}
        disabled={isLikeLoading}
      >
        <img
          src={isLiked ? heartIcon : heartOutlinedIcon}
          alt={isLiked ? 'Unlike' : 'Like'}
        />
      </button>
      {likes.length > 0 && <p>{likes.length}</p>}
    </>
  );
};
