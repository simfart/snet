import { FC } from 'react';
import { ITag } from 'entities/tag/model/TagModel';
import styles from './Tags.module.scss';
import { motion } from 'framer-motion';
import {
  linkAnimation,
  resetButtonAuthAnimation,
} from 'shared/animations/animationSettings';
import { useTags } from 'entities/tag/hooks/useTags';

interface TagsProps {
  onTagClick: (tagId: string) => void;
  selectedTagId: string | null;
}

export const Tags: FC<TagsProps> = ({ selectedTagId, onTagClick }) => {
  const { tags } = useTags();

  const handleTagClick = (tagId: string) => {
    onTagClick(tagId);
  };

  const clearSelection = () => {
    onTagClick('');
  };

  return (
    <div className={styles.tagsContainer}>
      {selectedTagId ? (
        <motion.button
          className={styles.reset}
          onClick={clearSelection}
          {...resetButtonAuthAnimation}
        >
          All Topics
        </motion.button>
      ) : (
        <h2>Trending Topics</h2>
      )}
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
