import {
  DashboardGrid,
  LandingCard,
  LandingHeader,
  Title,
} from '@thingsmanager-nx/common-ui';
import {
  startLoadingDashboard,
  useAppDispatch,
  useAppSelector,
} from '@thingsmanager-nx/store';
import React, { useEffect, useState } from 'react';
import GeneralChart from '../components/GeneralChart';
import LogsQuantityChart from '../components/LogsQuantityChart';
import PersonsQuantityChart from '../components/PersonsQuantityChar';
import PersonsChart from '../components/PersonsChart';
import LastPersonsDetected from '../components/LastPersonsDetected';
import DetectionsChart from '../components/DetectionsChart';
import LogsAndPersonsChart from '../components/LogsAndPersonsChart';
import PersonsDateChart from '../components/PersonsDateChart';
import PersonsList from '../components/PersonsList';
import LastLogCard from '../components/LastLogCard';

function Landing(props) {
  const dispatch = useAppDispatch();

  const { displayName } = useAppSelector((state) => state.auth);
  const { today, week } = useAppSelector((state) => state.dashboard);
  const [dateFilter, setDateFilter] = useState('today');

  const [data, setData] = useState(null);

  console.log('today', today);
  useEffect(() => {
    if (dateFilter === 'today') {
      if (today) {
        setData(today);
      } else {
        dispatch(startLoadingDashboard(dateFilter));
      }
    }
  }, [dateFilter, today, week]);

  const getData = () => {
    console.log('getData', getData);
    if (dateFilter == 'today') dispatch(startLoadingDashboard(dateFilter));
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      getData();
    }, 120000);
    return () => clearInterval(intervalId); //This is important
  }, []);

  return (
    <div className="p-8">
      <LandingHeader
        title={`Bienvenido de nuevo ${displayName}`}
        description=""
      />

      <div className="grid gap-3 grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
        <LandingCard title={'Logs'} description={'Logs'} link={'/admin/logs'} />
        <LandingCard
          title={'Usuarios'}
          description={'Usuarios'}
          link={'/admin/persons'}
        />
      </div>
      <div className="my-8">
        <Title title="Dashboard" />
      </div>

      {data && (
        <div className="mb-8">
          <DashboardGrid
            dateFilter={dateFilter}
            onChangeTab={(e: string) => {
              setDateFilter(e);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5">
              <LogsQuantityChart data={data} />
              <PersonsQuantityChart data={data} />
              <LastLogCard data={data} />
            </div>
            <div className="md:flex md:flex-wrap">
              <div className="w-full md:w-4/6">
                <PersonsChart data={data} />
              </div>
              <div className="w-full md:w-2/6">
                <PersonsList data={data} />
              </div>
            </div>

            {/*<PersonsDateChart data={data}  dateFilter={dateFilter}  />*/}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 my-5">
              <LogsAndPersonsChart data={data} />
              <LastPersonsDetected data={data} />
            </div>
            <DetectionsChart data={data} dateFilter={dateFilter} />
          </DashboardGrid>
        </div>
      )}
    </div>
  );
}

export default Landing;
