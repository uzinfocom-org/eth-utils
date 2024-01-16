import ActionsGrid from '../components/ActionsGrid';
import { DefaultLayout } from '../components/Layouts';

const HomePage: React.FC = () => (
  <DefaultLayout>
    <ActionsGrid title="Default" data={[]} />
  </DefaultLayout>
);

export default HomePage;
