import { usePrivy } from "@privy-io/react-auth";
import { UseSendTransaction } from "@privy-io/react-auth/solana";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";

export default function SendTransactionButton() {
  const { sendTransaction } = useSendTransaction();
  const connection = new Connection("https://api.devnet.solana.com");
  const { user } = usePrivy();

  // Create a new transaction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: user.wallet.publicKey,
      toPubkey: new PublicKey("RECIPIENT_ADDRESS_HERE"),
      lamports: 0.1 * LAMPORTS_PER_SOL,
    })
  );

  const onSendTransaction = async () => {
    sendTransaction({
      transaction,
      connection,
    });
  };

  return <button onClick={onSendTransaction}>Send Transaction</button>;
}
