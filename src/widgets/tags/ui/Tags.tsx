import { FC } from 'react';
import { ITag } from 'entities/tag/model/TagModel';
import styles from './Tags.module.scss';
import { motion } from 'framer-motion';
import { linkAnimation } from 'shared/animations/animationSettings';
import { useTags } from 'entities/tag/hooks';

interface TagsProps {
  onTagClick: (tagId: string, tagName: string) => void;
  selectedTagId: string | null;
}

export const Tags: FC<TagsProps> = ({ selectedTagId, onTagClick }) => {
  const { tags } = useTags();

  const handleTagClick = (tagId: string) => {
    const selectedTag = tags?.find((tag: ITag) => tag.objectId === tagId);
    if (selectedTag) {
      onTagClick(selectedTag.objectId, selectedTag.name);
    }
  };

  return (
    <div className={styles.tagsContainer}>
      <h2>Trending Topics</h2>
      <div className={styles.tags}>
        {tags?.map((tag: ITag) => (
          <motion.div
            key={tag.objectId}
            className={`${styles.tagItem} ${
              selectedTagId === tag.objectId ? styles.selectedTag : ''
            }`}
            onClick={() => handleTagClick(tag.objectId)}
            {...linkAnimation}
          >
            {`#${tag.name}`}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
