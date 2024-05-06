import { GetServerSideProps } from 'next'
import { options } from '@/app/lib/auth'
import { getServerSession } from 'next-auth/next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, options);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
