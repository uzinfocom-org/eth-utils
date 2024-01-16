import React from 'react';
import { ethers } from 'ethers';
import { Button, Code, FileButton, Group, Modal, Table, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { DefaultLayout } from '../components/Layouts';

const WalletWizardPage: React.FC = () => {
  const [wallet, setWallet] = React.useState<ethers.Wallet | ethers.HDNodeWallet | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = React.useState<File | null>(null);
  const resetRef = React.useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef?.current?.();
  };

  const createWallet = () => {
    setWallet(ethers.HDNodeWallet.createRandom());
  };

  const getWalletDetails = (w: ethers.Wallet | ethers.HDNodeWallet) => ({
    body: [
      ['Address', <Code>{w.address}</Code>],
      ['Private key', <Code>{w.privateKey}</Code>],
      // TODO: remove ts-ignore here
      // @ts-ignore
      ['Mnemonic', <Code>{w?.mnemonic?.phrase}</Code>],
    ],
  });

  React.useEffect(() => {
    if (!file) return;

    (async () => {
      try {
        const text = await file.text();

        try {
          const json = JSON.parse(text);
          // eslint-disable-next-line
          const password = prompt('Enter file password') ?? '';
          console.log(json, password);
          try {
            setWallet(ethers.Wallet.fromEncryptedJsonSync(text, password));
            close();
          } catch (e) {
            console.error(e);
            notifications.show({
              title: 'Error',
              message: 'Invalid JSON wallet',
            });
          }
        } catch (e) {
          console.error(e);
          notifications.show({
            title: 'Error',
            message: "Can't parse file contents",
          });
        }
      } catch (e) {
        console.error(e);
        notifications.show({
          title: 'Error',
          message: "Can't read file contents",
        });
      }
    })();
    clearFile();
  }, [file]);

  return (
    <DefaultLayout>
      <Title mb="lg">Wallet Wizard</Title>

      {!wallet && (
        <>
          <Title order={2} mb="md">
            Create or import wallet
          </Title>
          <Group>
            <Button variant="default" onClick={createWallet}>
              Create wallet
            </Button>
            <Button variant="default" onClick={open}>
              Import wallet
            </Button>
          </Group>

          <Modal opened={opened} onClose={close} title="Import wallet" centered>
            <FileButton onChange={setFile} resetRef={resetRef}>
              {(props) => <Button {...props}>Select wallet</Button>}
            </FileButton>
          </Modal>
        </>
      )}

      {wallet && (
        <>
          <Title order={2} mb="md">
            Wallet details
          </Title>
          <Table mb="lg" data={getWalletDetails(wallet)} />
          <Button variant="outline" color="red" onClick={() => setWallet(null)}>
            Clear
          </Button>
        </>
      )}
    </DefaultLayout>
  );
};

export default WalletWizardPage;
