export const cryptoWallets = {
  btc: {
    name: 'Bitcoin',
    address: 'bc1qeeksuh2gemzvwlcej0hjxfddmrnmfe08ps8jxg',
    amount: '',
    usdValue: '',
    network: 'Bitcoin',
  },
  usdt: {
    name: 'USDT (ERC20)',
    address: '0x0d64669d8B45e50a486263B020143df6a8eBA701',
    amount: '',
    usdValue: 'ERC20 Network',
    network: 'ERC20',
  },
  eth: {
    name: 'Ethereum',
    address: '0x0d64669d8B45e50a486263B020143df6a8eBA701',
    usdValue: '',
    network: 'Ethereum',
  }
};

// Valid transaction hashes for testing (movie purposes)
export const validTransactionHashes = [
  'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
  'f9e8d7c6b5a4321098765432109876543210fedcba0987654321fedcba098765',
  '123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01',
  // Any 64-character hex string will work for testing
];

export const isValidTransactionHash = (hash: string): boolean => {
  // Check if it's a valid 64-character hex string
  const hexRegex = /^[a-fA-F0-9]{64}$/;
  return hexRegex.test(hash) || validTransactionHashes.includes(hash.toLowerCase());
};