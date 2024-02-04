import {memo, useMemo} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';

import cls from './TaskSortSelector.module.scss';
import {ListBox} from '@/shared/ui/component/Popups';
import {HStack} from '@/shared/ui/component/Stack';
import {Text} from '@/shared/ui/component/Text';
import {ListBoxItem} from "@/shared/ui/component/Popups/components/ListBox/ListBox";


export enum taskSortField {
    ALL = 'all',
    COMPLETED = 'true',
    NOTCOMPLETED = 'false',
}


interface taskSortSelectorProps {
    className?: string;
  sort: taskSortField;
   onChangeSort: (newSort: taskSortField) => void;
}

export const TaskSortSelector = memo((props: taskSortSelectorProps) => {
    const {className, onChangeSort, sort
    } = props;

    const sortStatusOptions = useMemo<ListBoxItem<taskSortField>[]>(
        () => [
            {
                value: 'all',
                content: ('All'),
            },
            {
                value: 'true',
                content: ('completed'),
            },
            {
                value: 'false',
                content: ('not completed'),
            },
        ],
        [],
    );

    return (
        <div
            className={classNames(
                cls.TaskSortSelector,
                {},
                [className],
            )}
        >
            <HStack gap="8">
                <Text text="Display:"/>
                <ListBox
                    items={sortStatusOptions}
                    value={sort}
                    onChange={onChangeSort}
                />
            </HStack>
        </div>
    );
});