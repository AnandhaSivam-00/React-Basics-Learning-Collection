import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Spin, notification } from 'antd'
import { LoadingIcon } from '../../assets/Icons/Icons'
import { fetchGlobalLeaderboard } from '../../redux/features/leaderboardSlice'
import { formatFirebaseTimestamp } from '../../utils/DateTimeFormatting'

const LeaderTable = () => {
    const { globalLeaderboard, loading, error } = useSelector((state) => state.leaderboard);
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        dispatch(fetchGlobalLeaderboard());
    }, [dispatch]);

    useEffect(() => {
        if(error) {
            api.error({
                placement: 'bottomRight',
                title: 'Failed to fetch global leaderboard',
                description: `${error}`
            });
        }
    }, [error, api]);

    const columns = [
        {
            title: 'Rank',
            key: 'rank',
            align: 'center',
            render: (text, record, index) => <strong>#{index + 1}</strong>,
            width: 80,
        },
        {
            title: 'Username',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Time Taken',
            dataIndex: 'fastest_finish',
            key: 'fastest_finish',
            align: 'center',
        },
        {
            title: 'Total Rolls',
            dataIndex: 'lowest_clicks',
            key: 'lowest_clicks',
            align: 'center',
        },
        {
            title: 'Date & Time',
            dataIndex: 'latest_attempt_at_formatted',
            key: 'latest_attempt_at_formatted',
            align: 'center',
            render: text => <span>{text || 'N/A'}</span>
        },
    ];

    return (
        <>
            <div className='mx-auto'>
                <Table
                    tableLayout='auto'
                    columns={columns}
                    dataSource={globalLeaderboard}
                    loading={{
                        indicator: <Spin size='large' indicator={<LoadingIcon width='70' height='70' />} />,
                        spinning: loading,
                    }}
                    pagination={false}
                    size='middle'
                    bordered
                    centered
                    rowKey='id'
                />
            </div>
            {contextHolder}
        </>
    )
}

export default LeaderTable