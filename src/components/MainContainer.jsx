import HomeContainer from './HomeContainer';
import Row from './Row';
import { useStateValue } from './context/StateProvider';
import MenuContainer from './MenuContainer';
import Cart from './Cart';
import { useEffect } from 'react';
export const MainContainer = () => {
  const [{ menuItems, cartShow }, dispatch] = useStateValue();

  useEffect(() => {}, [cartShow]);
  return (
    <div className="lg:w-[100%] h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize relative before:absolute before:rounded-lg before:content before:w-60 before:h-1 before:bottom-0 before:left-0 before:bg-gradient-to-tl from-purple-600 to-purple-300 transition-all ease-in-out duration-100">
            Our Organic & Healthy Fruits
          </p>
        </div>
        <Row
          flag={true}
          data={menuItems?.filter((item) => item.category === 'fruits')}
        />
      </section>
      <section className="w-full my-6">
        <MenuContainer />
      </section>
      {cartShow && <Cart />}
    </div>
  );
};

export default MainContainer;
