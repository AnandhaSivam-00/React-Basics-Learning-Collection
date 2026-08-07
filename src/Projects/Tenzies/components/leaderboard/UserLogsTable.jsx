import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Tag, Button, notification, Spin } from 'antd';

import { ArrowRightIcon, ArrowLeftIcon, LoadingIcon } from '../../assets/Icons/Icons';
import { 
    clearLeaderboardError, 
    setCurrentPage, 
    setPageSize, 
    enableNextPage
} from '../../redux/features/leaderboardSlice';
import { fetchUserLogChunks } from '../../redux/features/leaderboardSlice';
import { formatFirebaseTimestamp } from '../../utils/DateTimeFormatting';

const UserLogsTable = () => {
    const { credential, error:authError } = useSelector((state) => state.auth);
    const { 
        loading, 
        error, 
        allUserLogs,  
        hasNextPage,
        hasPrevPage,
        lastVisibleDoc,
        currentPage,
        ITEMS_PER_PAGE
    } = useSelector((state) => state.leaderboard);
    const dispatch = useDispatch();

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if(authError && !credential.length) {
            api.error({
                placement: 'bottomRight',
                message: 'Unauthorized Access!',
                description: `No user credential is found... Try again by login \n${error}`
            })
        }
        else if(error) {
            api.error({
                placement: 'bottomRight',
                message: 'Failed to fetch the data',
                description: `${error}`
            })
        }
        else {
            dispatch(fetchUserLogChunks({
                userId: credential?.uid || credential?.user_id,
                newPage: 1,
                direction: 'initial',
            }))
        }
    }, [credential, error, dispatch]);

    const handlePaginationChange = useCallback(async (newPage, direction) => {
        dispatch(clearLeaderboardError());

        if(currentPage === newPage) return;
        if(newPage < 1) return;

        if(direction === 'prev' && hasPrevPage) {
            if(!hasNextPage) {
                dispatch(enableNextPage(true));
            }

            if(allUserLogs[newPage]) {
                dispatch(setCurrentPage(newPage));
                return;
            } 
        }
        else if(direction === 'prev' && !hasPrevPage) {
            return;
        }
        else if(direction === 'next' && !allUserLogs[newPage + 1] && !lastVisibleDoc) {
            dispatch(enableNextPage(false));
        }
        else {
            dispatch(fetchUserLogChunks({
                userId: credential?.uid || credential?.user_id,
                newPage,
                direction,
            }))
        }

        dispatch(setCurrentPage(newPage));
    }, [currentPage, hasPrevPage, credential, dispatch, allUserLogs]);

    const columns = [
        {
            title: 'Time Taken (Formatted)',
            dataIndex: 'time_taken_formatted',
            key: 'time_taken_formatted',
            align: 'center',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Time Taken',
            dataIndex: 'time_taken',
            key: 'time_taken',
            minWidth: 60,
            align: 'center',
        },
        {
            title: 'Total roll clicks',
            dataIndex: 'total_roll_clicks',
            key: 'total_roll_clicks',
            minWidth: 60,
            align: 'center',
        },
        {
            title: 'Dice final value',
            key: 'dice_final_value',
            dataIndex: 'dice_final_value',
            minWidth: 60,
            align: 'center',
        },
        {
            title: 'Date & Time',
            dataIndex: 'date_time',
            key: 'date_time',
            align: 'center',
            render: text => <span>{formatFirebaseTimestamp(text) || 'N/A'}</span>
        },
    ];

    const tableFooter = () => {
        return (
            <div className='d-flex justify-content-end align-items-center gap-3 pe-2'>
                <Button 
                    onClick={() => handlePaginationChange(currentPage - 1, 'prev')} 
                    disabled={!hasPrevPage || currentPage <= 1}
                >
                    <ArrowLeftIcon width='20' height='20' />
                </Button>
                <span>Page {currentPage}</span>
                <Button 
                    onClick={() => handlePaginationChange(currentPage + 1, 'next')} 
                    disabled={!hasNextPage}
                >
                    <ArrowRightIcon width='20' height='20' />
                </Button>
            </div>
        )
    }

    return (
        <>
            <div className='mx-auto'>
                <Table 
                    tableLayout='auto'
                    columns={columns} 
                    dataSource={allUserLogs[currentPage]} 
                    loading={{
                        indicator: <Spin size='large' indicator={<LoadingIcon width='70' height='70' />}/>,
                        spinning: loading,
                    }}
                    sticky
                    pagination={false}
                    size='middle'
                    bordered
                    // scroll={{ y: 'max-content' }}
                    centered
                    footer={tableFooter}
                    rowKey='id'
                />
            </div>
            {contextHolder}
        </>
    )
}

export default UserLogsTable