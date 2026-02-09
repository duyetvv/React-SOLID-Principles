import React from 'react';

import { DEFAULTS, CSS_CLASSES } from '../../core/constants';
import { type ListProps } from '../../core/types';

import './List.scss';

// Example 2: Render Props
// Closed for modification: The list iteration logic is fixed.
// Open for extension: How each item is rendered is completely flexible via the renderItem prop.
export const List = React.memo(
  <T extends Record<string, any>>({
    items,
    renderItem,
    keyExtractor,
    emptyMessage = DEFAULTS.LIST_EMPTY_MESSAGE,
    className = DEFAULTS.LIST_CLASS_NAME,
  }: ListProps<T>) => {
    // Handle empty state
    if (items.length === 0) {
      return <div className={`${CSS_CLASSES.LIST} ${CSS_CLASSES.LIST_EMPTY} ${className}`}>{emptyMessage}</div>;
    }

    return (
      <ul className={`${CSS_CLASSES.LIST} ${className}`} role="list">
        {items.map((item: T, index: number) => {
          const key = keyExtractor ? keyExtractor(item, index) : (item as any).id ?? index;
          return (
            <li key={key} className={CSS_CLASSES.LIST_ITEM} role="listitem">
              {renderItem(item, index)}
            </li>
          );
        })}
      </ul>
    );
  }
) as <T extends Record<string, any>>(
  props: ListProps<T>
) => React.ReactElement | null;
