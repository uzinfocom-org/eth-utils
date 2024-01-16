import { IconWallet } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import ActionsGrid from '../components/ActionsGrid';
import { DefaultLayout } from '../components/Layouts';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <ActionsGrid
        title="Default"
        data={[
          {
            title: 'Wallet Wizard',
            icon: IconWallet,
            onClick: () => navigate('/wallet-wizard'),
          },
        ]}
      />
    </DefaultLayout>
  );
};

export default HomePage;
