import Link from 'next/link';

export default async function Index() {
  return (
    <div>
      <p>Welcome!!!</p>
      <Link href={'/admin/login'}>
        <strong>Login</strong>
      </Link>{' '}
      to Admin Panel
    </div>
  );
}
