/* eslint-disable-next-line */
export interface DashboardGridProps {
  children?: React.ReactElement | React.ReactElement[];
  onChangeTab: (tab: string) => void;
  dateFilter: string;
}


export function DashboardGrid({ children , dateFilter}: DashboardGridProps) {
  return (
    <div className="w-full">
      <div className="flex flex-end justify-end">
      <div className="tabs tabs-boxed w-fit ">
        <a className={`tab ${dateFilter === 'today' ? 'tab-active' : ''}`}>Hoy</a>
        {/*<a className="tab ">Semana</a>
        <a className="tab">Mes</a>*/}
      </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

export default DashboardGrid;
