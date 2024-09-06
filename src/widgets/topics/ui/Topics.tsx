import { useTags } from 'entities/tag/hooks/useTags';
import { FC } from 'react';
import styles from './Topics.module.scss';
import { ITag } from 'entities/tag/model/TagModel';

export const Topics: FC = () => {
  const { tags } = useTags();
  return (
    <div className={styles.tagsContainer}>
      <h2>Trending Topics</h2>
      {tags?.map((tag: ITag) => (
        <div key={tag.objectId} className={styles.tagItem}>
          {`#${tag.name}`}
        </div>
      ))}
    </div>
  );
};
