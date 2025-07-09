import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome to BuyRight</h1>
      <p>Click below to analyze a business deal.</p>
      <Link href="/analyzer" style={{ color: 'blue' }}>Go to Analyzer</Link>
    </div>
  );
}