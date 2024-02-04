import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TaskFilters.module.scss';
import { Card } from '@/shared/ui/component/Card';
import { VStack } from '@/shared/ui/component/Stack';
import { Input } from '@/shared/ui/component/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/component/Icon';
import {taskSortField, TaskSortSelector} from "@/features/TaskSortSelector/ui/TaskSortSelector/TaskSortSelector";
import {Text} from "@/shared/ui/component/Text";

interface ArticlesFiltersProps {
    className?: string;
    sort: taskSortField
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeSort: (newSort: taskSortField) => void;
}

export const TaskFilters = memo((props: ArticlesFiltersProps) => {
    const {
        className,
        onChangeSearch,
        search,
        onChangeSort,
        sort,
    } = props;


    return (
        <Card
            className={classNames(cls.TasksFilters, {}, [className])}
            padding="24"
            variant="light"
        >
            <VStack gap="24">
                <Text title="Filters"/>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    size="m"
                    placeholder="Search"
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
                <TaskSortSelector
                    sort={sort}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
