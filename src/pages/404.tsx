import React, { useEffect } from 'react';
import Image from 'next/image';
import notFound from '@/assets/404/notFound.png';
import Link from 'next/link';
import style from '@/styles/notFound.module.css';
import useAuthStore from '@/store/AuthStore';

const Custom404 = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div>
      <div className={style.container}>
        <Image
          src={notFound}
          alt='notfound'
          width={500}
          height={500}
          priority={true}
        />
        <Link href={'/'} className={style.homeBtn}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
