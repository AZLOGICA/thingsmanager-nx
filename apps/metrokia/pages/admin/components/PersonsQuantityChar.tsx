import { useMemo } from 'react';
import InfoCard from './InfoCard';

interface Props {
  data: any;
}

function PersonsQuantityChart({ data }: Props) {
  const totalPersons = useMemo(() => {
    return data.persons.length;
  }, [data]);

  return <InfoCard title="Personas detectadas en total" value={totalPersons} />;
}

export default PersonsQuantityChart;
