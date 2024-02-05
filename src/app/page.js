'use client';
import Footer from '@/components/Footer';
import HomeContainer from '@/containers/Home';
import withAuth from '@/utils/hoc/withAuth';

const Home = () => {
  return (
    <div className="h-full w-full">
      <HomeContainer />
      {/* <footer className="absolute bottom-0 w-full">
        <Footer />
      </footer> */}
    </div>
  );
};

export default withAuth(Home);
