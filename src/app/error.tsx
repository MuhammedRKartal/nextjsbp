'use client';

import Link from 'next/link';
import { ROUTES } from '../routes';

export default function Error() {
  return (
    <section className="text-center m-14">
      <h1 className="text-xl">Error Page</h1>
      <p className="text-xl">There is an error.</p>
      <Link href={ROUTES.HOME} className="text-lg underline">
        Return Home
      </Link>
    </section>
  );
}
